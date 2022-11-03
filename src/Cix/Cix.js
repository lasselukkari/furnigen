const ID = require('./types/ID');
const MAINDATA = require('./types/MAINDATA');
const OFFSET = require('./types/OFFSET');
const ROUTG = require('./types/ROUTG');
const CUT_GEO = require('./types/CUT_GEO');
const PUBLICVARS = require('./types/PUBLICVARS');
const ENDPATH = require('./types/ENDPATH');

class Cix {
	constructor(maindata, REL = 5) {
		this.children = [];
		this.children.push(new ID({REL}));
		this.children.push(new MAINDATA(maindata));
	}

	addGeometry(geometry) {
		this.children.push(geometry);
	}

	addOffset(params) {
		this.children.push(new OFFSET(params));
	}

  addPublicVars(params) {
    this.children.push(new PUBLICVARS(params));
  }

	addRouting(params) {
		this.children.push(new ROUTG(params));
    this.children.push(new ENDPATH());
	}

	addCut(params) {
		this.children.push(new CUT_GEO(params));
	}

	toMacro() {
		return this.children.map(child => child.toMacro()).join('\n');
	}
}

module.exports = Cix;
