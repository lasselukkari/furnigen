

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Plane, OrbitControls } from '@react-three/drei'
import Apron from './Apron/Apron';
import Tabletop from './Tabletop/Tabletop';
import Leg from './Leg/Leg';
import AngleSupport from './AngleSupport/AngleSupport';
import MiddleSupport from './MiddleSupport/MiddleSupport';
import * as THREE from "three";




export default function Table({
  tabletopHeigth,
  tabletopWidth,
  tabletopLength,
  legWidth,
  legHeight,
  legMargin,
  apronHeight,
  apronWidth,
  apronMargin
}) {
  const texture = useLoader(THREE.TextureLoader, 'wood-saturated-oak-texture.jpeg')

  const halfTopWidth = tabletopWidth / 2;
  const halfTopLength = tabletopLength / 2;
  const halfApronWidth = apronWidth / 2;
  const halfApronHeight = apronHeight / 2;
  const halfLegWidth = legWidth / 2;
  const twoLegWidthAndMargin = (legMargin + legWidth) * 2
  const halfLegHeight = legHeight / 2;
  const legCenterMargin = legMargin + halfLegWidth;
  const apronCenterMargin = apronMargin + halfApronWidth;

  const apronSlotCutWidth = apronWidth <= 16 ? 8 : 10;

  const apronSlotCutMaxHeight = 45;
  const apronSlotCutDistance = apronCenterMargin;
  const calculatedSlotCutDepth = legWidth - Math.floor(apronSlotCutDistance + (apronSlotCutWidth / 2));
  const apronSlotCutDepth = calculatedSlotCutDepth > apronSlotCutMaxHeight ? apronSlotCutMaxHeight : calculatedSlotCutDepth;
  const apronPinLength = apronSlotCutDepth - 1;
  const apronPinWidth = apronHeight - 20;

  const supportWidth = 25;
  const supportHeight = apronHeight - 5;
  const supportLength = ( (legWidth - apronMargin - apronWidth)*Math.sqrt(2) * 2) + 2*supportWidth + 5;
  const middleSupport = tabletopLength > 1600;

  const middleSupportLength = tabletopWidth - 2*legMargin-2*apronMargin -2*apronWidth;
  const middleSupportWidth =  apronHeight - 10;
  const middleSupportHeight = 30;

  const aprons = [
    {
      name: 'Apron 1',
      x: 0,
      y: halfLegHeight - halfApronHeight,
      z: legMargin + apronCenterMargin - halfTopLength,
      rotationY: 90,
      length: tabletopWidth - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
    },
    {
      name: 'Apron 2',
      x: 0,
      y: halfLegHeight - halfApronHeight,
      z: halfTopLength - apronCenterMargin - legMargin,
      rotationY: 90,
      length: tabletopWidth - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
    },
    {
      name: 'Apron 3',
      x: legMargin + apronCenterMargin - halfTopWidth,
      y: halfLegHeight - halfApronHeight,
      z: 0,
      length: tabletopLength - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
    },
    {
      name: 'Apron 4',
      x: halfTopWidth - apronCenterMargin - legMargin,
      y: halfLegHeight - halfApronHeight,
      z: 0,
      length: tabletopLength - twoLegWidthAndMargin,
      width: apronHeight,
      height: apronWidth,
    }
  ]

  const legs = [
    {
      name: 'Leg 1',
      x: legCenterMargin - halfTopWidth,
      y: 0,
      z: legCenterMargin - halfTopLength,
      length: legHeight,
      width: legWidth,
      height: legWidth,
    },
    {
      name: 'Leg 2',
      x: halfTopWidth - legCenterMargin,
      y: 0,
      z: legCenterMargin - halfTopLength,
      length: legHeight,
      width: legWidth,
      height: legWidth,
    },
    {
      name: 'Leg 3',
      x: legCenterMargin - halfTopWidth,
      y: 0,
      z: halfTopLength - legCenterMargin,
      length: legHeight,
      width: legWidth,
      height: legWidth,
    },
    {
      name: 'Leg 4',
      x: halfTopWidth - legCenterMargin,
      y: 0,
      z: halfTopLength - legCenterMargin,
      length: legHeight,
      width: legWidth,
      height: legWidth,
    }
  ]



  const angleSupports = [
    {
      x:-halfTopWidth + legMargin + apronMargin + apronWidth,
      y:-halfTopLength+ legMargin + apronMargin + apronWidth,
      z:legHeight/2, 
      length:supportLength, 
      width:supportHeight, 
      height:supportWidth,
      rotationZ:0 
    },
    {
      x:halfTopWidth - legMargin - apronMargin - apronWidth,
      y:-halfTopLength+ legMargin + apronMargin + apronWidth,
      z:legHeight/2,
      length:supportLength,
      width:supportHeight,
      height:supportWidth,
      rotationZ:270
    },
    {
      x:-halfTopWidth + legMargin + apronMargin + apronWidth,
      y:halfTopLength - legMargin - apronMargin - apronWidth,
      z:legHeight/2,
      length:supportLength,
      width:supportHeight,
      height:supportWidth,
      rotationZ:90
    },
    {
      x:halfTopWidth - legMargin - apronMargin - apronWidth,
      y:halfTopLength - legMargin - apronMargin - apronWidth,
      z:legHeight/2,
      length:supportLength,
      width:supportHeight,
      height:supportWidth,
      rotationZ:180
    }
  ]

  return (

    <Canvas

      shadows
      camera={{ fov: 15, near: 0.1, far: 1000, position: [3.5, 2, 5] }} frameloop="demand" style={{ width: '100%', height: '600px' }}
    >
      <group 
      scale={0.001}
      >


      {aprons.map(({ x, y, z, length, width, height, rotationX, rotationY, rotationZ }, index) => {
          return (
            <Apron
              key={index}
              x={x}
              y={y}
              z={z}
              rotationX={rotationX}
              rotationY={rotationY}
              rotationZ={rotationZ}
              length={length}
              width={width}
              height={height}
              pinLength={apronPinLength}
              pinWidth={apronPinWidth}
              pinHeight={10}
              pinMargin={5}
              texture={texture}
            />
          )
        })}

        {
          // conditionally render middle support
          middleSupport && (
          <MiddleSupport
              x={0}
              y={legHeight/2- middleSupportWidth/2}
              z={0}
              rotationX={0}
              rotationY={90}
              rotationZ={90}
              length={middleSupportLength}
              width={middleSupportWidth}
              height={middleSupportHeight}
              pinLength={apronPinLength}
              pinWidth={apronPinWidth}
              pinHeight={10}
              pinMargin={5}
              texture={texture}
          />
          
          )

        }

        {legs.map(({ x, y, z, length, width, height, rotationX, rotationY, rotationZ }, index) => {
          return (
            <Leg
              key={index}
              x={x}
              y={y}
              z={z}
              rotationX={rotationX}
              rotationY={rotationY}
              rotationZ={rotationZ}
              length={length}
              width={width}
              height={height}
              apronWidth={apronHeight}
              apronMargin={apronMargin}
              pinLength={apronPinLength}
              pinWidth={apronPinWidth}
              pinHeight={10}
              pinOffset={-5}
              texture={texture}
            />
          )
        })}

        {
          angleSupports.map(({ x, y, z, length, width, height, rotationX, rotationY, rotationZ }, index) => {
            return (
              <AngleSupport
              x={x}
              y={y}
              z={z}
              rotationZ={rotationZ}
              length={length}
              width={width}
              height={height}
              texture={texture}
              key={index}
              />
            )
          }

          )
        }


          <Tabletop
          x={0}
          y={0}
          z={legHeight / 2 + tabletopHeigth / 2}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          length={tabletopLength}
          width={tabletopWidth}
          height={tabletopHeigth}
          pinWidth={50}
          pinHeight={10}
          pinLength={30}
          texture={texture}
        />
 

      </group>
      <spotLight position={[5, 5, 5]} angle={0.7} penumbra={1} castShadow />
      <spotLight position={[-5, -5, -5]} angle={0.7} penumbra={1} castShadow />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <OrbitControls/>
      <primitive object={new THREE.AxesHelper(10)} />
    </Canvas>
  )
}
