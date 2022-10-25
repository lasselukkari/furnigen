

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Plane, OrbitControls } from '@react-three/drei'
import * as THREE from "three";



function Box({ position, size, textureRotation, cix, name }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const texture = useLoader(THREE.TextureLoader, 'wood-saturated-oak-texture.jpeg')


  return (
    <mesh
      shadows
      castShadow
      position={position}
      ref={ref}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={size} />
      <meshStandardMaterial       transparent={true} opacity={hovered ? 0.5 :1} map={texture} attach="material" rotation={textureRotation} />
    </mesh>
  )
}


export default function Bookself({ bookshelfState }) {

  return (


    <Canvas 

    shadows 
    camera={{ fov: 50, near: 0.1, far: 1000, position: [3.5, 2, 5] }} frameloop="demand" style={{ width: '100%', height: '400px' }}>
      <primitive object={new THREE.AxesHelper(10)} />

      <spotLight position={[5, 5, 5]} angle={0.7} penumbra={1} castShadow />
      <spotLight position={[-5, -5, -5]} angle={0.7} penumbra={1} castShadow />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />

      {bookshelfState.map(({ position, dimensions, textureRotation, name }, key) => {
        const factor = 1000;
        return <Box 
        key={key}
        name={name}
          position={[
            position.x / factor,
            position.z / factor,
            position.y / factor
          ]}
          size={[
            dimensions.x / factor,
            dimensions.z / factor,
            dimensions.y / factor,
          ]}
          textureRotation={textureRotation}
        />
      })}
      <OrbitControls />
    </Canvas>
  )
}
