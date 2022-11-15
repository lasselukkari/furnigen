

import React from 'react'
import * as THREE from "three";

export default function Attachment({
    x,
    y,
    z,
    texture,
}) {

    const rotatedTexture = texture.clone();
    rotatedTexture.flipY = false;

    return (
        <mesh
            shadows
            castShadow
            position={[x, z, y]}
        >
            <boxGeometry args={[49, 19, 49]} />
            <meshStandardMaterial transparent={true}
                map={rotatedTexture}
                
                attach="material" />
        </mesh>
    )
}