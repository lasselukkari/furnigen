
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
    pinWidth,
    pinHeight,
    pinLength,
    rotationX=0,
    rotationY=0,
    rotationZ=90,
    texture
}) {

    const foo = ApronCix({
        height,
        width,
        length,
       pinLength,
       pinHeight,
    })

    console.log(foo);


    return (
        <group
            rotation={[THREE.MathUtils.degToRad(rotationX),
            THREE.MathUtils.degToRad(rotationY),
            THREE.MathUtils.degToRad(rotationZ)]}
            position={[x, y, z]}
        >
            <Pin
                width={pinWidth}
                height={pinHeight}
                length={pinLength}
                x={0}
                y={((length / 2))}
                z={0}
                texture={texture}
            />
            <Body
                x={0}
                y={0}
                z={0}
                length={length}
                width={width}
                height={height}
                texture={texture}
            />
            <Pin
                x={0}
                y={(- (length / 2) - pinLength)}
                z={0}
                width={pinWidth}
                height={pinHeight}
                length={pinLength}
                texture={texture}
            />
        </group>
    )
}