import Cix from '../Cix/Cix';
import Geometry from '../Cix/Geometry';

export default function AttachmentCix() {

    const cix = new Cix(
        {
            "xml": "'xml':<?xml version=\"1.0\" encoding=\"utf-8\" ?>\r\n\t'xml':<!-- Created by bSolid -->\r\n\t'xml':<bSolid>\r\n\t'xml':\t<Settings \r\n\t'xml':\t\tMultiPanelEnabled=\"0\"\r\n\t'xml':\t\tMultiPanelOrigin=\"1\"\r\n\t'xml':\t/>\r\n\t'xml':\t<Panel>\r\n\t'xml':\t\t<MachinePosition \r\n\t'xml':\t\t\tEXORIGIN=\"1\"\r\n\t'xml':\t\t\tEXREFCORNER=\"1\"\r\n\t'xml':\t\t\tEXOFFSETX=\"0\"\r\n\t'xml':\t\t\tEXOFFSETY=\"0\"\r\n\t'xml':\t\t\tEXOFFSETZ=\"0\"\r\n\t'xml':\t\t\tEXROTX=\"0\"\r\n\t'xml':\t\t\tEXROTY=\"0\"\r\n\t'xml':\t\t\tEXROTZ=\"0\"\r\n\t'xml':\t\t\tEXMIRRORX=\"0\"\r\n\t'xml':\t\t\tEXMIRRORY=\"0\"\r\n\t'xml':\t\t/>\r\n\t'xml':\t</Panel>\r\n\t'xml':</bSolid>\r",
            "LPX": "(49 * 3) + (TOOL_DIAMETER * 2)",
            "LPY": "59 + 59 + TOOL_DIAMETER",
            "LPZ": 19,
            "ORLST": "5",
            "FCN": 1
        });

    cix.addPublicVars({
        TOOL_DIAMETER: 14.54
    });

    cix.addOffset({
        X: 3,
        Y: 3,
        Z: 0
    });

    const G1001_1001 = new Geometry({ ID: "G1001.1001", CRN: "2", RTY: 2 });
    G1001_1001.setStartPoint({ X: 0, Y: 132.54 });
    G1001_1001.addLineEp({ ID: 100, XE: 0, YE: 0, ZE: 0, MVT: 0 });
    G1001_1001.addLineEp({ ID: 101, XE: 176.08, YE: 0, ZE: 0, MVT: 0 });
    G1001_1001.addLineEp({ ID: 102, XE: 176.08, YE: 132.54, ZE: 0, MVT: 0 });
    G1001_1001.addLineEp({ ID: 103, XE: 0, YE: 132.54, ZE: 0, MVT: 0 });
    cix.addGeometry(G1001_1001);

    const G1001_1002 = new Geometry({ ID: "G1001.1002", RTY: 2 });
    G1001_1002.setStartPoint({ X: 56.27, Y: "(0)+(0)" });
    G1001_1002.addLineEp({ XE: 56.27, YE: "(132.54)+(0)", ZE: 0 });
    cix.addGeometry(G1001_1002);

    const G1001_1003 = new Geometry({ ID: "G1001.1003", RTY: 2 });
    G1001_1003.setStartPoint({ X: 0, Y: "(66.27)+(0)" });
    G1001_1003.addLineEp({ XE: 176.08, YE: "(66.27)+(0)", ZE: 0 });
    cix.addGeometry(G1001_1003);

    const G1001_1007 = new Geometry({ ID: "G1001.1007", RTY: 2 });
    G1001_1007.setStartPoint({ X: 119.81, Y: "(0)+(0)" });
    G1001_1007.addLineEp({ XE: 119.81, YE: "(132.54)+(0)", ZE: 0 });
    cix.addGeometry(G1001_1007);

    const G1001_1013 = new Geometry({ ID: "G1001.1013", SIDE: 2, RTY: 2 });
    G1001_1013.setStartPoint({ X: 0, Y: "(9)+(0)" });
    G1001_1013.addLineEp({ XE: "LPX", YE: "(9)+(0)", ZE: 0 });
    cix.addGeometry(G1001_1013);

    const G1001_1014 = new Geometry({ ID: "G1001.1014", SIDE: 4, RTY: 2 });
    G1001_1014.setStartPoint({ X: 0, Y: "(9)+(0)" });
    G1001_1014.addLineEp({ XE: "LPX", YE: "(9)+(0)", ZE: 0 });
    cix.addGeometry(G1001_1014);

    cix.addOffset({
        X: 50,
        Y: 50,
        Z: 0
    });

    cix.addBg({
        ID: "P1017",
        X: "49/2",
        Y: "10 + (49/2)",
        Z: 0,
        DP: 7,
        TNM: "VTERA_90AST",
        CKA: 3,
        RTY: 2,
        NRP: 3,
        DX: "49 + TOOL_DIAMETER",
        OPT: 1,
        RMD: 1,
        TOS: 1,
        BFC: 1,
        SHP: 7
    });

    cix.addBg({
        ID: "P1017",
        X: "49/2",
        Y: "(10 + (49/2))+(49 + TOOL_DIAMETER)",
        Z: 0,
        DP: 7,
        TNM: "VTERA_90AST",
        CKA: 3,
        RTY: 2,
        NRP: 3,
        DX: "49 + TOOL_DIAMETER",
        OPT: 1,
        RMD: 1,
        TOS: 1,
        BFC: 1,
        SHP: 7
    });

    cix.addBg({
        ID: "P1017",
        X: "49/2",
        Y: "10 + (49/2)",
        Z: 0,
        DP: 14,
        TNM: "SPIRAALI-4-Z1-UP",
        CKA: 3,
        RTY: 2,
        NRP: 3,
        DX: "49 + TOOL_DIAMETER",
        OPT: 1,
        RMD: 1,
        TOS: 1,
        BFC: 1,
        SHP: 7
    });

    cix.addBg({
        ID: "P1017",
        X: "49/2",
        Y: "(10 + (49/2))+(49 + TOOL_DIAMETER)",
        Z: 0,
        DP: 14,
        TNM: "SPIRAALI-4-Z1-UP",
        CKA: 3,
        RTY: 2,
        NRP: 3,
        DX: "49 + TOOL_DIAMETER",
        OPT: 1,
        RMD: 1,
        TOS: 1,
        BFC: 1,
        SHP: 7
    });

    cix.addCutGeo({
        ID: "P1014",
        GID: "G1001.1001",
        SIL: "101,103",
        Z: 0,
        DP: 5,
        THR: 1,
        CRC: 2,
        RV: 1,
        CKA: 2,
        OPT: 1,
        RSP: 6000,
        WSP: 14000,
        DSP: 2500,
        DIN: 100,
        DOU: 100,
        TOS: 1,
        VTR: 2,
        GIP: 1,
        TNM: "SAHA300",
        BFC: 1,
        SHP: 5,
        BDR: 1,
        PRV: 1,
        BTT: 0.1
    });

    cix.addRoutg({
        ID: "P1018",
        GID: "G1001.1013",
        Z: 0,
        DP: 10,
        CRC: 2,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 1,
        OTR: 4,
        SVR: 2.5,
        CIN: 1,
        AIN: 90,
        DIN: 20,
        COU: 1,
        AOU: 90,
        DOU: 20,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: "SPIRAALI14_54",
        BFC: 1,
        LPR: 1,
        ZE: 0
    });

    cix.addRoutg({
        ID: "P1018",
        GID: "G1001.1014",
        Z: 0,
        DP: 10,
        CRC: 2,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 1,
        OTR: 4,
        SVR: 2.5,
        CIN: 1,
        AIN: 90,
        DIN: 20,
        COU: 1,
        AOU: 90,
        DOU: 20,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: "SPIRAALI14_54",
        BFC: 1,
        LPR: 1,
        ZE: 0
    });

    cix.addRoutg({
        ID: "P1010",
        GID: "G1001.1003",
        Z: 0,
        DP: -2,
        THR: 1,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 6,
        INCSTP: 1,
        OTR: 1,
        BDR: 1,
        CIN: 1,
        AIN: 90,
        DIN: 20,
        COU: 1,
        AOU: 90,
        DOU: 20,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: "SPIRAALI14_54",
        BFC: 1,
        SHP: 8,
        NEBS: 1,
        LPR: 1,
        ZE: 0
    });

    cix.addCutGeo({
        ID: "P1014",
        GID: "G1001.1001",
        SIL: "100,102",
        Z: 0,
        DP: 5,
        THR: 1,
        CRC: 2,
        RV: 1,
        CKA: 2,
        OPT: 1,
        RSP: 6000,
        WSP: 14000,
        DSP: 2500,
        DIN: 100,
        DOU: 100,
        TOS: 1,
        VTR: 2,
        GIP: 1,
        TNM: "SAHA300",
        BFC: 1,
        SHP: 5,
        BDR: 1,
        PRV: 1,
        BTT: 0.1
    });

    cix.addRoutg({
        ID: "P1010",
        GID: "G1001.1002",
        Z: 0,
        DP: -2,
        THR: 1,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 6,
        INCSTP: 1,
        OTR: 1,
        BDR: 1,
        CIN: 1,
        AIN: 90,
        DIN: 20,
        COU: 1,
        AOU: 90,
        DOU: 20,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: "SPIRAALI14_54",
        BFC: 1,
        SHP: 8,
        NEBS: 1,
        LPR: 1,
        ZE: 0
    });

    cix.addRoutg({
        ID: "P1010",
        GID: "G1001.1007",
        Z: 0,
        DP: -2,
        THR: 1,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 6,
        INCSTP: 1,
        OTR: 1,
        BDR: 1,
        CIN: 1,
        AIN: 90,
        DIN: 20,
        COU: 1,
        AOU: 90,
        DOU: 20,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: "SPIRAALI14_54",
        BFC: 1,
        SHP: 8,
        NEBS: 1,
        LPR: 1,
        ZE: 0
    });

    return cix.toMacro();
}
