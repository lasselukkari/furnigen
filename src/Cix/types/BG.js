
/*
BEGIN MACRO
	NAME=BG
	PARAM,NAME=LAY,VALUE="Layer 0"
	PARAM,NAME=ID,VALUE="P1011"
	PARAM,NAME=SIDE,VALUE=0
	PARAM,NAME=CRN,VALUE="1,4,3,2"
	PARAM,NAME=X,VALUE=(LPX - 14.45) / 4
	PARAM,NAME=Y,VALUE=40
	PARAM,NAME=Z,VALUE=-5
	PARAM,NAME=AP,VALUE=0
	PARAM,NAME=MD,VALUE=0
	PARAM,NAME=DP,VALUE=15
	PARAM,NAME=TNM,VALUE="SPIRAALI14_54"
	PARAM,NAME=DIA,VALUE=0
	PARAM,NAME=THR,VALUE=0
	PARAM,NAME=CKA,VALUE=3
	PARAM,NAME=AZ,VALUE=45
	PARAM,NAME=AR,VALUE=90
	PARAM,NAME=RTY,VALUE=-1
	PARAM,NAME=OPT,VALUE=1
	PARAM,NAME=RSP,VALUE=0
	PARAM,NAME=IOS,VALUE=0
	PARAM,NAME=WSP,VALUE=0
	PARAM,NAME=DDS,VALUE=0
	PARAM,NAME=DSP,VALUE=0
	PARAM,NAME=RMD,VALUE=1
	PARAM,NAME=DQT,VALUE=0
	PARAM,NAME=ERDW,VALUE=0
	PARAM,NAME=DFW,VALUE=0
	PARAM,NAME=TOS,VALUE=1
	PARAM,NAME=VTR,VALUE=0
	PARAM,NAME=TTP,VALUE=0
	PARAM,NAME=SPI,VALUE=""
	PARAM,NAME=BFC,VALUE=1
	PARAM,NAME=PRS,VALUE=0
	PARAM,NAME=SHT,VALUE=0
	PARAM,NAME=SHP,VALUE=0
	PARAM,NAME=SHD,VALUE=0
	PARAM,NAME=COPRES,VALUE=0
END MACRO
*/
export default class BG {
	constructor({
        LAY = 'Layer 0',
        ID,
        SIDE = 0,
        CRN = '',
        X = 0,
        Y = 0,
        Z = 0,
        AP = 0,
        MD = 0,
        DP = 0,
        TNM = '',
        DIA = 0,
        THR = 0,
        CKA = 0,
        AZ = 0,
        AR = 0,
        RTY = 0,
        OPT = 0,
        RSP = 0,
        IOS = 0,
        WSP = 0,
        DDS = 0,
        DSP = 0,
        RMD = 0,
        DQT = 0,
        ERDW = 0,
        DFW = 0,
        TOS = 0,
        VTR = 0,
        TTP = 0,
        SPI = '',
        BFC = 0,
        PRS = 0,
        SHT = 0,
        SHP = 0,
        SHD = 0,
        COPRES = 0
    }) {
        this.LAY = LAY;
        this.ID = ID;
        this.SIDE = SIDE;
        this.CRN = CRN;
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.AP = AP;
        this.MD = MD;
        this.DP = DP;
        this.TNM = TNM;
        this.DIA = DIA;
        this.THR = THR;
        this.CKA = CKA;
        this.AZ = AZ;
        this.AR = AR;
        this.RTY = RTY;
        this.OPT = OPT;
        this.RSP = RSP;
        this.IOS = IOS;
        this.WSP = WSP;
        this.DDS = DDS;
        this.DSP = DSP;
        this.RMD = RMD;
        this.DQT = DQT;
        this.ERDW = ERDW;
        this.DFW = DFW;
        this.TOS = TOS;
        this.VTR = VTR;
        this.TTP = TTP;
        this.SPI = SPI;
        this.BFC = BFC;
        this.PRS = PRS;
        this.SHT = SHT;
        this.SHP = SHP;
        this.SHD = SHD;
        this.COPRES = COPRES;
	}

	toMacro() {
		return `
BEGIN MACRO
\tNAME=BG
\tPARAM,NAME=LAY,VALUE="${this.LAY}"${this.ID ? `\n\tPARAM,NAME=ID,VALUE="${this.ID}"` : ''}
\tPARAM,NAME=SIDE,VALUE=${this.SIDE}
\tPARAM,NAME=CRN,VALUE="${this.CRN}"
\tPARAM,NAME=X,VALUE=${this.X}
\tPARAM,NAME=Y,VALUE=${this.Y}
\tPARAM,NAME=Z,VALUE=${this.Z}
\tPARAM,NAME=AP,VALUE=${this.AP}
\tPARAM,NAME=MD,VALUE=${this.MD}
\tPARAM,NAME=DP,VALUE=${this.DP}
\tPARAM,NAME=TNM,VALUE="${this.TNM}"
\tPARAM,NAME=DIA,VALUE=${this.DIA}
\tPARAM,NAME=THR,VALUE=${this.THR}
\tPARAM,NAME=CKA,VALUE=${this.CKA}
\tPARAM,NAME=AZ,VALUE=${this.AZ}
\tPARAM,NAME=AR,VALUE=${this.AR}
\tPARAM,NAME=RTY,VALUE=${this.RTY}
\tPARAM,NAME=OPT,VALUE=${this.OPT}
\tPARAM,NAME=RSP,VALUE=${this.RSP}
\tPARAM,NAME=IOS,VALUE=${this.IOS}
\tPARAM,NAME=WSP,VALUE=${this.WSP}
\tPARAM,NAME=DDS,VALUE=${this.DDS}
\tPARAM,NAME=DSP,VALUE=${this.DSP}
\tPARAM,NAME=RMD,VALUE=${this.RMD}
\tPARAM,NAME=DQT,VALUE=${this.DQT}
\tPARAM,NAME=ERDW,VALUE=${this.ERDW}
\tPARAM,NAME=DFW,VALUE=${this.DFW}
\tPARAM,NAME=TOS,VALUE=${this.TOS}
\tPARAM,NAME=VTR,VALUE=${this.VTR}
\tPARAM,NAME=TTP,VALUE=${this.TTP}
\tPARAM,NAME=SPI,VALUE="${this.SPI}"
\tPARAM,NAME=BFC,VALUE=${this.BFC}
\tPARAM,NAME=PRS,VALUE=${this.PRS}
\tPARAM,NAME=SHT,VALUE=${this.SHT}
\tPARAM,NAME=SHP,VALUE=${this.SHP}
\tPARAM,NAME=SHD,VALUE=${this.SHD}
\tPARAM,NAME=COPRES,VALUE=${this.COPRES}
END MACRO
`;
	}
}

