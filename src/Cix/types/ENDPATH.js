/*
BEGIN MACRO
    NAME=ENDPATH
END MACRO
*/

class ENDPATH {
	constructor() { }

	toMacro() {
		return `
BEGIN MACRO
\tNAME=ENDPATH
END MACRO
`;
	}
}

module.exports = ENDPATH;
