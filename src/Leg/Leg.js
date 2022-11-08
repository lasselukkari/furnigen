

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

  return (
    <mesh
      shadows
      castShadow
      position={[x, y, z]}
      rotation={[THREE.MathUtils.degToRad(rotationX),
      THREE.MathUtils.degToRad(rotationY),
      THREE.MathUtils.degToRad(rotationZ)]}
    >
      <boxGeometry args={[width, height, length]} />
      <meshStandardMaterial transparent={true} map={texture} attach="material" />
    </mesh>
  )
}

