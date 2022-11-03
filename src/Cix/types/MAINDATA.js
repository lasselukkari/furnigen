/*

BEGIN MAINDATA
	'xml':<?xml version="1.0" encoding="utf-8" ?>
	'xml':<!-- Created by bSolid -->
	'xml':<bSolid>
	'xml':	<Settings
	'xml':		MultiPanelEnabled="1"
	'xml':		MultiPanelOrigin="1"
	'xml':	/>
	'xml':	<Panel>
	'xml':		<MachinePosition
	'xml':			EXORIGIN="1"
	'xml':			EXREFCORNER="1"
	'xml':			EXOFFSETX="0"
	'xml':			EXOFFSETY="0"
	'xml':			EXOFFSETZ="0"
	'xml':			EXROTX="0"
	'xml':			EXROTY="0"
	'xml':			EXROTZ="0"
	'xml':			EXMIRRORX="0"
	'xml':			EXMIRRORY="0"
	'xml':		/>
	'xml':	</Panel>
	'xml':</bSolid>
	LPX=500
	LPY=80
	LPZ=25
	ORLST="5"
	SIMMETRY=0
	TLCHK=0
	TOOLING=""
	CUSTSTR=""
	FCN=1
	XCUT=0
	YCUT=0
	JIGTH=0
	CKOP=0
	UNIQUE=0
	MATERIAL=""
	PUTLST=""
	OPPWKRS=0
	UNICLAMP=0
	WTPIANI=0
	COLLTOOL=0
	CALCEDTH=0
	ENABLELABEL=0
	LOCKWASTE=0
	LOADEDGEOPT=0
	ITLTYPE=0
	RUNPAV=0
	FLIPEND=0
	ENABLEMACHLINKS=0
	ENABLEPURSUITS=0
	ENABLEFASTVERTBORINGS=0
	FASTVERTBORINGSVALUE=0
END MAINDATA

*/

class MAINDATA {
	constructor({
        xml = '',
        LPX = 0,
        LPY = 0,
        LPZ = 0,
        ORLST = '1',
        SIMMETRY = 0,
        TLCHK = 0,
        TOOLING = '',
        CUSTSTR = '',
        FCN = 1,
        XCUT = 0,
        YCUT = 0,
        JIGTH = 0,
        CKOP = 0,
        UNIQUE = 0,
        MATERIAL = '',
        PUTLST = '',
        OPPWKRS = 0,
        UNICLAMP = 0,
        WTPIANI = 0,
        COLLTOOL = 0,
        CALCEDTH = 0,
        ENABLELABEL = 0,
        LOCKWASTE = 0,
        LOADEDGEOPT = 0,
        ITLTYPE = 0,
        RUNPAV = 0,
        FLIPEND = 0,
        ENABLEMACHLINKS = 0,
        ENABLEPURSUITS = 0,
        ENABLEFASTVERTBORINGS = 0,
        FASTVERTBORINGSVALUE = 0

    }) {
		this.xml = xml;
		this.LPX = LPX;
		this.LPY = LPY;
		this.LPZ = LPZ;
		this.ORLST = ORLST;
		this.SIMMETRY = SIMMETRY;
		this.TLCHK = TLCHK;
		this.TOOLING = TOOLING;
		this.CUSTSTR = CUSTSTR;
		this.FCN = FCN;
		this.XCUT = XCUT;
		this.YCUT = YCUT;
		this.JIGTH = JIGTH;
		this.CKOP = CKOP;
		this.UNIQUE = UNIQUE;
		this.MATERIAL = MATERIAL;
		this.PUTLST = PUTLST;
		this.OPPWKRS = OPPWKRS;
		this.UNICLAMP = UNICLAMP;
		this.WTPIANI = WTPIANI;
		this.COLLTOOL = COLLTOOL;
		this.CALCEDTH = CALCEDTH;
		this.ENABLELABEL = ENABLELABEL;
		this.LOCKWASTE = LOCKWASTE;
		this.LOADEDGEOPT = LOADEDGEOPT;
		this.ITLTYPE = ITLTYPE;
		this.RUNPAV = RUNPAV;
		this.FLIPEND = FLIPEND;
		this.ENABLEMACHLINKS = ENABLEMACHLINKS;
		this.ENABLEPURSUITS = ENABLEPURSUITS;
		this.ENABLEFASTVERTBORINGS = ENABLEFASTVERTBORINGS;
		this.FASTVERTBORINGSVALUE = FASTVERTBORINGSVALUE;
	}

	toMacro() {
		return `
BEGIN MAINDATA
\t${this.xml}
\tLPX=${this.LPX}
\tLPY=${this.LPY}
\tLPZ=${this.LPZ}
\tORLST="${this.ORLST}"
\tSIMMETRY=${this.SIMMETRY}
\tTLCHK=${this.TLCHK}
\tTOOLING="${this.TOOLING}"
\tCUSTSTR="${this.CUSTSTR}"
\tFCN=${this.FCN}
\tXCUT=${this.XCUT}
\tYCUT=${this.YCUT}
\tJIGTH=${this.JIGTH}
\tCKOP=${this.CKOP}
\tUNIQUE=${this.UNIQUE}
\tMATERIAL="${this.MATERIAL}"
\tPUTLST="${this.PUTLST}"
\tOPPWKRS=${this.OPPWKRS}
\tUNICLAMP=${this.UNICLAMP}
\tWTPIANI=${this.WTPIANI}
\tCOLLTOOL=${this.COLLTOOL}
\tCALCEDTH=${this.CALCEDTH}
\tENABLELABEL=${this.ENABLELABEL}
\tLOCKWASTE=${this.LOCKWASTE}
\tLOADEDGEOPT=${this.LOADEDGEOPT}
\tITLTYPE=${this.ITLTYPE}
\tRUNPAV=${this.RUNPAV}
\tFLIPEND=${this.FLIPEND}
\tENABLEMACHLINKS=${this.ENABLEMACHLINKS}
\tENABLEPURSUITS=${this.ENABLEPURSUITS}
\tENABLEFASTVERTBORINGS=${this.ENABLEFASTVERTBORINGS}
\tFASTVERTBORINGSVALUE=${this.FASTVERTBORINGSVALUE}
END MAINDATA
`;
	}

  }

module.exports = MAINDATA;
