import ID  from './types/ID.js';
import MAINDATA from './types/MAINDATA.js';
import OFFSET from './types/OFFSET.js';
import ROUTG from './types/ROUTG.js';
import CUT_GEO from './types/CUT_GEO.js';
import BG from './types/BG.js';
import PUBLICVARS  from './types/PUBLICVARS.js';
import ENDPATH from './types/ENDPATH.js';

export default class Cix {
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

	addRoutg(params) {
		this.children.push(new ROUTG(params));
    this.children.push(new ENDPATH());
	}

	addCutGeo(params) {
		this.children.push(new CUT_GEO(params));
	}

	addBg(params) {
		this.children.push(new BG(params));
	}

	toMacro() {
		return this.children.map(child => child.toMacro()).join('\n');
	}
}

