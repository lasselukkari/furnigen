
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";


// a function that return a mesh that represents a rounded retangle
function RoundedRectangle({ w:h, h:w,l, r, s, position, texture }) { // width, height, length, radius corner, smoothness  

    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
        steps: 1,
        depth: l,
        bevelEnabled: false,

    };

    console.log("position", position);

       return (
        <mesh position={position}>
          <extrudeGeometry attach="geometry" args={[shape, extrudeSettings]} />
          <meshStandardMaterial transparent={true} map={texture} attach="material" />
        </mesh>
      );




}


export default function Apron({ position, size, rotate, appronLength: pinLength=42, appronWidth: pinWidth=10, appronHeight: pinHeight=40 }) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const texture = useLoader(THREE.TextureLoader, 'wood-saturated-oak-texture.jpeg')
    return (
        <group rotation={[0, rotate ? Math.PI / 2 : 0, 0]}>
            <RoundedRectangle w={pinHeight/1000} h={pinWidth/1000} l={pinLength/1000} r={pinWidth/1000/2} s={1} position={[(position.x) / 1000 , (position.z) / 1000, (position.y+ (size.x/2)) / 1000]} texture={texture} />
            <mesh
                shadows
                castShadow

                position={[position.x / 1000, position.z / 1000, position.y / 1000]}
                ref={ref}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}>
                <boxGeometry args={[size.z / 1000, size.y / 1000, size.x / 1000,]} />
                <meshStandardMaterial transparent={true} opacity={hovered ? 0.5 : 1} map={texture} attach="material" />
            </mesh>
            <RoundedRectangle w={pinHeight/1000} h={pinWidth/1000} l={pinLength/1000} r={pinWidth/1000/2} s={1} position={[(position.x) / 1000 , (position.z) / 1000, (position.y- (size.x/2) - pinLength) / 1000]}  texture={texture} />
        </group>
    )
}