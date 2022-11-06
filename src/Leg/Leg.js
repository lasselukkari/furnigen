

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Brush, Subtraction, Addition, Difference, Intersection } from '@react-three/csg'
import Pin from '../Apron/Pin';
import * as THREE from "three";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import LegCix from './LegCix';


const roundedRectangle = (width, height) => {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = height / 2;

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

export default function Leg({
  x,
  y,
  z,
  length,
  width,
  height,
  texture,
  apronHeight = 25,
  apronWidth,
  apronMargin,
  pinLength,
  pinWidth,
  pinHeight,
  rotationX = 90,
  rotationY = 0,
  rotationZ = 0,
}) {
  const shape = roundedRectangle(pinWidth, pinHeight);
  const extrusion = {
    steps: 1,
    depth: pinLength + 1,
    bevelEnabled: false,
  };


  const foo = LegCix({
    height,
    width,
    length,
    apronHeight,
    apronWidth,
    apronMargin,
    pinLength
  })

  return (

    <mesh
      shadows
      castShadow
      position={[x, y, z]}
      rotation={[THREE.MathUtils.degToRad(rotationX),
      THREE.MathUtils.degToRad(rotationY),
      THREE.MathUtils.degToRad(rotationZ)]}

    >


          <boxGeometry args={[width, height, length]} />

      <meshStandardMaterial transparent={true}

        map={texture}
        attach="material" />
    </mesh>
  )
}

