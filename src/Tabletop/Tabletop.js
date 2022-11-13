

import React from 'react'
import * as THREE from "three";

export default function Tabletop({
    x=0,
    y=0,
    z=0,
    length,
    width,
    height,
    texture,
}) {
    return (
        <mesh
            shadows
            castShadow
            position={[x, z, y]}
        >
            <boxGeometry args={[width, height, length]} />
            <meshStandardMaterial transparent={true}
                map={texture}
                attach="material" />
        </mesh>
    )
}

