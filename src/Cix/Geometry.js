import GEO from './types/GEO.js';
import ENDPATH from './types/ENDPATH.js';
import START_POINT from './types/START_POINT.js';
import LINE_EP from './types/LINE_EP.js';
import LINC_EP from './types/LINC_EP.js';	
import ARC_IPEP from './types/ARC_IPEP.js';



export default class Geometry {
	constructor(params) {
		this.geo = new GEO(params);
		this.children = [];
		this.endPath = new ENDPATH();
	}

	setStartPoint(params) {
		this.startPoint = new START_POINT(params);
	}

	addLineEp(params) {
		this.children.push(new LINE_EP(params));
	}

	addArcIpep(params) {
		this.children.push(new ARC_IPEP(params));
	}

	addLincEp(params) {
		this.children.push(new LINC_EP(params));
	}


	toMacro() {
		return `${this.geo.toMacro()}
${this.startPoint.toMacro()}
${this.children.map(child => child.toMacro()).join('\n')}
${this.endPath.toMacro()}`;
	}
}

