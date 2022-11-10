

import React, { useState } from 'react'
import TopNavigation from './TopNavigation';
import TableView from './TableView';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GeometryHelper from './GeometryHelper';
import * as Icon from 'react-bootstrap-icons';

import JSZip from 'jszip';
import FileSaver from 'file-saver';


export default function TableGenerator() {

  const [tabletopHeigth, setTabletopHeigth] = useState(25);
  const [tabletopWidth, setTabletopWidth] = useState(800);
  const [tabletopLength, setTabletopLength] = useState(1200);
  const [legWidth, setLegSize] = useState(70);
  const [legLength, setLegLength] = useState(725);
  const [legMargin, setLegMargin] = useState(55);
  const [apronWidth, setApronWidth] = useState(80);
  const [apronHeight, setApronHeight] = useState(20);
  const [apronMargin, setApronMargin] = useState(10);
  const [autoRotate, setAutoRotate] = useState(false);

  const gh = new GeometryHelper({
    tabletopHeigth,
    tabletopWidth,
    tabletopLength,
    legWidth,
    legLength,
    legMargin,
    apronWidth,
    apronHeight,
    apronMargin,
  });

  const  downloadFiles = async (parts) => {

    const zip = new JSZip();
    parts.forEach(({name, cix}) => zip.file(`${name}.cix`, cix()));
    const content = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(content, 'download.zip');
  }


  return (
    <div>

      <TableView
        tabletop={gh.tabletop()}
        aprons={gh.aprons()}
        legs={gh.legs()}
        angleSupports={gh.angleSupports()}
        middleSupport={gh.middleSupport()}
        autoRotate={autoRotate}
      />
      <Accordion defaultActiveKey="0"
        style={{ width: '300px', position: 'absolute', right: '15px', top: '87px' }}>


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
                Height: {legLength}
              </Form.Label>
              <Form.Range type="number" min="500" max="1200" value={legLength} onChange={(e) => setLegLength(Number(e.target.value))} />
              <Form.Label>
                Margin: {legMargin}
              </Form.Label>
              <Form.Range type="number" min={3} max={gh.maxLegMargin} value={legMargin} onChange={(e) => setLegMargin(Number(e.target.value))} />
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Aprons</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Label>
                Height: {apronWidth}
              </Form.Label>
              <Form.Range type="number" min="65" max="140" value={apronWidth} onChange={(e) => setApronWidth(Number(e.target.value))} />
              <Form.Label>
                Width: {apronHeight}
              </Form.Label>
              <Form.Range type="number" min="16" max={gh.maxApronHeight} value={apronHeight} onChange={(e) => setApronHeight(Number(e.target.value))} />
              <Form.Label>
                Margin: {apronMargin}
              </Form.Label>
              <Form.Range type="number" min="3" max={gh.maxApronMargin} value={apronMargin} onChange={(e) => setApronMargin(Number(e.target.value))} />
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


      <Button
        variant="primary" style={{ width: 60, height: 60, marginTop: 15, left: 15,  position: "absolute", zIndex: 1000 }}
        onClick={() => downloadFiles(gh.cutList())}>
        <Icon.Download style={{ width: 35, height: 35 }} />
      </Button>


      <Button
        variant="primary" style={{ width: 60, height: 60, bottom: 15, left: 15,  position: "absolute", zIndex: 1000 }}
        onClick={() => setAutoRotate(!autoRotate)}>
          {autoRotate ? <Icon.PauseFill style={{ width: 35, height: 35 }} /> : <Icon.PlayFill style={{ width: 35, height: 35 }} />}
      </Button>





    </div>
  )
}
