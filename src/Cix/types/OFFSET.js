/*
BEGIN MACRO
    NAME=OFFSET
    PARAM,NAME=X,VALUE=3
    PARAM,NAME=Y,VALUE=3
    PARAM,NAME=Z,VALUE=0
    PARAM,NAME=SHW,VALUE=0
END MACRO
*/

export default class OFFSET {
	constructor(
		{
            X = 0,
            Y = 0,
            Z = 0,
            SHW = 0
        } = {}
    ) {
		this.X = X;
		this.Y = Y;
		this.Z = Z;
		this.SHW = SHW;
	}

	toMacro() {
		return `
BEGIN MACRO
\tNAME=OFFSET
\tPARAM,NAME=X,VALUE=${this.X}
\tPARAM,NAME=Y,VALUE=${this.Y}
\tPARAM,NAME=Z,VALUE=${this.Z}
\tPARAM,NAME=SHW,VALUE=${this.SHW}
END MACRO
`;
	}
}

