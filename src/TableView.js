

import React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Apron from './Apron/Apron';
import Attachment from './Attachment/Attachment';
import Tabletop from './Tabletop/Tabletop';
import Leg from './Leg/Leg';
import CornerSupport from './CornerSupport/CornerSupport';
import MiddleSupport from './MiddleSupport/MiddleSupport';
import * as THREE from "three";




export default function TableView({
  tabletop,
  aprons,
  legs,
  angleSupports,
  middleSupport,
  attachments,
  autoRotate,
  zoom,
}) {
  const texture = useLoader(THREE.TextureLoader, 'wood-saturated-oak-texture.jpeg')

  return (

    <Canvas

      shadows
      camera={{ fov: 15, near: 0.1, far: 1000, position: [3.5, 2, 5], zoom: zoom}} frameloop="demand" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left:0 }}>

      <group scale={0.001} >
        {aprons.map(({ x, y, z, length, width, height, rotationY }, index) => {
          return (
            <Apron
              key={index}
              x={x}
              y={y}
              z={z}
              rotationY={rotationY}
              length={length}
              width={width}
              height={height}
              texture={texture}
            />
          )
        })}

                {attachments.map(({ x, y, z, length, width, height, rotationY }, index) => {
          return (
            <Attachment
              key={index}
              x={x}
              y={y}
              z={z}
              texture={texture}
            />
          )
        })}

        {middleSupport.renderSupport && (
          <MiddleSupport
            y={middleSupport.y}
            length={middleSupport.length}
            width={middleSupport.width}
            height={middleSupport.height}
            texture={texture}
          />
        )}

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
              texture={texture}
            />
          )
        })}

        {angleSupports.map(({ x, y, z, length, width, height, rotationZ }, index) => {
          return (
            <CornerSupport
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
        })}

        <Tabletop
          z={tabletop.z}
          length={tabletop.length}
          width={tabletop.width}
          height={tabletop.height}
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
      <OrbitControls autoRotate={autoRotate} />
{/*       <primitive object={new THREE.AxesHelper(10)} /> */}
    </Canvas>
  )
}
