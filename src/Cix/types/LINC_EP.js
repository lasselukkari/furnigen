
/*
BEGIN MACRO
	NAME=LINC_EP
	PARAM,NAME=LAY,VALUE="Layer 0"
	PARAM,NAME=XI,VALUE=-20
	PARAM,NAME=YI,VALUE=20
	PARAM,NAME=ZS,VALUE=0
	PARAM,NAME=ZE,VALUE=0
	PARAM,NAME=FD,VALUE=0
	PARAM,NAME=SP,VALUE=0
END MACRO
*/
export default class LINC_EP {
	constructor({
        LAY = 'Layer 0',
        ID,
        XI = 0,
        YI = 0,
        ZS = 0,
        ZE = 0,
        FD = 0,
        SP = 0,
        MVT = null,
    }) {
		this.LAY = LAY;
		this.ID = ID;
		this.XI = XI;
		this.YI = YI;
		this.ZS = ZS;
		this.ZE = ZE;
		this.FD = FD;
		this.SP = SP;
		this.MVT = MVT;
	}

	toMacro() {
		return `
BEGIN MACRO
\tNAME=LINC_EP
\tPARAM,NAME=LAY,VALUE="${this.LAY}"${this.ID ? `\n\tPARAM,NAME=ID,VALUE=${this.ID}` : ''}
\tPARAM,NAME=XI,VALUE=${this.XI}
\tPARAM,NAME=YI,VALUE=${this.YI}
\tPARAM,NAME=ZS,VALUE=${this.ZS}
\tPARAM,NAME=ZE,VALUE=${this.ZE}
\tPARAM,NAME=FD,VALUE=${this.FD}
\tPARAM,NAME=SP,VALUE=${this.SP}${this.MVT !== null ? `\n\tPARAM,NAME=MVT,VALUE=${this.MVT}` : ''}
END MACRO
`;
	}
}

