

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

import Handlebars from 'handlebars/dist/cjs/handlebars'
import raw from "raw.macro";

import template from 'es6-template-strings';


const tableTopTemplate = raw('./tableTopTemplate.txt');
const legTemplate = raw('./legTemplate.txt');
const apronTemplate = raw('./apronTemplate.txt');


export default function TableGenerator() {

  const [tableTopHeigth, setTableTopHeigth] = useState(25);
  const [tableTopWidth, setTableTopWidth] = useState(800);
  const [tableTopLength, setTableTopLength] = useState(1200);
  const [legWidth, setLegSize] = useState(70);
  const [legHeight, setLegHeight] = useState(725);
  const [legMargin, setLegMargin] = useState(55);
  const [apronHeight, setApronHeight] = useState(80);
  const [apronWidth, setApronWidth] = useState(20);
  const [apronMargin, setApronMargin] = useState(10);

  const rotation = 0.5;
  const tyovara = 3;


  const tools = {
    8: {
      TNM: "SPIRAALI-8",
      IOS: 0,
      WSP: 7000,
      DSP: 1500,
      BCF: 8, // tarkista

    },
    10: {
      TNM: "SPIRAALI-10",
      IOS: 5000,
      WSP: 8000,
      DSP: 1800,
      BCF: 8, // tarkista
    }
  }
  const halfTopWidth = tableTopWidth / 2;
  const halfTopLength = tableTopLength / 2;
  const halfApronWidth = apronWidth / 2;
  const halfApronHeight = apronHeight / 2;
  const halfLegWidth = legWidth / 2;
  const twoLegWidthAndMargin = (legMargin + legWidth) * 2
  const halfLegHeight = legHeight / 2;
  const legCenterMargin = legMargin + halfLegWidth;
  const apronCenterMargin = apronMargin + halfApronWidth;

  const apronSlotCutWidth = apronWidth <= 16 ? 8 : 10;
  const tool = tools[apronSlotCutWidth];

  const apronSlotCutMaxHeight = 45;
  const apronSlotCutDistance = apronCenterMargin;
  const foo = legWidth - Math.floor(apronSlotCutDistance + (apronSlotCutWidth / 2));
  const apronSlotCutDepth = foo > apronSlotCutMaxHeight ? apronSlotCutMaxHeight : foo;
  const apronsSlotCutX1 = 20;
  const apronsSlotCutX2 = apronHeight - halfApronWidth
  const apronPinLength = apronSlotCutDepth - 1;


  const apron1Length = tableTopLength - (twoLegWidthAndMargin) + (2 * (apronPinLength));
  const apron2Length = tableTopWidth - (twoLegWidthAndMargin) + (2 * (apronPinLength));

  const legCix = () => template(legTemplate, { legWidth, legHeight, apronWidth, apronHeight, apronMargin, apronSlotCutDistance, apronSlotCutDepth, apronsSlotCutX1, apronsSlotCutX2, tool });
  const tableTopCix = () => template(tableTopTemplate,{ tableTopHeigth, tableTopWidth, tableTopLength });
  const apron1Cix = () => template(apronTemplate, { apronHeight, apronWidth, apronSlotCutDistance, apronPinLength, apronsSlotCutX1, apronsSlotCutX2, apronLength: apron1Length });
  const apron2Cix = () => template(apronTemplate, { apronHeight, apronWidth, apronSlotCutDistance, apronPinLength, apronsSlotCutX1, apronsSlotCutX2, apronLength: apron2Length });

  const aprons = [
    {
      name: 'Apron 1',
      position: {
        x: 0,
        y: legMargin + apronCenterMargin - halfTopLength,
        z: halfLegHeight - halfApronHeight
      },
      dimensions: { x: tableTopWidth - twoLegWidthAndMargin, y: apronWidth, z: apronHeight },
      textureRotation: rotation,
    }, {
      name: 'Apron 2',
      position: {
        x: 0,
        y: halfTopLength - apronCenterMargin - legMargin,
        z: halfLegHeight - halfApronHeight
      },
      dimensions: { x: tableTopWidth - twoLegWidthAndMargin, y: apronWidth, z: apronHeight },
      textureRotation: rotation,
    }, {
      name: 'Apron 3',
      position: {
        x: legMargin + apronCenterMargin - halfTopWidth,
        y: 0,
        z: halfLegHeight - halfApronHeight
      },
      dimensions: {
        x: apronWidth,
        y: tableTopLength - twoLegWidthAndMargin,
        z: apronHeight
      },
      textureRotation: rotation,
    }, {
      name: 'Apron 4',
      position: {
        x: tableTopWidth - legMargin - apronCenterMargin - halfTopWidth,
        y: 0,
        z: halfLegHeight - halfApronHeight
      },
      dimensions: { x: apronWidth, y: tableTopLength - twoLegWidthAndMargin, z: apronHeight },
      textureRotation: rotation,
    }
  ]

  const tableState = [{
    name: 'Table Top',
    position: { x: 0, y: 0, z: halfLegHeight + (tableTopHeigth / 2) },
    dimensions: { x: tableTopWidth, y: tableTopLength, z: tableTopHeigth },
  }, {
    name: 'Leg 1',
    position: {
      x: -halfTopWidth + halfLegWidth + legMargin,
      y: legCenterMargin - halfTopLength,
      z: 0
    },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Leg 2',
    position: {
      x: tableTopWidth - legCenterMargin - halfTopWidth,
      y: legCenterMargin - halfTopLength,
      z: 0
    },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Leg 3',
    position: {
      x: legCenterMargin - halfTopWidth,
      y: tableTopLength - legCenterMargin - halfTopLength,
      z: 0
    },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Leg 4',
    position: {
      x: tableTopWidth - legCenterMargin - halfTopWidth,
      y: tableTopLength - legCenterMargin - halfTopLength,
      z: 0
    },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Apron 1',
    position: {
      x: 0,
      y: legMargin + apronCenterMargin - halfTopLength,
      z: halfLegHeight - halfApronHeight
    },
    dimensions: { x: tableTopWidth - twoLegWidthAndMargin, y: apronWidth, z: apronHeight },
    textureRotation: rotation,
  }, {
    name: 'Apron 2',
    position: {
      x: 0,
      y: halfTopLength - apronCenterMargin - legMargin,
      z: halfLegHeight - halfApronHeight
    },
    dimensions: { x: tableTopWidth - twoLegWidthAndMargin, y: apronWidth, z: apronHeight },
    textureRotation: rotation,
  }, {
    name: 'Apron 3',
    position: {
      x: legMargin + apronCenterMargin - halfTopWidth,
      y: 0,
      z: halfLegHeight - halfApronHeight
    },
    dimensions: {
      x: apronWidth,
      y: tableTopLength - twoLegWidthAndMargin,
      z: apronHeight
    },
    textureRotation: rotation,
  }, {
    name: 'Apron 4',
    position: {
      x: tableTopWidth - legMargin - apronCenterMargin - halfTopWidth,
      y: 0,
      z: halfLegHeight - halfApronHeight
    },
    dimensions: { x: apronWidth, y: tableTopLength - twoLegWidthAndMargin, z: apronHeight },
    textureRotation: rotation,
  }];

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
      <br/>
      <Row>
        <Col lg={8}>
          <Table2 tableState={tableState} aprons={aprons}/>
        </Col>
        <Col lg={4}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Top</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Label>
                    Thickness: {tableTopHeigth}
                  </Form.Label>
                  <Form.Range type="number" min="12" max="40" value={tableTopHeigth} onChange={(e) => setTableTopHeigth(Number(e.target.value))} />

                  <Form.Label>
                    Width: {tableTopWidth}
                  </Form.Label>
                  <Form.Range type="number" min="400" max="1200" value={tableTopWidth} onChange={(e) => setTableTopWidth(Number(e.target.value))} />

                  <Form.Label>
                    Length: {tableTopLength}
                  </Form.Label>
                  <Form.Range type="number" min="600" max="3600" value={tableTopLength} onChange={(e) => setTableTopLength(Number(e.target.value))} />
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
                  <Form.Range type="number" min="65" max="140" value={legWidth} onChange={(e) => setLegSize(Number(e.target.value))} />
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
                  <Form.Range type="number" min="3" max={legWidth - apronWidth - 3} value={apronMargin} onChange={(e) => setApronMargin(Number(e.target.value))} />

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
              onClick={(e) => handleClick(`TableTop_${tableTopLength}_${tableTopWidth}_${tableTopHeigth}`, tableTopCix)}>
              TableTop.cix
            </Button></td>
            <td>1</td>
            <td>{(tableTopLength + (2 * tyovara))} * {(tableTopWidth + (2 * tyovara))} * {tableTopHeigth}</td>
          </tr>
          <tr>
            <td>2.</td>
            <td><Button
              size={"sm"}
              variant="outline-primary"
              onClick={(e) => handleClick(`Leg_${legHeight}_${legWidth}_${legWidth}`, legCix)}>
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
              onClick={(e) => handleClick(`Apron 1_${tableTopLength - (twoLegWidthAndMargin)}_${apronHeight}_${apronWidth}`, apron1Cix)}>
              Apron 1.cix
            </Button></td>
            <td>2</td>
            <td>{tableTopLength - (twoLegWidthAndMargin) + ((apronSlotCutDepth - 2) * 2) + (2 * tyovara)} * {apronHeight + (tyovara * 2)} * {apronWidth}</td>

          </tr>
          <tr>
            <td>4.</td>
            <td><Button
              size={"sm"}
              variant="outline-primary"
              onClick={(e) => handleClick(`Apron 2_${tableTopWidth - (twoLegWidthAndMargin)}_${apronHeight}_${apronWidth}`, apron2Cix)}>
              Apron 2.cix
            </Button></td>
            <td>2</td>
            <td>{tableTopWidth - (twoLegWidthAndMargin) + ((apronSlotCutDepth - 2) * 2) + (2 * tyovara)} * {apronHeight + (tyovara * 2)} * {apronWidth}</td>

          </tr>


        </tbody>
      </Table>

    </div>
  )
}
