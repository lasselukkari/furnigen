

import React, { useState } from 'react'
import TopNavigation from './TopNavigation';
import Table from './Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Handlebars from 'handlebars/dist/cjs/handlebars'
import raw from "raw.macro";

const legTemplate = Handlebars.compile(raw('./legTemplate.hbs'));
const tableTopTemplate = Handlebars.compile(raw('./tableTopTemplate.hbs'));


export default function App() {

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

  const apronSlotCutDistance = apronMargin + (apronWidth / 2);
  const apronSlotCutWidth = 10;
  const apronSlotCutMaxHeight = 45;
  const foo = legWidth - Math.floor(apronSlotCutDistance + (apronSlotCutWidth / 2));
  const apronSlotCutDepth = foo > apronSlotCutMaxHeight ? apronSlotCutMaxHeight : foo;
  const apronsSlotCutX1 = 20;
  const apronsSlotCutX2 = apronHeight - (apronWidth / 2)
  const tools = {
    6: {
      TNM: "SPIRAALI-6",
      IOS: 0,
      WSP: 7000,
      DSP: 2000,
      BCF: 8, // tarkista
    },
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

  let tool;
  if (apronWidth < 16) {
    tool = tools[6]
  } else if (apronWidth < 20) { tool = tools[8] } else {
    tool = tools[10]
  }

  const legCix = legTemplate({ legWidth, legHeight, apronWidth, apronHeight, apronMargin, apronSlotCutDistance, apronSlotCutDepth, apronsSlotCutX1, apronsSlotCutX2, tool });
  const tableTopCix = tableTopTemplate({ tableTopHeigth, tableTopWidth, tableTopLength });

  const tableState = [{
    name: 'Table Top',
    position: { x: tableTopWidth / 2, y: tableTopLength / 2, z: legHeight + (tableTopHeigth / 2) },
    dimensions: { x: tableTopWidth, y: tableTopLength, z: tableTopHeigth },
    cix: tableTopCix,
  }, {
    name: 'Leg 1',
    position: { x: legMargin + legWidth / 2, y: legMargin + legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
    cix: legCix,
  }, {
    name: 'Leg 2',
    position: { x: tableTopWidth - legMargin - legWidth / 2, y: legMargin + legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
    cix: legCix,
  }, {
    name: 'Leg 3',
    position: { x: legMargin + legWidth / 2, y: tableTopLength - legMargin - legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
    cix: legCix,
  }, {
    name: 'Leg 4',
    position: { x: tableTopWidth - legMargin - legWidth / 2, y: tableTopLength - legMargin - legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
    cix: legCix,
  }, {
    name: 'Apron 1',
    position: { x: tableTopWidth / 2, y: legMargin + (apronWidth / 2) + apronMargin, z: legHeight - (apronHeight / 2) },
    dimensions: { x: tableTopWidth - (legMargin + legWidth) * 2, y: apronWidth, z: apronHeight },
    textureRotation: rotation,
  }, {
    name: 'Apron 2',
    position: { x: tableTopWidth / 2, y: tableTopLength - legMargin - (apronWidth / 2) - apronMargin, z: legHeight - (apronHeight / 2) },
    dimensions: { x: tableTopWidth - (legMargin + legWidth) * 2, y: apronWidth, z: apronHeight },
    textureRotation: rotation,
  }, {
    name: 'Apron 3',
    position: { x: legMargin + (apronWidth / 2) + apronMargin, y: tableTopLength / 2, z: legHeight - (apronHeight / 2) },
    dimensions: { x: apronWidth, y: tableTopLength - (legMargin + legWidth) * 2, z: apronHeight },
    textureRotation: rotation,
  }, {
    name: 'Apron 4',
    position: { x: tableTopWidth - legMargin - (apronWidth / 2) - apronMargin, y: tableTopLength / 2, z: legHeight - (apronHeight / 2) },
    dimensions: { x: apronWidth, y: tableTopLength - (legMargin + legWidth) * 2, z: apronHeight },
    textureRotation: rotation,
  }];

  
  return (
    <div>
      <TopNavigation />
      <Container>
        <h1>Table Designer</h1>
        <Row>
          <Col lg={8}>
            <Table tableState={tableState} />
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
                    <Form.Range type="number" min="12" max="100" value={tableTopHeigth} onChange={(e) => setTableTopHeigth(Number(e.target.value))} />

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
                    <Form.Range type="number" min="50" max="140" value={legWidth} onChange={(e) => setLegSize(Number(e.target.value))} />
                    <Form.Label>
                      Height: {legHeight}
                    </Form.Label>
                    <Form.Range type="number" min="500" max="1200" value={legHeight} onChange={(e) => setLegHeight(Number(e.target.value))} />
                    <Form.Label>
                      Margin: {legMargin}
                    </Form.Label>
                    <Form.Range type="number" min={legWidth / 2} max={tableTopWidth / 2 - legWidth / 2} value={legMargin} onChange={(e) => setLegMargin(Number(e.target.value))} />

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
                    <Form.Range type="number" min="50" max="140" value={apronHeight} onChange={(e) => setApronHeight(Number(e.target.value))} />
                    <Form.Label>
                      Width: {apronWidth}
                    </Form.Label>
                    <Form.Range type="number" min="16" max={legWidth - apronMargin} value={apronWidth} onChange={(e) => setApronWidth(Number(e.target.value))} />
                    <Form.Label>
                      Margin: {apronMargin}
                    </Form.Label>
                    <Form.Range type="number" min="3" max={legWidth - apronWidth} value={apronMargin} onChange={(e) => setApronMargin(Number(e.target.value))} />

                  </Form>

                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
