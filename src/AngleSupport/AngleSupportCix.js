import Cix from '../Cix/Cix';
import Geometry from '../Cix/Geometry';

export default function ApronCix({
  width,
  length,
}) {

  const cix = new Cix(
    {
      "xml": "'xml':<?xml version=\"1.0\" encoding=\"utf-8\" ?>\r\n\t'xml':<!-- Created by bSolid -->\r\n\t'xml':<bSolid>\r\n\t'xml':\t<Settings \r\n\t'xml':\t\tMultiPanelEnabled=\"0\"\r\n\t'xml':\t\tMultiPanelOrigin=\"1\"\r\n\t'xml':\t/>\r\n\t'xml':\t<Panel>\r\n\t'xml':\t\t<MachinePosition \r\n\t'xml':\t\t\tEXORIGIN=\"1\"\r\n\t'xml':\t\t\tEXREFCORNER=\"1\"\r\n\t'xml':\t\t\tEXOFFSETX=\"0\"\r\n\t'xml':\t\t\tEXOFFSETY=\"0\"\r\n\t'xml':\t\t\tEXOFFSETZ=\"0\"\r\n\t'xml':\t\t\tEXROTX=\"0\"\r\n\t'xml':\t\t\tEXROTY=\"0\"\r\n\t'xml':\t\t\tEXROTZ=\"0\"\r\n\t'xml':\t\t\tEXMIRRORX=\"0\"\r\n\t'xml':\t\t\tEXMIRRORY=\"0\"\r\n\t'xml':\t\t/>\r\n\t'xml':\t</Panel>\r\n\t'xml':</bSolid>\r",
      "LPX": `${width * 2} + TOOL_DIAMETER`,
      "LPY": length,
      "LPZ": 20,
      "ORLST": "5",
      "FCN": 1
    });

  cix.addPublicVars({
    "TOOL_DIAMETER": 14.45,
  });

  cix.addOffset({
    X: 3,
    Y: 3,
    Z: 0
  });

  const G1001_1001 = new Geometry({ ID: "G1001.1001", CRN: "2", RTY: 2 });
  G1001_1001.setStartPoint({ X: 0, Y: length });
  G1001_1001.addLineEp({ ID: 100, XE: 0, YE: 0, ZE: 0, MVT: 0 });
  G1001_1001.addLineEp({ ID: 101, XE: `${width * 2} + TOOL_DIAMETER`, YE: 0, ZE: 0, MVT: 0 });
  G1001_1001.addLineEp({ ID: 102, XE: `${width * 2} + TOOL_DIAMETER`, YE: length, ZE: 0, MVT: 0 });
  G1001_1001.addLineEp({ ID: 103, XE: 0, YE: length, ZE: 0, MVT: 0 });
  cix.addGeometry(G1001_1001);

  const G1001_1006 = new Geometry({ ID: "G1001.1006", SIDE: 3, RTY: 2 });
  G1001_1006.setStartPoint({ X: 0, Y: 0 });
  G1001_1006.addLineEp({ XE: 20, YE: 20, ZE: 0 });
  cix.addGeometry(G1001_1006);

  const G1001_1007 = new Geometry({ ID: "G1001.1007", SIDE: 3, RTY: 2 });
  G1001_1007.setStartPoint({ X: length, Y: 0 });
  G1001_1007.addLincEp({ XI: -20, YI: 20, ZE: 0 });
  cix.addGeometry(G1001_1007);

  const G1001_1011 = new Geometry({ ID: "G1001.1011", RTY: 2 });
  G1001_1011.setStartPoint({ X: "LPX / 2", Y: 0 });
  G1001_1011.addLincEp({ YI: length, ZE: 0 });
  cix.addGeometry(G1001_1011);

  cix.addOffset({
    X: 50,
    Y: 50,
    Z: 0
  });

  cix.addCutGeo({
    ID: "P1005",
    GID: "G1001.1001",
    SIL: "101,103",
    Z: 0,
    DP: 2,
    THR: 1,
    CRC: 2,
    RV: 1,
    CKA: 2,
    AZ: 45,
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
    BDR: 1,
    PRV: 1,
    BTT: 0.1
  });

  cix.addCutGeo({
    ID: "P1016",
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
    SHP: 5,
    BDR: 1,
    PRV: 1,
    BTT: 0.1
  });

  cix.addBg({
    ID: "P1011",
    CRN: "1,4,3,2",
    X: "(LPX - TOOL_DIAMETER) / 4",
    Y: 40,
    Z: -5,
    DP: 15,
    TNM: "SPIRAALI14_54",
    CKA: 3,
    AZ: 45,
    AR: 90,
    RTY: -1,
    OPT: 1,
    RMD: 1,
    TOS: 1,
    BFC: 1
  });

  cix.addRoutg({
    ID: "P1015",
    GID: "G1001.1011",
    Z: 0,
    DP: -2,
    THR: 1,
    CKA: 3,
    OPT: 1,
    RSP: 18000,
    WSP: 10000,
    DSP: 2500,
    VTR: 4,
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
    NEBS: 1,
    LPR: 1,
    ZE: 0
  });


  return cix.toMacro();
}
