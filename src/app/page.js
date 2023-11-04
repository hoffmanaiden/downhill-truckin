'use client'
import Image from 'next/image'
import styles from './page.module.css'

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stage, OrbitControls, PerspectiveCamera, KeyboardControls } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from 'ecctrl'

import { Model } from './Semi-truck-1'

export default function Home() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]

  function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  return (
    <Canvas>
      <Suspense>
        <Physics debug gravity={[0, -10, 0]} interpolation={false} colliders={false}>
          <Stage intensity={0.5} shadows="contact" environment="city">
            <PerspectiveCamera makeDefault position={[20, 20, -20]} zoom={0.5} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <KeyboardControls map={keyboardMap}>

              <RigidBody colliders={"hull"} restitution={1} args={[0.5]}>
                <Model />
              </RigidBody>

            </KeyboardControls>

            <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />

            <OrbitControls />
          </Stage>
        </Physics>
      </Suspense>
    </Canvas>
  )
}
