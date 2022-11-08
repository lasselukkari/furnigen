/*
BEGIN PUBLICVARS
	X=0
    Y=0
END PUBLICVARS
*/



export default class PUBLICVARS {
    constructor(options) {
        this.options = options;
    }

    toMacro() {
   
        return `
BEGIN PUBLICVARS
${Object.keys(this.options).map(key => `\t${key}=${this.options[key]}`).join('\n')}
END PUBLICVARS
`;
    }

}
