import { extend, Object3DNode, useFrame, useThree } from "@react-three/fiber"
import React, { useRef } from "react"
import { BoxGeometry, Group, Material, Mesh } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

extend({ OrbitControls })

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>
  }
}

const Main = () => {
  const cubeRef = useRef<Mesh<BoxGeometry, Material | Material[]> | null>(null)
  const { camera, gl } = useThree()

  const groupRef = useRef<Group | null>(null)
  useFrame((state /* same useThree */, delta) => {
    if (!!cubeRef.current) cubeRef.current.rotation.y += delta
    if (!!groupRef.current) groupRef.current.rotation.y += delta

    // const angle = state.clock.getElapsedTime()
    // state.camera.position.x = Math.sin(angle) * 4
    // state.camera.position.z = Math.cos(angle) * 4
    // state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.2} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* <CustomGeometry /> */}
    </>
  )
}

export default Main
