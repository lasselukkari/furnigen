/*
BEGIN MACRO
	NAME=START_POINT
	PARAM,NAME=LAY,VALUE="Layer 0"
	PARAM,NAME=X,VALUE=325
	PARAM,NAME=Y,VALUE=(64)+(0)
END MACRO
*/

export default class START_POINT {
	constructor({
        LAY = 'Layer 0',
        X = 0,
        Y = 0
    }) {
		this.LAY = LAY;
		this.X = X;
		this.Y = Y;
	}

	toMacro() {
		return `
BEGIN MACRO
\tNAME=START_POINT
\tPARAM,NAME=LAY,VALUE="${this.LAY}"
\tPARAM,NAME=X,VALUE=${this.X}
\tPARAM,NAME=Y,VALUE=${this.Y}
END MACRO
`;
	}
}

