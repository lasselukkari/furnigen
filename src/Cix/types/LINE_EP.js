
/*
BEGIN MACRO
	NAME=LINE_EP
	PARAM,NAME=LAY,VALUE="Layer 0"
	PARAM,NAME=ID,VALUE=103
	PARAM,NAME=XE,VALUE=0
	PARAM,NAME=YE,VALUE=80
	PARAM,NAME=ZS,VALUE=0
	PARAM,NAME=ZE,VALUE=0
	PARAM,NAME=FD,VALUE=0
	PARAM,NAME=SP,VALUE=0
	PARAM,NAME=MVT,VALUE=0
END MACRO
*/
class LINE_EP {
	constructor({
        LAY = 'Layer 0',
        ID,
        XE = 0,
        YE = 0,
        ZS = 0,
        ZE = 0,
        FD = 0,
        SP = 0,
        MVT
    }) {
		this.LAY = LAY;
		this.ID = ID;
		this.XE = XE;
		this.YE = YE;
		this.ZS = ZS;
		this.ZE = ZE;
		this.FD = FD;
		this.SP = SP;
		this.MVT = MVT;
	}

	// this function only prints the macro if the MVT parameter is set
	toMacro() {
		return `
BEGIN MACRO
\tNAME=LINE_EP
\tPARAM,NAME=LAY,VALUE="${this.LAY}"${this.ID ? `\n\tPARAM,NAME=ID,VALUE=${this.ID}` : ''}
\tPARAM,NAME=XE,VALUE=${this.XE}
\tPARAM,NAME=YE,VALUE=${this.YE}
\tPARAM,NAME=ZS,VALUE=${this.ZS}
\tPARAM,NAME=ZE,VALUE=${this.ZE}
\tPARAM,NAME=FD,VALUE=${this.FD}
\tPARAM,NAME=SP,VALUE=${this.SP}${this.MVT ? `\n\tPARAM,NAME=MVT,VALUE=${this.MVT}` : ''}
END MACRO
`;
	}
}

module.exports = LINE_EP;
