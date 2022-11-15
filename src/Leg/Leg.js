

import React from 'react'
import * as THREE from "three";

export default function Leg({
  x,
  y,
  z,
  length,
  width,
  height,
  texture,
  rotationX = 90,
  rotationY = 0,
  rotationZ = 0,
}) {

  const rotatedTexture = texture.clone();

  rotatedTexture.rotation = THREE.MathUtils.degToRad(90);

  rotatedTexture.repeat.set(0.07, 1);

  return (
    <mesh

      position={[x, y, z]}
      rotation={[THREE.MathUtils.degToRad(rotationX),
      THREE.MathUtils.degToRad(rotationY),
      THREE.MathUtils.degToRad(rotationZ)]}
    >
      <boxGeometry args={[width, height, length]} />
      <meshStandardMaterial attach="material-0" map={texture} />

      <meshStandardMaterial attach="material-1" map={rotatedTexture} />
      <meshStandardMaterial attach="material-2" map={texture} />
      <meshStandardMaterial attach="material-3" map={texture} />
      <meshStandardMaterial attach="material-4" map={texture} />
      <meshStandardMaterial attach="material-5" map={texture} />


    </mesh>
  )
}

