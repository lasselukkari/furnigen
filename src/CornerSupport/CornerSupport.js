import React from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";

const supportShape = (length, height) => {
    const shape = new THREE.Shape();
    const x = -length / 2;
    const y = -height / 2;

    shape.moveTo(x, y);
    shape.lineTo(x + height, y + height);
    shape.lineTo(x + length - height, y + height);
    shape.lineTo(x + length, y);
    shape.lineTo(x, y);
    return shape;
}


export default function AngleSupport({
    width, height, length, x, y, z, texture,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0
}) {
    const shape = supportShape(length, height);
    const extrusion = {
        steps: 1,
        depth: width,
        bevelEnabled: false,
    };

    const textureClone = texture.clone();

    textureClone.wrapS = textureClone.wrapT = THREE.RepeatWrapping;
    textureClone.repeat.set(0.004);
    textureClone.rotation = THREE.MathUtils.degToRad(90);

    return (

        <group
            position={[x, z, y]}
            rotation={
                [THREE.MathUtils.degToRad(rotationX),
                THREE.MathUtils.degToRad(rotationZ),
                THREE.MathUtils.degToRad(rotationY)
            ]

            }
        >
            <mesh
                position={[
                    (length / Math.sqrt(2) / 2) - (height / Math.sqrt(2) / 2),
                    0,
                    (length / Math.sqrt(2) / 2) - (height / Math.sqrt(2) / 2),
                ]}
                rotation={[
                    THREE.MathUtils.degToRad(90),
                    THREE.MathUtils.degToRad(0),
                    THREE.MathUtils.degToRad(135)
                ]}
            >
                <extrudeGeometry attach="geometry" args={[shape, extrusion]} />
                <meshStandardMaterial transparent={true} map={textureClone} attach="material" />
            </mesh>
        </group>
    );
}

