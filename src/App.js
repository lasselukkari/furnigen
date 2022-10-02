

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import Table from './Table';


const tableTopWidth = 800;
const tableTopLength = 1200;
const tableTopHeigth = 25;
const legWidth = 70;
const legHeight = 725;
const legMargin = 55;
const apronHeight = 80;
const apronWidth = 20;
const apronMargin = 10;





//       <OrthographicCamera position={[0, 0, 5]} zoom={170} />
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

  const tableState = [{
    name: 'Table top',
    position: { x: tableTopWidth / 2, y: tableTopLength / 2, z: legHeight +  (tableTopHeigth / 2) },
    dimensions: { x: tableTopWidth, y: tableTopLength, z: tableTopHeigth },
  }, {
    name: 'Leg 1',
    position: { x: legMargin + legWidth / 2, y: legMargin + legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Leg 2',
    position: { x: tableTopWidth - legMargin - legWidth / 2, y: legMargin + legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Leg 3',
    position: { x: legMargin + legWidth / 2, y: tableTopLength - legMargin - legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
  }, {
    name: 'Leg 4',
    position: { x: tableTopWidth - legMargin - legWidth / 2, y: tableTopLength - legMargin - legWidth / 2, z: legHeight / 2 },
    dimensions: { x: legWidth, y: legWidth, z: legHeight },
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
    <div style={{width: '100%', height: 600}}>
      Top height <input type="number" min="12" max="100" value={tableTopHeigth} onChange={(e) => setTableTopHeigth(Number(e.target.value))} />
      Top width <input type="number" step={10} min={(legMargin + legWidth) * 2} max="1200" value={tableTopWidth} onChange={(e) => setTableTopWidth(Number(e.target.value))} />
      Top length <input type="number" step={10} min={(legMargin + legWidth) * 2} max="2400" value={tableTopLength} onChange={(e) => setTableTopLength(Number(e.target.value))} />
      Leg width<input type="number" min="40" max={120} value={legWidth} onChange={(e) => setLegSize(Number(e.target.value))} />
      Leg height<input type="number" min={apronHeight} max="1200" value={legHeight} onChange={(e) => setLegHeight(Number(e.target.value))} />
      Leg margin<input type="number" min="0" max="200" value={legMargin} onChange={(e) => setLegMargin(Number(e.target.value))} />
      Apron height<input type="number" min="0" max="200" value={apronHeight} onChange={(e) => setApronHeight(Number(e.target.value))} />
      Apron margin<input type="number" min="0" max="50" value={apronMargin} onChange={(e) => setApronMargin(Number(e.target.value))} />
    <Table tableState={tableState}/>
    </div>
  )
}
