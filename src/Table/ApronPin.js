import React from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";

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

export default function Pin({ width, height, length, x, y, z, texture }) { 
    const shape = roundedRectangle(width, height);
    const extrusion = {
        steps: 1,
        depth: length,
        bevelEnabled: false,
    };

    return (
        <mesh position={[x,z,y]}>
            <extrudeGeometry attach="geometry" args={[shape, extrusion]} />
            <meshStandardMaterial transparent={true} map={texture} attach="material" />
        </mesh>
    );
}

