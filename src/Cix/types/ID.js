/*
BEGIN ID CID3
    REL=5.0
END ID
*/

export default class ID {
	constructor({REL}) {
		this.REL = REL;
	}

	toMacro() {
		return `
BEGIN ID CID3
\tREL=${this.REL.toFixed(1)}
END ID
`;
	}

}

