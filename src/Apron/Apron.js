
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";

import Pin from './Pin';
import Body from './Body';

import ApronCix from './ApronCix';

export default function Apron({
    x,
    y,
    z,
    length,
    width,
    height,
    rotationX=0,
    rotationY=0,
    rotationZ=90,
    texture
}) {



    return (

  
  <mesh
            rotation={[THREE.MathUtils.degToRad(rotationX),
                THREE.MathUtils.degToRad(rotationY),
                THREE.MathUtils.degToRad(rotationZ)]}
                position={[x, y, z]}
        >
            <boxGeometry args={[width, height, length]} />
            <meshStandardMaterial transparent={true}
                map={texture}
                attach="material" />
        </mesh>
    )
}