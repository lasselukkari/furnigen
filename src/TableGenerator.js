

import React, { useState } from 'react'
import TopNavigation from './TopNavigation';
import Table2 from './Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Sidebar from './Sidebar';

import ApronCix from './Apron/ApronCix';
import LegCix from './Leg/LegCix';
import MiddleSupportCix from './MiddleSupport/MiddleSupportCix';
import TabletopCix from './Tabletop/TabletopCix';



export default function TableGenerator() {

  const [tabletopHeigth, setTabletopHeigth] = useState(25);
  const [tabletopWidth, setTabletopWidth] = useState(800);
  const [tabletopLength, setTabletopLength] = useState(1200);
  const [legWidth, setLegSize] = useState(70);
  const [legHeight, setLegHeight] = useState(725);
  const [legMargin, setLegMargin] = useState(55);
  const [apronHeight, setApronHeight] = useState(80);
  const [apronWidth, setApronWidth] = useState(20);
  const [apronMargin, setApronMargin] = useState(10);

  const tyovara = 3;




  const halfTopWidth = tabletopWidth / 2;
  const halfTopLength = tabletopLength / 2;
  const halfApronHeight = apronHeight / 2;

  const twoLegWidthAndMargin = (legMargin + legWidth) * 2
  const halfLegHeight = legHeight / 2;
  const halfLegWidth = legWidth / 2;
  const legCenterMargin = legMargin + legWidth / 2;
  const apronCenterMargin = apronMargin + apronWidth / 2;

  const apronSlotCutWidth = apronWidth <= 16 ? 8 : 10;

  const apronSlotCutMaxHeight = 45;
  const apronSlotCutDistance = apronCenterMargin;
  const calculatedSlotCutDepth = legWidth - Math.floor(apronSlotCutDistance + (apronSlotCutWidth / 2));
  const legSlotDepth = calculatedSlotCutDepth > apronSlotCutMaxHeight ? apronSlotCutMaxHeight : calculatedSlotCutDepth;
  const apronPinLength = legSlotDepth - 1;
  const apronPinWidth = apronHeight - 20;

  const supportWidth = 20;
  const supportHeight = apronHeight - 5;
  const supportLength = ((legWidth - apronMargin - apronWidth) * Math.sqrt(2) * 2) + 2 * supportWidth + 5;
  const middleSupport = tabletopLength > 1600;

  const middleSupportLength = tabletopWidth - 2 * legMargin - 2 * apronMargin - 2 * apronWidth;
  const middleSupportWidth = apronHeight - 10;
  const middleSupportHeight = 30;

  const aprons = [
    {
      name: 'Apron 1',
      x: 0,
      y: halfLegHeight - halfApronHeight,
      z: legMargin + apronCenterMargin - halfTopLength,
      rotationY: 90,
      length: tabletopWidth - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
      pinLength: apronPinLength,

    },
    {
      name: 'Apron 2',
      x: 0,
      y: halfLegHeight - halfApronHeight,
      z: halfTopLength - apronCenterMargin - legMargin,
      rotationY: 90,
      length: tabletopWidth - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
      pinLength: apronPinLength,
    },
    {
      name: 'Apron 3',
      x: legMargin + apronCenterMargin - halfTopWidth,
      y: halfLegHeight - halfApronHeight,
      z: 0,
      length: tabletopLength - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
      pinLength: apronPinLength,
    },
    {
      name: 'Apron 4',
      x: halfTopWidth - apronCenterMargin - legMargin,
      y: halfLegHeight - halfApronHeight,
      z: 0,
      length: tabletopLength - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
      pinLength: apronPinLength,
    }
  ]

  const legs = [
    {
      name: 'Leg 1',
      x: legCenterMargin - halfTopWidth,
      y: 0,
      z: legCenterMargin - halfTopLength,
      length: legHeight,
      width: legWidth,
      height: legWidth,
      slotDepth: legSlotDepth,
      slotLength: apronPinWidth,
    },
    {
      name: 'Leg 2',
      x: halfTopWidth - legCenterMargin,
      y: 0,
      z: legCenterMargin - halfTopLength,
      length: legHeight,
      width: legWidth,
      height: legWidth,
      slotDepth: legSlotDepth,
      slotLength: apronPinWidth,
    },
    {
      name: 'Leg 3',
      x: legCenterMargin - halfTopWidth,
      y: 0,
      z: halfTopLength - legCenterMargin,
      length: legHeight,
      width: legWidth,
      height: legWidth,
      slotDepth: legSlotDepth,
      slotLength: apronPinWidth,
    },
    {
      name: 'Leg 4',
      x: halfTopWidth - legCenterMargin,
      y: 0,
      z: halfTopLength - legCenterMargin,
      length: legHeight,
      width: legWidth,
      height: legWidth,
      slotDepth: legSlotDepth,
      slotLength: apronPinWidth,
    }
  ]

  const angleSupports = [
    {
      x: -halfTopWidth + legMargin + apronMargin + apronWidth,
      y: -halfTopLength + legMargin + apronMargin + apronWidth,
      z: legHeight / 2,
      length: supportLength,
      width: supportHeight,
      height: supportWidth,
      rotationZ: 0
    },
    {
      x: halfTopWidth - legMargin - apronMargin - apronWidth,
      y: -halfTopLength + legMargin + apronMargin + apronWidth,
      z: legHeight / 2,
      length: supportLength,
      width: supportHeight,
      height: supportWidth,
      rotationZ: 270
    },
    {
      x: -halfTopWidth + legMargin + apronMargin + apronWidth,
      y: halfTopLength - legMargin - apronMargin - apronWidth,
      z: legHeight / 2,
      length: supportLength,
      width: supportHeight,
      height: supportWidth,
      rotationZ: 90
    },
    {
      x: halfTopWidth - legMargin - apronMargin - apronWidth,
      y: halfTopLength - legMargin - apronMargin - apronWidth,
      z: legHeight / 2,
      length: supportLength,
      width: supportHeight,
      height: supportWidth,
      rotationZ: 180
    }
  ]

  const support = {
    y: legHeight / 2 - middleSupportWidth / 2,
    length: middleSupportLength,
    width: middleSupportWidth,
    height: middleSupportHeight,
    pinLength: 10,
    renderSupport: middleSupport,
  }

  const tabletop = {
    z: legHeight / 2 + tabletopHeigth / 2,
    length: tabletopLength,
    width: tabletopWidth,
    height: tabletopHeigth,
  }

  function handleClick(name, cix) {
    if (cix) {
      const element = document.createElement("a");
      const file = new Blob([cix()], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = `${name}.cix`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  }


  return (
    <div>
      <br />
      <Row>
        <Col lg={8}>
          <Table2
            tabletop={tabletop}
            aprons={aprons}
            legs={legs}
            angleSupports={angleSupports}
            middleSupport={support}
          />
        </Col>
        <Col lg={4}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Top</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Label>
                    Thickness: {tabletopHeigth}
                  </Form.Label>
                  <Form.Range type="number" min="12" max="40" value={tabletopHeigth} onChange={(e) => setTabletopHeigth(Number(e.target.value))} />

                  <Form.Label>
                    Width: {tabletopWidth}
                  </Form.Label>
                  <Form.Range type="number" min="400" max="1200" value={tabletopWidth} onChange={(e) => setTabletopWidth(Number(e.target.value))} />

                  <Form.Label>
                    Length: {tabletopLength}
                  </Form.Label>
                  <Form.Range type="number" min="600" max="3600" value={tabletopLength} onChange={(e) => setTabletopLength(Number(e.target.value))} />
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Legs</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Label>
                    Width: {legWidth}
                  </Form.Label>
                  <Form.Range type="number" min="65" max="120" value={legWidth} onChange={(e) => setLegSize(Number(e.target.value))} />
                  <Form.Label>
                    Height: {legHeight}
                  </Form.Label>
                  <Form.Range type="number" min="500" max="1200" value={legHeight} onChange={(e) => setLegHeight(Number(e.target.value))} />
                  <Form.Label>
                    Margin: {legMargin}
                  </Form.Label>
                  <Form.Range type="number" min={3} max={halfTopWidth - halfLegWidth} value={legMargin} onChange={(e) => setLegMargin(Number(e.target.value))} />

                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Apron</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Label>
                    Height: {apronHeight}
                  </Form.Label>
                  <Form.Range type="number" min="65" max="140" value={apronHeight} onChange={(e) => setApronHeight(Number(e.target.value))} />
                  <Form.Label>
                    Width: {apronWidth}
                  </Form.Label>
                  <Form.Range type="number" min="16" max={legWidth - apronMargin - 3} value={apronWidth} onChange={(e) => setApronWidth(Number(e.target.value))} />
                  <Form.Label>
                    Margin: {apronMargin}
                  </Form.Label>
                  <Form.Range type="number" min="3" max={legWidth / 2 - apronWidth / 2 - 3} value={apronMargin} onChange={(e) => setApronMargin(Number(e.target.value))} />

                </Form>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <h2>
        Cut list
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Part</th>
            <th>Count</th>
            <th>Blank Dimensions</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>1.</td>
            <td><Button
              size={"sm"}
              variant="outline-primary"
              onClick={(e) => handleClick(`TableTop_${tabletopLength}_${tabletopWidth}_${tabletopHeigth}`)}>
              TableTop.cix
            </Button></td>
            <td>1</td>
            <td>{(tabletopLength + (2 * tyovara))} * {(tabletopWidth + (2 * tyovara))} * {tabletopHeigth}</td>
          </tr>
          <tr>
            <td>2.</td>
            <td><Button
              size={"sm"}
              variant="outline-primary"
              onClick={(e) => handleClick(`Leg_${legHeight}_${legWidth}_${legWidth}`)}>
              Leg.cix
            </Button></td>
            <td>4</td>
            <td>{legHeight + (tyovara * 2)} * {legWidth} * {legWidth}</td>

          </tr>
          <tr>
            <td>3.</td>
            <td><Button
              size={"sm"}
              variant="outline-primary"
              onClick={(e) => handleClick(`Apron 1_${tabletopLength - (twoLegWidthAndMargin)}_${apronHeight}_${apronWidth}`)}>
              Apron 1.cix
            </Button></td>
            <td>2</td>
            <td>{tabletopLength - (twoLegWidthAndMargin) + ((legSlotDepth - 2) * 2) + (2 * tyovara)} * {apronHeight + (tyovara * 2)} * {apronWidth}</td>

          </tr>
          <tr>
            <td>4.</td>
            <td><Button
              size={"sm"}
              variant="outline-primary"
              onClick={(e) => handleClick(`Apron 2_${tabletopWidth - (twoLegWidthAndMargin)}_${apronHeight}_${apronWidth}`)}>
              Apron 2.cix
            </Button></td>
            <td>2</td>
            <td>{tabletopWidth - (twoLegWidthAndMargin) + ((legSlotDepth - 2) * 2) + (2 * tyovara)} * {apronHeight + (tyovara * 2)} * {apronWidth}</td>

          </tr>


        </tbody>
      </Table>

    </div>
  )
}
