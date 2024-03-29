import Cix from '../Cix/Cix';
import Geometry from '../Cix/Geometry';

export default function MiddleSupportCix({
     height,
     width,
     length,
    pinLength,
    pinHeight,
}) {
    const totalLength = length + (pinLength * 2);
    const attachPointCount = Math.ceil(length / 500);

    const cix = new Cix(
        {
            xml: '\'xml\':<?xml version="1.0" encoding="utf-8" ?>\r\n\t\'xml\':<!-- Created by bSolid -->\r\n\t\'xml\':<bSolid>\r\n\t\'xml\':\t<Settings \r\n\t\'xml\':\t\tMultiPanelEnabled="1"\r\n\t\'xml\':\t\tMultiPanelOrigin="1"\r\n\t\'xml\':\t/>\r\n\t\'xml\':\t<Panel>\r\n\t\'xml\':\t\t<MachinePosition \r\n\t\'xml\':\t\t\tEXORIGIN="1"\r\n\t\'xml\':\t\t\tEXREFCORNER="1"\r\n\t\'xml\':\t\t\tEXOFFSETX="0"\r\n\t\'xml\':\t\t\tEXOFFSETY="0"\r\n\t\'xml\':\t\t\tEXOFFSETZ="0"\r\n\t\'xml\':\t\t\tEXROTX="0"\r\n\t\'xml\':\t\t\tEXROTY="0"\r\n\t\'xml\':\t\t\tEXROTZ="0"\r\n\t\'xml\':\t\t\tEXMIRRORX="0"\r\n\t\'xml\':\t\t\tEXMIRRORY="0"\r\n\t\'xml\':\t\t/>\r\n\t\'xml\':\t</Panel>\r\n\t\'xml\':</bSolid>\r',
            LPX: totalLength,
            LPY: width,
            LPZ: height,
            ORLST: '5',
            FCN: 1
        });

    cix.addOffset({
        X: 3,
        Y: 3
    });

    const G1001_1001 = new Geometry({ ID: 'G1001.1001', CRN: '2', RTY: 2 });
    G1001_1001.setStartPoint({ X: 0, Y: width });
    G1001_1001.addLineEp({ ID: 100, XE: 0, YE: 0 });
    G1001_1001.addLineEp({ ID: 101, XE: totalLength, YE: 0 });
    G1001_1001.addLineEp({ ID: 102, XE: totalLength, YE: width });
    G1001_1001.addLineEp({ ID: 103, XE: 0, YE: width });
    cix.addGeometry(G1001_1001);

    for (let i = 0; i < attachPointCount; i++) {
        const G1001_1087 = new Geometry({ ID: `G1001.109${i}`, RTY: 2 });
        G1001_1087.setStartPoint({ X: ((length / attachPointCount+1) * (i+1)) - 25, Y: width - 16 });
        G1001_1087.addLineEp({ XE: ((length / attachPointCount+1) * (i+1)) + 25, YE: width - 16 });
        cix.addGeometry(G1001_1087);
    }

    // tapin geometria
    const G1001_1085 = new Geometry({ ID: 'G1001.1085', SIDE: 3, RTY: 2 });
    G1001_1085.setStartPoint({ X: width - 10, Y: (height - pinHeight) / 2 });
    G1001_1085.addLineEp({ ID: 100, XE: 10, YE: (height - pinHeight) / 2 });
    G1001_1085.addArcIpep({ ID: 101, X2: 10, Y2: height / 2, XE: 5, YE: ((height - pinHeight) / 2) + pinHeight });
    G1001_1085.addLineEp({ ID: 102, XE: width - 10, YE: ((height - pinHeight) / 2) + pinHeight });
    G1001_1085.addArcIpep({ ID: 103, X2: width - 5, Y2: height / 2, XE: width - 10, YE: (height - pinHeight) / 2 });
    cix.addGeometry(G1001_1085);

    // toisen pään tapin geometria    
    const G1001_1086 = new Geometry({ ID: 'G1001.1086', SIDE: 1, RTY: 2 });
    G1001_1086.setStartPoint({ X: 10, Y: (height - pinHeight) / 2 });
    G1001_1086.addLineEp({ ID: 100, XE: width - 10, YE: (height - pinHeight) / 2 });
    G1001_1086.addArcIpep({ ID: 101, X2: width - 10, Y2: height / 2, XE: width - 5, YE: ((height - pinHeight) / 2) + pinHeight });
    G1001_1086.addLineEp({ ID: 102, XE: 10, YE: ((height - pinHeight) / 2) + pinHeight });
    G1001_1086.addArcIpep({ ID: 103, X2: 5, Y2: height / 2, XE: 10, YE: (height - pinHeight) / 2 });
    cix.addGeometry(G1001_1086);

    cix.addOffset({
        X: 50
    });

    cix.addCutGeo({
        ID: 'P1021',
        GID: 'G1001.1001',
        DP: 5,
        THR: 1,
        CRC: 6,
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
        TNM: 'SAHA300',
        SHP: 5,
        BDR: 1,
        PRV: 1,
        BTT: 0.1
    });

    cix.addRoutg({
        ID: 'P1017',
        GID: 'G1001.1085',
        DP: pinLength,
        RV: 1,
        CRC: 6,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 1,
        OTR: 2,
        SVR: 4,
        COF: 1,
        DOF: 1,
        CIN: 1,
        AIN: 90,
        COU: 1,
        AOU: 90,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: 'SPIRAALI14_54',
        BFC: 1,
        SHP: 3,
        LPR: 1
    });

    cix.addRoutg({
        ID: 'P1017',
        GID: 'G1001.1086',
        DP: pinLength,
        CRC: 6,
        CKA: 3,
        OPT: 1,
        RSP: 18000,
        WSP: 10000,
        DSP: 2500,
        VTR: 1,
        OTR: 2,
        SVR: 4,
        COF: 1,
        DOF: 1,
        CIN: 1,
        AIN: 90,
        COU: 1,
        AOU: 90,
        PRP: 100,
        SDSF: 2000,
        DDT: 5,
        IDT: 20,
        FDT: 80,
        RDT: 60,
        GIP: 1,
        TOS: 1,
        TNM: 'SPIRAALI14_54',
        BFC: 1,
        SHP: 3,
        LPR: 1
    });
    for (let i = 0; i < attachPointCount; i++) {
        cix.addRoutg({
            ID: `P109${i}`,
            GID: `G1001.109${i}`,
            DP: 10,
            CKA: 3,
            OPT: 1,
            RSP: 18000,
            WSP: 10000,
            DSP: 8000,
            VTR: 2,
            OTR: 1,
            BDR: 1,
            CIN: 1,
            AIN: 90,
            COU: 1,
            AOU: 90,
            PRP: 100,
            SDSF: 2000,
            DDT: 5,
            IDT: 20,
            FDT: 80,
            RDT: 60,
            GIP: 1,
            TOS: 1,
            TNM: 'SPIRAALI-10',
            BFC: 1,
            SHP: 9,
            LPR: 1
        });
    
    }

    return cix;
}