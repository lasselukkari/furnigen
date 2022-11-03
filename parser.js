const fs = require('fs/promises');
const P = require('parsimmon');

const reduceValues = (values, filterDefaults) => {
  return values.reduce((acc, [name, value]) => {
    if (filterDefaults) {
      if (!value) {
        return acc;
      }
      if (name === 'LAY' && value === 'Layer 0') {
        return acc;
      }
      if (name === 'CRN' && value === '1') {
        return acc;
      }

      if (name === 'ETGT' && value === 0.1) {
        return acc;
      }
    }
    acc[name] = value;

    return acc;
  }, {});
};

const nameSelector = name => P.optWhitespace.then(P.string('NAME=').then(P.string(name)));
const castValue = value => {
  return (value.startsWith('"') && value.endsWith('"')) ? value.slice(1, -1) : eval(value);
};
const macro = (r, content) => r.beginMacro.then(content).skip(r.endMacro);

const parser = P.createLanguage({
  beginID: r => P.optWhitespace.then(P.string('BEGIN ID CID3')),
  endID: r => P.optWhitespace.then(P.string('END ID')),
  beginMaindata: r => P.optWhitespace.then(P.string('BEGIN MAINDATA')),
  endMaindata: r => P.optWhitespace.then(P.string('END MAINDATA')),
  beginPublicVars: r => P.optWhitespace.then(P.string('BEGIN PUBLICVARS')),
  endPublicVars: r => P.optWhitespace.then(P.string('END PUBLICVARS')),
  beginMacro: r => P.optWhitespace.then(P.string('BEGIN MACRO')),
  endMacro: r => P.optWhitespace.then(P.string('END MACRO')),
  xmlDocument: r => P.optWhitespace.then(P.regex(/'xml':([^\n]+)/)).many().map(lines => lines.join('\n\t')),
  nameValue: r => P.optWhitespace.then(P.seq(P.regex(/[A-Z0-9_]+/).skip(P.string('=')), P.regex(/[A-Za-z0-9_ ".]+/))).map(([name, value]) => [name, castValue(value)]),
  nameValues: r => r.nameValue.many(),
  name: r => P.optWhitespace.then(P.string('NAME=').then(P.regex(/[A-Z0-9_]+/))),
  nameOffset: r => nameSelector('OFFSET'),
  nameStartPoint: r => nameSelector('START_POINT'),
  nameGeo: r => nameSelector('GEO'),
  nameEndPath: r => nameSelector('ENDPATH'),
  nameCutGeo: r => nameSelector('CUT_GEO'),
  nameLineEP: r => nameSelector('LINE_EP'),
  nameLineArcIpep: r => nameSelector('ARC_IPEP'),
  nameRoutG: r => nameSelector('ROUTG'),
  value: r => P.string('VALUE=').then(P.regex(/[A-Za-z0-9_ ".,()+-]+/)).map(castValue),
  paramName: r => P.string('PARAM,NAME=').then(P.regex(/[A-Z0-9_]+/)),
  param: r => P.seq(P.optWhitespace.then(r.paramName), P.string(',').then(r.value)),
  params: r => r.param.many().map(values => reduceValues(values, true)),
  offsetMacro: r => macro(r, P.seq(r.nameOffset, r.params)).map(data => {
    return {
      type: 'offset',
      params: data[1]
    };
  }),
  geoMacro: r => macro(r, P.seq(r.nameGeo, r.params)),
  geoSequence: r => P.seq(r.geoMacro, P.alt(r.startPointMacro, r.lineEPMacro, r.lineArcIpepMacro).many()).skip(r.endPathMacro).map(result => {
    return {
      type: 'geo',
      params: result[0][1],
      children: result[1]
    };
  }),

  routGSequence: r => r.routGMacro.skip(r.endPathMacro).map(result => {
    return {
      type: 'routG',
      params: result[1]
    };
  }),
  cutGeoMacro: r => macro(r, P.seq(r.nameCutGeo, r.params)).map(data => {
    return {
      type: 'cutGeo',
      params: data[1]
    };
  }),
  endPathMacro: r => macro(r, r.nameEndPath),
  startPointMacro: r => macro(r, P.seq(r.nameStartPoint, r.params)),
  lineEPMacro: r => macro(r, P.seq(r.nameLineEP, r.params)),
  lineArcIpepMacro: r => macro(r, P.seq(r.nameLineArcIpep, r.params)),
  routGMacro: r => macro(r, P.seq(r.nameRoutG, r.params)),
  maindata: r => r.beginMaindata.then(P.seq(r.xmlDocument, r.nameValues.map(values => reduceValues(values, true))).skip(r.endMaindata)).map(([xml, values]) => ({ xml, ...values })),
  publicVars: r => r.beginPublicVars.then(r.nameValues.map(values => reduceValues(values, false)).skip(r.endPublicVars)).map(params => {
    return {
      type: 'publicVars',
      params,
    };
  }),
  id: r => r.beginID.then(r.nameValue.skip(r.endID)).map(([name, value]) => ({ [name]: value })),
  all: r => P.seq(
    r.id,
    r.maindata,
    P.alt(
      r.publicVars,
      r.offsetMacro,
      r.cutGeoMacro,
      r.geoSequence,
      r.routGSequence,

    ).many()
  ).skip(P.optWhitespace).skip(P.eof)
});

// Return `const maindata = new Maindata(${JSON.stringify({xml, ...values}, null, 2)});`;

const toCode = ([id, maindata, ...rest]) => {
  return `const fs = require('fs/promises');    
const Cix = require('./Cix');
const Geometry = require('./Geometry');
    
const cix = new Cix(
  ${JSON.stringify(maindata, null, 2)});\n
${rest[0].map(item => {
    if (item.type === 'publicVars') {
      return `cix.addPublicVars(${JSON.stringify(item.params, null, 2)});\n`;
    }

    if (item.type === 'offset') {
      return `cix.addOffset(${JSON.stringify(item.params, null, 2)});\n`;
    }
    if (item.type === 'geo') {
      const varName = item.params.ID.replace('.', '_');
      return `const ${varName} = new Geometry(${JSON.stringify(item.params)});
${item.children.map(([type, params]) => {
        if (type === 'START_POINT') {
          return `${varName}.setStartPoint(${JSON.stringify(params)});`;
        }
        if (type === 'LINE_EP') {
          return `${varName}.addLineTo(${JSON.stringify(params)});`;
        }
        if (type === 'ARC_IPEP') {
          return `${varName}.addArcTo(${JSON.stringify(params)});`;
        }
      }).join('\n')}
cix.addGeometry(${varName});\n`;
    }

    if (item.type === 'routG') {
      return `cix.addRouting(${JSON.stringify(item.params, null, 2)});\n`;
    }

    if (item.type === 'cutGeo') {
      return `cix.addCut(${JSON.stringify(item.params, null, 2)});\n`;
    }
  }).join('\n')}
    
fs.writeFile('./result.cix', cix.toMacro());
    `;
};

async function example() {
  try {
    const file = await fs.readFile('./test.cix', { encoding: 'utf8' });
    const result = parser.all.tryParse(file);

    await fs.writeFile('./test.js', toCode(result));
  } catch (err) {
    console.log(err);
  }
}

example();
