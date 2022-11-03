

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from "three";

export default function TableTop({
    x,
    y,
    z,
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

