/*
BEGIN MACRO
  NAME=GEO
  PARAM,NAME=LAY,VALUE="Layer 0"
  PARAM,NAME=ID,VALUE="G1001.1087"
  PARAM,NAME=SIDE,VALUE=0
  PARAM,NAME=CRN,VALUE="1"
  PARAM,NAME=DP,VALUE=0
  PARAM,NAME=RTY,VALUE=2
  PARAM,NAME=NRP,VALUE=0
  PARAM,NAME=DX,VALUE=0
  PARAM,NAME=DY,VALUE=0
  PARAM,NAME=RV,VALUE=0
  PARAM,NAME=COW,VALUE=0
  PARAM,NAME=CRC,VALUE=0
END MACRO
*/

export default class GEO {
	constructor(
		{
      LAY = 'Layer 0',
      ID = '',
      SIDE = 0,
      CRN = '1',
      DP = 0,
      RTY = 2,
      NRP = 0,
      DX = 0,
      DY = 0,
      RV = 0,
      COW = 0,
      CRC = 0
    } = {}
  ) {
		this.LAY = LAY;
		this.ID = ID;
		this.SIDE = SIDE;
		this.CRN = CRN;
		this.DP = DP;
		this.RTY = RTY;
		this.NRP = NRP;
		this.DX = DX;
		this.DY = DY;
		this.RV = RV;
		this.COW = COW;
		this.CRC = CRC;
	}

	toMacro() {
		return `
BEGIN MACRO
\tNAME=GEO
\tPARAM,NAME=LAY,VALUE="${this.LAY}"
\tPARAM,NAME=ID,VALUE="${this.ID}"
\tPARAM,NAME=SIDE,VALUE=${this.SIDE}
\tPARAM,NAME=CRN,VALUE="${this.CRN}"
\tPARAM,NAME=DP,VALUE=${this.DP}
\tPARAM,NAME=RTY,VALUE=${this.RTY}
\tPARAM,NAME=NRP,VALUE=${this.NRP}
\tPARAM,NAME=DX,VALUE=${this.DX}
\tPARAM,NAME=DY,VALUE=${this.DY}
\tPARAM,NAME=RV,VALUE=${this.RV}
\tPARAM,NAME=COW,VALUE=${this.COW}
\tPARAM,NAME=CRC,VALUE=${this.CRC}
END MACRO
`;
	}
}

