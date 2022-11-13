

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";

export default function Attachment({
    x,
    y,
    z,
    texture,
}) {

    return (
        <mesh
            shadows
            castShadow
            position={[x, z, y]}
        >
            <boxGeometry args={[49, 19, 49]} />
            <meshStandardMaterial transparent={true}
                map={texture}
                attach="material" />
        </mesh>
    )
}