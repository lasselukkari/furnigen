import Cix from '../Cix/Cix';
import Geometry from '../Cix/Geometry';

export default function TabletopCix({
  width,
  length,
  height

}) {

  const cix = new Cix(
    {
      "xml": "'xml':<?xml version=\"1.0\" encoding=\"utf-8\" ?>\r\n\t'xml':<!-- Created by bSolid -->\r\n\t'xml':<bSolid>\r\n\t'xml':\t<Settings \r\n\t'xml':\t\tMultiPanelEnabled=\"0\"\r\n\t'xml':\t\tMultiPanelOrigin=\"1\"\r\n\t'xml':\t/>\r\n\t'xml':\t<Panel>\r\n\t'xml':\t\t<MachinePosition \r\n\t'xml':\t\t\tEXORIGIN=\"1\"\r\n\t'xml':\t\t\tEXREFCORNER=\"1\"\r\n\t'xml':\t\t\tEXOFFSETX=\"0\"\r\n\t'xml':\t\t\tEXOFFSETY=\"0\"\r\n\t'xml':\t\t\tEXOFFSETZ=\"0\"\r\n\t'xml':\t\t\tEXROTX=\"0\"\r\n\t'xml':\t\t\tEXROTY=\"0\"\r\n\t'xml':\t\t\tEXROTZ=\"0\"\r\n\t'xml':\t\t\tEXMIRRORX=\"0\"\r\n\t'xml':\t\t\tEXMIRRORY=\"0\"\r\n\t'xml':\t\t/>\r\n\t'xml':\t</Panel>\r\n\t'xml':</bSolid>\r",
      "LPX": length,
      "LPY": width,
      "LPZ": height,
      "ORLST": "1",
      "FCN": 1
    });

  const G1001_1001 = new Geometry({ ID: "G1001.1001", CRN: "2", RTY: 2 });
  G1001_1001.setStartPoint({ X: 0, Y: width });
  G1001_1001.addLineEp({ ID: 100, XE: 0, YE: 0, ZE: 0 });
  G1001_1001.addLineEp({ ID: 101, XE: length, YE: 0, ZE: 0 });
  G1001_1001.addLineEp({ ID: 102, XE: length, YE: width, ZE: 0 });
  G1001_1001.addLineEp({ ID: 103, XE: 0, YE: width, ZE: 0 });
  cix.addGeometry(G1001_1001);

  cix.addCutGeo({
    ID: "P1003",
    GID: "G1001.1001",
    Z: 0,
    DP: 5,
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
    PRV: 1
  });

  return cix.toMacro();
}
