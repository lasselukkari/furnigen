import Cix from '../Cix/Cix';
import Geometry from '../Cix/Geometry';

export default function ApronCix({
     width,
     length,
     apronHeight,
     apronWidth,
     apronMargin,
	 pinLength
}) {
	const slotDistance = (apronHeight / 2) + apronMargin;

	const cix = new Cix(
		{
			xml: '\'xml\':<?xml version="1.0" encoding="utf-8" ?>\r\n\t\'xml\':<!-- Created by bSolid -->\r\n\t\'xml\':<bSolid>\r\n\t\'xml\':\t<Settings \r\n\t\'xml\':\t\tMultiPanelEnabled="1"\r\n\t\'xml\':\t\tMultiPanelOrigin="1"\r\n\t\'xml\':\t/>\r\n\t\'xml\':\t<Panel>\r\n\t\'xml\':\t\t<MachinePosition \r\n\t\'xml\':\t\t\tEXORIGIN="1"\r\n\t\'xml\':\t\t\tEXREFCORNER="1"\r\n\t\'xml\':\t\t\tEXOFFSETX="0"\r\n\t\'xml\':\t\t\tEXOFFSETY="0"\r\n\t\'xml\':\t\t\tEXOFFSETZ="0"\r\n\t\'xml\':\t\t\tEXROTX="0"\r\n\t\'xml\':\t\t\tEXROTY="0"\r\n\t\'xml\':\t\t\tEXROTZ="0"\r\n\t\'xml\':\t\t\tEXMIRRORX="0"\r\n\t\'xml\':\t\t\tEXMIRRORY="0"\r\n\t\'xml\':\t\t/>\r\n\t\'xml\':\t</Panel>\r\n\t\'xml\':</bSolid>\r',
			LPX: length,
			LPY: width,
			LPZ: width,
			ORLST: '5',
			FCN: 1
		});

	const G1001_1001 = new Geometry({ID: 'G1001.1001', CRN: '2', RTY: 2});
	G1001_1001.setStartPoint({Y: width});
	G1001_1001.addLineTo({ID: 100});
	G1001_1001.addLineTo({ID: 101, XE: length});
	G1001_1001.addLineTo({ID: 102, XE: length, YE: width});
	G1001_1001.addLineTo({ID: 103, YE: width});
	cix.addGeometry(G1001_1001);

  // Slot
	const G1001_1002 = new Geometry({ID: 'G1001.1002', RTY: 2});
	G1001_1002.setStartPoint({X: 20, Y: slotDistance});
	G1001_1002.addLineTo({XE: apronWidth - 10, YE: 20});
	cix.addGeometry(G1001_1002);

  // Slot
	const G1001_1003 = new Geometry({ID: 'G1001.1003', SIDE: 2, CRN: '2', RTY: 2});
	G1001_1003.setStartPoint({X: 20, Y: slotDistance});
	G1001_1003.addLineTo({XE: apronWidth - 10, YE: 20});
	cix.addGeometry(G1001_1003);

  // End cut
	const G1001_1006 = new Geometry({ID: 'G1001.1006', RTY: 2});
	G1001_1006.setStartPoint({});
	G1001_1006.addLineTo({YE: width});
	cix.addGeometry(G1001_1006);

  // End cut
	const G1001_1007 = new Geometry({ID: 'G1001.1007', RTY: 2, RV: 1});
	G1001_1007.setStartPoint({X: length});
	G1001_1007.addLineTo({XE: length, YE: width});
	cix.addGeometry(G1001_1007);

	cix.addRouting({
		ID: 'P1005',
		GID: 'G1001.1002',
		DP: pinLength,
		CKA: 3,
		OPT: 1,
		RSP: 24000,
		IOS: 5000,
		WSP: 8000,
		DSP: 1800,
		VTR: 10,
		INCSTP: 1,
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
		NEBS: 1,
		LPR: 1
	});

	cix.addRouting({
		ID: 'P1005',
		GID: 'G1001.1003',
		DP: pinLength,
		CKA: 3,
		OPT: 1,
		RSP: 24000,
		IOS: 5000,
		WSP: 8000,
		DSP: 1800,
		VTR: 10,
		INCSTP: 1,
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
		NEBS: 1,
		LPR: 1
	});

	cix.addCut({
		ID: 'P1006',
		GID: 'G1001.1006',
		DP: 5,
		THR: 1,
		CRC: 2,
		CKA: 2,
		OPT: 1,
		RSP: 6000,
		WSP: 14000,
		DSP: 2500,
		DIN: 150,
		DOU: 150,
		TOS: 1,
		VTR: 2,
		GIP: 1,
		TNM: 'SAHA300',
		SHP: 5,
		BDR: 1,
		PRV: 1
	});

	cix.addCut({
		ID: 'P1006',
		GID: 'G1001.1007',
		DP: 5,
		THR: 1,
		CRC: 2,
		CKA: 2,
		OPT: 1,
		RSP: 6000,
		WSP: 14000,
		DSP: 2500,
		DIN: 150,
		DOU: 150,
		TOS: 1,
		VTR: 2,
		GIP: 1,
		TNM: 'SAHA300',
		SHP: 5,
		BDR: 1,
		PRV: 1
	});

	return cix.toMacro();
}
