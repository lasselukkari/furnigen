

import React, { useState } from 'react'
import TopNavigation from './TopNavigation';
import Bookshelf from './Bookshelf';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Handlebars from 'handlebars/dist/cjs/handlebars'
import raw from "raw.macro";



export default function TableGenerator() {

  const [bookshelfHeight, setBookshelfHeight] = useState(1800);
  const [bookshelfLength, setBookshelfLength] = useState(1200);
  const [bookshelfWidth, setBookshelfWidth] = useState(400);
  const [materialHeight, setMaterialHeight] = useState(120);


  const bookshelfState = [{
    name: 'Left Side',
    position: { x:  (materialHeight / 2) - (bookshelfLength/2) , y: 0 , z:  0},
    dimensions: { x: materialHeight, y: bookshelfWidth, z: bookshelfHeight - materialHeight },
  },
  {
    name: 'Right Side',
    position: { x: (bookshelfLength  / 2) - (materialHeight / 2), y: 0,z: 0},
    dimensions: { x: materialHeight, y: bookshelfWidth,  z: bookshelfHeight - materialHeight },
  },
  {
    name: 'Top',
    position: { x: 0, y: 0, z: (bookshelfHeight / 2)  },
    dimensions: { x: bookshelfLength, y: bookshelfWidth, z: materialHeight },
  },
  {
    name: 'Shelf 1',
    position: { x: 0  , y: 0, z: 0 },
    dimensions: { x: bookshelfLength - (2*materialHeight), y: bookshelfWidth, z: materialHeight },
  }

];

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

      <h1>Table Designer</h1>
      <Row>
        <Col lg={8}>
          <Bookshelf bookshelfState={bookshelfState} />
        </Col>
        <Col lg={4}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Top</Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Legs</Accordion.Header>
              <Accordion.Body>
    
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Apron</Accordion.Header>
              <Accordion.Body>


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


        </tbody>
      </Table>

    </div>
  )
}
