'use client'
import Image from 'next/image'
import styles from './page.module.css'

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stage, OrbitControls, PerspectiveCamera, KeyboardControls } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from 'ecctrl'

import { BrunoTruck } from './Bruno-truck'
import { BrunoTruckAxel } from './Bruno-truck-axel'
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

  function Wheel(props) {
    const [hover, setHover] = useState(false);
    const [spin, setSpin] = useState(false);
    const wheel1 = useRef();

    const rotate = () => {
      wheel1.current.applyTorqueImpulse({ x: 0, y: 0, z: 10000 }, true);
    }
    return (
      <RigidBody colliders={"hull"} restitution={1} args={[0.5]} position={[-12, 10, -12]} rotation={[Math.PI / 2, 0, 0]} ref={wheel1}>
        <mesh
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={rotate}
        >
          <cylinderGeometry args={[5, 5, 5, 32]} />
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </mesh>
      </RigidBody>
    )
  }


  return (
    <Canvas>
      <Suspense>
        <Physics debug gravity={[0, -50, 0]} interpolation={false} colliders={false}>
          <Stage intensity={0.5} shadows="contact" environment="city">
            <PerspectiveCamera makeDefault position={[20, 20, -20]} zoom={0.5} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            {/* <KeyboardControls map={keyboardMap}>
              <RigidBody colliders={"hull"} restitution={1} args={[0.5]}>
                <Model />
              </RigidBody>
            </KeyboardControls> */}

            <Wheel/>

            <BrunoTruckAxel scale={5}/>

             

            <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />

            <OrbitControls />
          </Stage>
        </Physics>
      </Suspense>
    </Canvas>
  )
}
