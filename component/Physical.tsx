import { useBox } from "@react-three/cannon"
import { OrbitControls } from "@react-three/drei"
import React from "react"

const Physical = () => {
  const [ref, api] = useBox(() => ({ mass: 1 }))
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />
      <OrbitControls makeDefault />
      <mesh position={[-1, 1, 0]} scale={0.5} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={ref as any} position={[1, 1, 0]} scale={0.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} scale={5} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}

export default Physical
