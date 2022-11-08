
import React from 'react'
import * as THREE from "three";


export default function MiddleSupport({
    x = 0,
    y = 0,
    z = 0,
    length,
    width,
    height,
    rotationX = 0,
    rotationY = 90,
    rotationZ = 90,
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