import ApronCix from './Apron/ApronCix';
import LegCix from './Leg/LegCix';
import TabletopCix from './Tabletop/TabletopCix';
import MiddleSupportCix from './MiddleSupport/MiddleSupportCix';
import CornerSupportCix from './CornerSupport/CornerSupportCix';
import AttachmentCix from './Attachment/AttachmentCix';


export default class GeometryHelper {
  constructor({
    tabletopHeigth,
    tabletopWidth,
    tabletopLength,
    legWidth,
    legLength,
    legMargin,
    apronWidth,
    apronHeight,
    apronMargin,
  }) {

    this.tabletopHeigth = tabletopHeigth;
    this.tabletopWidth = tabletopWidth;
    this.tabletopLength = tabletopLength;
    this.legWidth = legWidth;
    this.legLength = legLength;
    this.legMargin = legMargin;
    this.apronWidth = apronWidth;
    this.apronHeight = apronHeight;
    this.apronMargin = apronMargin;

    this.toolingAllowance = 3;
    this.halfTopWidth = tabletopWidth / 2;
    this.halfTopLength = tabletopLength / 2;
    this.halfApronHeight = apronWidth / 2;

    this.twoLegWidthAndMargin = (legMargin + legWidth) * 2
    this.halfLegLength = legLength / 2;
    this.halfLegWidth = legWidth / 2;
    this.legCenterMargin = legMargin + legWidth / 2;
    this.apronCenterMargin = apronMargin + apronHeight / 2;
    this.maxLegMargin = this.halfTopWidth - this.halfLegWidth;


    this.apronPinHeight = 10;

    const apronSlotCutMaxHeight = 45;
    this.apronSlotCutDistance = this.apronCenterMargin;
    const calculatedSlotCutDepth = legWidth - Math.floor(this.apronSlotCutDistance + (this.apronPinHeight / 2));
    this.legSlotDepth = calculatedSlotCutDepth > apronSlotCutMaxHeight ? apronSlotCutMaxHeight : calculatedSlotCutDepth;
    this.apronPinLength = this.legSlotDepth - 1;
    this.apronPinWidth = apronWidth - 20;
    this.maxApronHeight = this.legWidth - this.apronMargin - 3
    this.maxApronMargin = this.legWidth / 2 - this.apronHeight / 2 - 3
    this.shortApronLength = this.tabletopWidth - this.twoLegWidthAndMargin;
    this.longApronLength = this.tabletopLength - this.twoLegWidthAndMargin;

    this.conrnerSupportHeight = 20;
    this.conrnerSupportWidth = apronWidth - 5;
    this.conrnerSupportLength = ((legWidth - apronMargin - apronHeight) * Math.sqrt(2) * 2) + 2 * this.conrnerSupportHeight + 5;
    if (this.conrnerSupportLength < 100) {
      this.conrnerSupportLength = 100;
    }

    this.addMiddleSupport = tabletopLength > 1600;
    this.middleSupportLength = tabletopWidth - 2 * legMargin - 2 * apronMargin - 2 * apronHeight;
    this.middleSupportWidth = apronWidth - 10;
    this.middleSupportHeight = 30;
    this.middleSupportPinLength = this.apronHeight - 10;


    this.shortApronAattachPointCount = Math.ceil(this.shortApronLength / 500);
    this.longAprongAttachPointCount = Math.ceil(this.longApronLength / 500);

    if (this.addMiddleSupport && this.longAprongAttachPointCount % 2 === 1) {
      this.longAprongAttachPointCount++;
    }

  }



  aprons() {
    return [
      {
        x: 0,
        y: this.halfLegLength - this.halfApronHeight,
        z: this.legMargin + this.apronCenterMargin - this.halfTopLength,
        rotationY: 90,
        length: this.tabletopWidth - this.twoLegWidthAndMargin,
        width: this.apronWidth,
        height: this.apronHeight,
        pinLength: this.apronPinLength,

      },
      {
        x: 0,
        y: this.halfLegLength - this.halfApronHeight,
        z: this.halfTopLength - this.apronCenterMargin - this.legMargin,
        rotationY: 90,
        length: this.tabletopWidth - this.twoLegWidthAndMargin,
        width: this.apronWidth,
        height: this.apronHeight,
        pinLength: this.apronPinLength,
      },
      {
        x: this.legMargin + this.apronCenterMargin - this.halfTopWidth,
        y: this.halfLegLength - this.halfApronHeight,
        z: 0,
        length: this.tabletopLength - this.twoLegWidthAndMargin,
        width: this.apronWidth,
        height: this.apronHeight,
        pinLength: this.apronPinLength,
      },
      {
        x: this.halfTopWidth - this.apronCenterMargin - this.legMargin,
        y: this.halfLegLength - this.halfApronHeight,
        z: 0,
        length: this.tabletopLength - this.twoLegWidthAndMargin,
        width: this.apronWidth,
        height: this.apronHeight,
        pinLength: this.apronPinLength,
      }
    ]
  }

  legs() {
    return [
      {
        x: this.legCenterMargin - this.halfTopWidth,
        y: 0,
        z: this.legCenterMargin - this.halfTopLength,
        length: this.legLength,
        width: this.legWidth,
        height: this.legWidth,
        slotDepth: this.legSlotDepth,
        slotLength: this.apronPinWidth,
      },
      {
        x: this.halfTopWidth - this.legCenterMargin,
        y: 0,
        z: this.legCenterMargin - this.halfTopLength,
        length: this.legLength,
        width: this.legWidth,
        height: this.legWidth,
        slotDepth: this.legSlotDepth,
        slotLength: this.apronPinWidth,
      },
      {
        x: this.legCenterMargin - this.halfTopWidth,
        y: 0,
        z: this.halfTopLength - this.legCenterMargin,
        length: this.legLength,
        width: this.legWidth,
        height: this.legWidth,
        slotDepth: this.legSlotDepth,
        slotLength: this.apronPinWidth,
      },
      {
        x: this.halfTopWidth - this.legCenterMargin,
        y: 0,
        z: this.halfTopLength - this.legCenterMargin,
        length: this.legLength,
        width: this.legWidth,
        height: this.legWidth,
        slotDepth: this.legSlotDepth,
        slotLength: this.apronPinWidth,
      }
    ]
  }


  angleSupports() {
    return [
      {
        x: -this.halfTopWidth + this.legMargin + this.apronMargin + this.apronHeight,
        y: -this.halfTopLength + this.legMargin + this.apronMargin + this.apronHeight,
        z: this.legLength / 2,
        length: this.conrnerSupportLength,
        width: this.conrnerSupportWidth,
        height: this.conrnerSupportHeight,
        rotationZ: 0
      },
      {
        x: this.halfTopWidth - this.legMargin - this.apronMargin - this.apronHeight,
        y: -this.halfTopLength + this.legMargin + this.apronMargin + this.apronHeight,
        z: this.legLength / 2,
        length: this.conrnerSupportLength,
        width: this.conrnerSupportWidth,
        height: this.conrnerSupportHeight,
        rotationZ: 270
      },
      {
        x: -this.halfTopWidth + this.legMargin + this.apronMargin + this.apronHeight,
        y: this.halfTopLength - this.legMargin - this.apronMargin - this.apronHeight,
        z: this.legLength / 2,
        length: this.conrnerSupportLength,
        width: this.conrnerSupportWidth,
        height: this.conrnerSupportHeight,
        rotationZ: 90
      },
      {
        x: this.halfTopWidth - this.legMargin - this.apronMargin - this.apronHeight,
        y: this.halfTopLength - this.legMargin - this.apronMargin - this.apronHeight,
        z: this.legLength / 2,
        length: this.conrnerSupportLength,
        width: this.conrnerSupportWidth,
        height: this.conrnerSupportHeight,
        rotationZ: 180
      }
    ]
  }

  middleSupport() {
    return {
      y: this.legLength / 2 - this.middleSupportWidth / 2,
      length: this.middleSupportLength,
      width: this.middleSupportWidth,
      height: this.middleSupportHeight,
      pinLength: 10,
      renderSupport: this.addMiddleSupport,
    }
  }

  tabletop() {
    return {
      z: this.legLength / 2 + this.tabletopHeigth / 2,
      length: this.tabletopLength,
      width: this.tabletopWidth,
      height: this.tabletopHeigth,
    }
  }

  attachments() {
    const attachments = [];
    const margin = ( this.conrnerSupportLength * (1 / Math.sqrt(2))) - (this.legWidth - this.apronMargin - this.apronHeight) + 35;
    const longApronFreeLength = this.longApronLength - (margin * 2);
    const longApronStart = -longApronFreeLength / 2;
    const longApronStep = longApronFreeLength / (this.longAprongAttachPointCount-1);


    for (let i = 0; i < this.longAprongAttachPointCount; i++) {
      attachments.push({
        x: this.halfTopWidth - this.legMargin - this.apronMargin - this.apronHeight-25,
        y: longApronStart + longApronStep * i,
        z: this.legLength / 2,
      })
    }

    for (let i = 0; i < this.longAprongAttachPointCount; i++) {
      attachments.push({
        x: -this.halfTopWidth + this.legMargin + this.apronMargin + this.apronHeight+25,
        y: longApronStart + longApronStep * i,
        z: this.legLength / 2,
      })
    }

    const shortApronFreeLength = this.shortApronLength - (margin * 2);
    console.log(shortApronFreeLength);
    const shortApronStart = -shortApronFreeLength / 2;
    const shortApronStep = shortApronFreeLength / (this.shortApronAattachPointCount-1);

    for (let i = 0; i < this.shortApronAattachPointCount; i++) {
      attachments.push({
        x: shortApronStart + shortApronStep * i,
        y: this.halfTopLength - this.legMargin - this.apronMargin - this.apronHeight-25,
        z: this.legLength / 2,
      })
    }

    for (let i = 0; i < this.shortApronAattachPointCount; i++) {
      attachments.push({
        x: shortApronStart + shortApronStep * i,
        y: -this.halfTopLength + this.legMargin + this.apronMargin + this.apronHeight+25,
        z: this.legLength / 2,
      })
    }

    return attachments;
  }


  cutList() {
    const parts = [
      {
        name: 'Tabletop',
        length: (this.tabletopLength + (2 * this.toolingAllowance)),
        width: (this.tabletopWidth + (2 * this.toolingAllowance)),
        height: this.tabletopHeigth,
        quantity: 1,
        cix: () => TabletopCix({
          height: this.tabletopHeigth,
          width: this.tabletopWidth,
          length: this.tabletopLength,
        })
      },
      {
        name: "Leg",
        length: this.legLength + (this.toolingAllowance * 2),
        width: this.legWidth,
        height: this.legWidth,
        quantity: 4,
        cix: () => LegCix({
          width: this.legWidth,
          length: this.legLength,
          apronHeight: this.apronHeight,
          apronWidth: this.apronWidth,
          apronMargin: this.apronMargin,
          pinLength: this.apronPinLength,
        })
      },
      {

        name: "Long apron",
        length: this.tabletopLength - (this.twoLegWidthAndMargin) + ((this.legSlotDepth - 2) * 2) + (2 * this.toolingAllowance),
        width: this.apronWidth + (this.toolingAllowance * 2),
        height: this.apronHeight,
        quantity: 2,
        cix: () => ApronCix({
          height: this.apronHeight,
          width: this.apronWidth,
          length: this.tabletopWidth - this.twoLegWidthAndMargin,
          pinLength: this.apronPinLength,
          pinHeight: this.apronPinHeight,
          middleSupportPinLength: this.middleSupportPinLength,
          useMiddleSupport: this.addMiddleSupport,
        })
      },
      {
        name: "Short apron",
        length: this.tabletopWidth - (this.twoLegWidthAndMargin) + ((this.legSlotDepth - 2) * 2) + (2 * this.toolingAllowance),
        width: this.apronWidth + (this.toolingAllowance * 2),
        height: this.apronHeight,
        quantity: 2,
        cix: () => ApronCix({
          height: this.apronHeight,
          width: this.apronWidth,
          length: this.tabletopWidth - this.twoLegWidthAndMargin,
          pinLength: this.apronPinLength,
          pinHeight: this.apronPinHeight,
        })
      },
      {
        name: 'Corner Support',
        length: this.conrnerSupportLength + (this.toolingAllowance * 2),
        width: this.conrnerSupportWidth + (this.toolingAllowance * 2),
        height: this.conrnerSupportHeight,
        quantity: 4,
        cix: () => CornerSupportCix({
          width: this.conrnerSupportWidth,
          length: this.conrnerSupportLength,
        })
      },
      {
        name: 'Attachements',
        width: "TOOL_DIAMETER * 2 + 153+",
        length: "TOOL_DIAMETER + 124+",
        height: 19,
        quantity: 4,
        cix: () => AttachmentCix(),
      },
    ]

    if (this.addMiddleSupport) {
      parts.push({
        name: 'Middle Support',
        length: this.middleSupportLength + (this.toolingAllowance * 2) + (this.middleSupportWidth * 2),
        width: this.middleSupportWidth + (this.toolingAllowance * 2),
        height: this.middleSupportHeight,
        quantity: 1,
        cix: () => MiddleSupportCix({
          width: this.middleSupportWidth,
          length: this.middleSupportLength,
          height: this.middleSupportHeight,
          pinLength: this.middleSupportPinLength,
        })
      });
    }

    return parts;
  }

}