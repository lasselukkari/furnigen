

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import * as THREE from "three";

function Box({ position, size, textureRotation }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const texture = useLoader(THREE.TextureLoader, 'wood-saturated-oak-texture.jpeg')

  if (clicked) {

  }

  return (
    <mesh
      shadows
      castShadow
      position={position}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={size} />
      <meshStandardMaterial map={texture} attach="material" rotation={textureRotation} />
    </mesh>
  )
}

export default function Table({ tableState }) {

  return (
    <Canvas shadows camera={{ fov: 30, near: 0.1, far: 1000, position: [3.5, 2, 5] }} frameloop="demand" style={{ width: '100%', height: '100%' }}>
      <primitive object={new THREE.AxesHelper(10)} />

      <spotLight position={[5, 5, 5]} angle={0.7} penumbra={1} castShadow />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />

      {tableState.map(({ position, dimensions, textureRotation }, key) => {
        const factor = 1000;
        return <Box key={key}
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
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        args={[1000, 1000]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </Canvas>
  )
}
