"use client"
import { OrbitControls, useFBX, useGLTF } from "@react-three/drei"
import {
  BallCollider,
  ConeCollider,
  ConvexHullCollider,
  CuboidCollider,
  Debug,
  RigidBody,
} from "@react-three/rapier"
import { useControls } from "leva"
import React, { Suspense, useRef } from "react"

const Physical = () => {
  const boxRef = useRef(null)

  const inu = useFBX("/models/INU/INU_Subrace_Bioz.fbx")

  const handleClickBox = (e: any) => {
    const mass = !!boxRef.current ? (boxRef.current as any)?.mass() : 1
    if (boxRef.current) {
      ;(boxRef.current as any)?.applyImpulse({ x: -1, y: 5 * mass, z: 0 })
      ;(boxRef.current as any)?.applyTorqueImpulse({
        x: 1,
        y: 0,
        z: 0,
      })
    }
  }
  const { posisitionCube } = useControls("cuber", {
    posisitionCube: {
      value: { x: 2, y: 2, z: 1 },
      step: 0.3,
    },
  })
  const positionArray = new Float32Array([
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,
  ])

  return (
    <>
      <Debug />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 1, 3]} intensity={1.5} castShadow />
      <OrbitControls makeDefault />
      <RigidBody
        ref={boxRef}
        position={[2, 2, 0]}
        gravityScale={1}
        restitution={0}
        friction={0.7}
        colliders={false}
      >
        <mesh castShadow onClick={handleClickBox}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
      </RigidBody>
      <RigidBody colliders="ball" gravityScale={0}>
        <mesh position={[0, 4, 2]} scale={0.25} castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
      <RigidBody>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        <BallCollider args={[0.8]} />
        <mesh position={[1, 1, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[1, 1, 0.5]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>
      <RigidBody colliders="trimesh" restitution={1.5} friction={0.8}>
        <mesh
          castShadow
          receiveShadow
          position={[0, 1, 2]}
          rotation-x={-Math.PI * 0.5}
        >
          <torusGeometry args={[0.5, 0.25, 16, 32]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh rotation-x={-Math.PI * 0.5} scale={30} receiveShadow>
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>
      <Suspense>
        <RigidBody colliders="hull" position={[4, 0, 0]}>
          <primitive object={inu} scale={0.02} />
        </RigidBody>
      </Suspense>
    </>
  )
}

export default Physical
