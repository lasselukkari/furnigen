
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";


import MiddleSupportCix from './MiddleSupportCix';

export default function MiddleSupport({
    x,
    y,
    z,
    length,
    width,
    height,
    pinWidth,
    pinHeight=10,
    pinOffset,
    pinLength,
    rotationX=0,
    rotationY=0,
    rotationZ=90,
    texture
}) {


    console.log("width",width);

    const foo = MiddleSupportCix({
        height,
        width,
        length,
       pinLength,
       pinHeight,
    })

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