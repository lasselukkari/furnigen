
const GEO = require('./types/GEO');
const CUT_GEO = require('./types/CUT_GEO');
const ROUTG = require('./types/ROUTG');
const ENDPATH = require('./types/ENDPATH');
const START_POINT = require('./types/START_POINT');
const LINE_EP = require('./types/LINE_EP');
const ARC_IPEP = require('./types/ARC_IPEP');

class Geometry {
	constructor(params) {
		this.geo = new GEO(params);
		this.children = [];
		this.endPath = new ENDPATH();
	}

	setStartPoint(params) {
		this.startPoint = new START_POINT(params);
	}

	addLineTo(params) {
		this.children.push(new LINE_EP(params));
	}

	addArcTo(params) {
		this.children.push(new ARC_IPEP(params));
	}

	toMacro() {
		return `${this.geo.toMacro()}
${this.startPoint.toMacro()}
${this.children.map(child => child.toMacro()).join('\n')}
${this.endPath.toMacro()}`;
	}
}

module.exports = Geometry;
