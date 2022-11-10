import fs from 'fs/promises';
import P from 'parsimmon';

const reduceValues = (values, filterDefaults) => {
  return values.reduce((acc, [name, value]) => {
    if (filterDefaults &&
      name !== "X" &&
      name !== "Y" &&
      name !== "Z" &&
      name !== "XE" &&
      name !== "YE" &&
      name !== "ZE" &&
      name !== "MVT" 
    ) {

      if (name === 'LAY' && value === 'Layer 0') {
        return acc;
      }
      if (name === 'CRN' && value === '1') {
        return acc;
      }

      if (name === 'ETGT' && value === 0.1) {
        return acc;
      }

      if (!value) {
        return acc;
      }
    }

    acc[name] = value;

    return acc;
  }, {});
};

const nameSelector = name => P.optWhitespace.then(P.string('NAME=').then(P.string(name)));
const macro = (r, content) => r.beginMacro.then(content).skip(r.endMacro);

const parser = P.createLanguage({
  // parses positive and negative integers
  whiteSpateButNotNewLine: () => P.regexp(/[ \t]/).many(),
  valueInt: r => P.regexp(/[+-]?\d+/).skip(r.whiteSpateButNotNewLine).skip(P.newline).map(Number),
  valueFloat: r => P.regexp(/[0-9]+\.[0-9]+/).skip(r.whiteSpateButNotNewLine).skip(P.newline).map(Number),
  valueString: r => P.regexp(/"[^"]*"/).map((value) => value.slice(1, -1)),
  valueFormula  :   r => P.regexp(/[A-Za-z0-9_ "\*.,()\+-/]+/),
  value: r => r.valueFloat.or(r.valueInt).or(r.valueString).or(r.valueFormula),
  beginID: r => P.optWhitespace.then(P.string('BEGIN ID CID3')),
  endID: r => P.optWhitespace.then(P.string('END ID')),
  beginMaindata: r => P.optWhitespace.then(P.string('BEGIN MAINDATA')),
  endMaindata: r => P.optWhitespace.then(P.string('END MAINDATA')),
  beginPublicVars: r => P.optWhitespace.then(P.string('BEGIN PUBLICVARS')),
  endPublicVars: r => P.optWhitespace.then(P.string('END PUBLICVARS')),
  beginMacro: r => P.optWhitespace.then(P.string('BEGIN MACRO')),
  endMacro: r => P.optWhitespace.then(P.string('END MACRO')),
  xmlDocument: r => P.optWhitespace.then(P.regex(/'xml':([^\n]+)/)).many().map(lines => lines.join('\n\t')),
  nameValue: r => P.optWhitespace.then(P.seq(P.regex(/[A-Z0-9_]+/).skip(P.string('=')), r.value)).map(([name, value]) => [name, value]),
  nameValues: r => r.nameValue.many(),
  name: r => P.optWhitespace.then(P.string('NAME=').then(P.regex(/[A-Z0-9_]+/))),
  nameOffset: r => nameSelector('OFFSET'),
  nameStartPoint: r => nameSelector('START_POINT'),
  nameGeo: r => nameSelector('GEO'),
  nameEndPath: r => nameSelector('ENDPATH'),
  nameCutGeo: r => nameSelector('CUT_GEO'),
  nameBg: r => nameSelector('BG'),
  nameLineEP: r => nameSelector('LINE_EP'),
  nameLincEP: r => nameSelector('LINC_EP'),
  nameLineArcIpep: r => nameSelector('ARC_IPEP'),
  nameRoutG: r => nameSelector('ROUTG'),
  paramName: r => P.string('PARAM,NAME=').then(P.regex(/[A-Z0-9_]+/)),
  param: r => P.seq(P.optWhitespace.then(r.paramName), P.string(',').then(P.string('VALUE=').then(r.value))),
  params: r => r.param.many().map(values => reduceValues(values, true)),
  offsetMacro: r => macro(r, P.seq(r.nameOffset, r.params)).map(data => ({ type: 'offset', params: data[1] })),
  geoMacro: r => macro(r, P.seq(r.nameGeo, r.params)),
  geoSequence: r => P.seq(r.geoMacro, P.alt(r.startPointMacro, r.lineEPMacro, r.lincEPMacro, r.lineArcIpepMacro).many()).skip(r.endPathMacro).map(result => {
    return {
      type: 'geo',
      params: result[0][1],
      children: result[1]
    };
  }),

  routGSequence: r => r.routGMacro.skip(r.endPathMacro).map(result => ({ type: 'routG', params: result[1] })),
  cutGeoMacro: r => macro(r, P.seq(r.nameCutGeo, r.params)).map(data => ({ type: 'cutGeo', params: data[1] })),
  bgMacro: r => macro(r, P.seq(r.nameBg, r.params)).map(data => ({ type: 'bg', params: data[1] })),
  endPathMacro: r => macro(r, r.nameEndPath),
  startPointMacro: r => macro(r, P.seq(r.nameStartPoint, r.params)),
  lineEPMacro: r => macro(r, P.seq(r.nameLineEP, r.params)),
  lincEPMacro: r => macro(r, P.seq(r.nameLincEP, r.params)),
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
      r.bgMacro,

    ).many()
  ).skip(P.optWhitespace).skip(P.eof)
});



function toJsObject(params, indent) {
  return JSON.stringify(params, null, indent).replace(/"([^"]+)":/g, '$1:')
}

const toCode = ([id, maindata, ...rest]) => {
  return `import fs from 'fs/promises';    
import Cix from './src/Cix/Cix.js';
import Geometry from './src/Cix/Geometry.js';
    
const cix = new Cix(
  ${JSON.stringify(maindata, null, 2)});\n
${rest[0].map(item => {
    if (item.type === 'publicVars') {
      return `cix.addPublicVars(${toJsObject(item.params, 2)});\n`;
    }

    if (item.type === 'offset') {
      return `cix.addOffset(${toJsObject(item.params, 2)});\n`;
    }
    if (item.type === 'geo') {
      const varName = item.params.ID.replace('.', '_');
      return `const ${varName} = new Geometry(${toJsObject(item.params)});
${item.children.map(([type, params]) => {
        if (type === 'START_POINT') {
          return `${varName}.setStartPoint(${toJsObject(params)});`;
        }
        if (type === 'LINE_EP') {
          return `${varName}.addLineEp(${toJsObject(params)});`;
        }
        if (type === 'LINC_EP') {
          return `${varName}.addLincEp(${toJsObject(params)});`;
        }
        if (type === 'ARC_IPEP') {
          return `${varName}.addArcIpep(${toJsObject(params)});`;
        }
      }).join('\n')}
cix.addGeometry(${varName});\n`;
    }

    if (item.type === 'routG') {
      return `cix.addRoutg(${toJsObject(item.params, 2)});\n`;
    }

    if (item.type === 'cutGeo') {
      return `cix.addCutGeo(${toJsObject(item.params, 2)});\n`;
    }

    if (item.type === 'bg') {
      return `cix.addBg(${toJsObject(item.params, 2)});\n`;
    }
  }).join('\n')}
    
fs.writeFile(process.argv[2], cix.toMacro());
    `;
};

async function example() {
  try {
    const file = await fs.readFile(process.argv[2], { encoding: 'utf8' });
    const result = parser.all.tryParse(file);

    await fs.writeFile(process.argv[3], toCode(result));
  } catch (err) {
    console.log(err);
  }
}

example();
