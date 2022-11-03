

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
  const halfTopWidth = tabletopWidth / 2;
  const halfTopLength = tabletopLength / 2;
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
  const apron1Length = tabletopLength - (twoLegWidthAndMargin) + (2 * (apronPinLength));
  const apron2Length = tabletopWidth - (twoLegWidthAndMargin) + (2 * (apronPinLength));



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
          <Table2 
          tabletopHeigth={tabletopHeigth}
          tabletopWidth={tabletopWidth}
          tabletopLength={tabletopLength}
          legWidth={legWidth}
          legHeight={legHeight}
          legMargin={legMargin}
          apronWidth={apronWidth}
          apronHeight={apronHeight}
          apronMargin={apronMargin}
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
              onClick={(e) => handleClick(`Leg_${legHeight}_${legWidth}_${legWidth}` )}>
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
            <td>{tabletopLength - (twoLegWidthAndMargin) + ((apronSlotCutDepth - 2) * 2) + (2 * tyovara)} * {apronHeight + (tyovara * 2)} * {apronWidth}</td>

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
            <td>{tabletopWidth - (twoLegWidthAndMargin) + ((apronSlotCutDepth - 2) * 2) + (2 * tyovara)} * {apronHeight + (tyovara * 2)} * {apronWidth}</td>

          </tr>


        </tbody>
      </Table>

    </div>
  )
}
