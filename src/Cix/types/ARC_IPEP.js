
class ARC_IPEP {
	constructor({
        LAY = 'Layer 0',
        ID = 0,
        X2 = 0,
        Y2 = 0,
        XE = 0,
        YE = 0,
        ZS = 0,
        ZE = 0,
        FD = 0,
        SP = 0
    }) {
		this.LAY = LAY;
		this.ID = ID;
		this.X2 = X2;
		this.Y2 = Y2;
		this.XE = XE;
		this.YE = YE;
		this.ZS = ZS;
		this.ZE = ZE;
		this.FD = FD;
		this.SP = SP;
	}

	toMacro() {
		return `
BEGIN MACRO
\tNAME=ARC_IPEP
\tPARAM,NAME=LAY,VALUE="${this.LAY}"
\tPARAM,NAME=ID,VALUE=${this.ID}
\tPARAM,NAME=X2,VALUE=${this.X2}
\tPARAM,NAME=Y2,VALUE=${this.Y2}
\tPARAM,NAME=XE,VALUE=${this.XE}
\tPARAM,NAME=YE,VALUE=${this.YE}
\tPARAM,NAME=ZS,VALUE=${this.ZS}
\tPARAM,NAME=ZE,VALUE=${this.ZE}
\tPARAM,NAME=FD,VALUE=${this.FD}
\tPARAM,NAME=SP,VALUE=${this.SP}
END MACRO
`;
	}
  }

module.exports = ARC_IPEP;
