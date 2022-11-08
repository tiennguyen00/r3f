/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Théo Domon (https://sketchfab.com/Gloomeskk)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/3d-models/behemoth-from-horizon-zero-dawn-ff683e73f3ef4acb8546e643cd1d070a
title: Behemoth from Horizon Zero Dawn
*/

import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Models(props) {
  const { nodes, materials } = useGLTF("/models/robotDog/scene.gltf")
  const frontLeg = useRef(null)
  const frontLeg2 = useRef(null)

  const backLeg = useRef(null)
  const backLeg2 = useRef(null)

  useFrame((state, delta) => {
    const eslapedTime = state.clock.elapsedTime
    if (!!frontLeg.current) {
      frontLeg.current.rotation.x = Math.sin(eslapedTime * 5) / 4
      frontLeg2.current.rotation.x = Math.sin(eslapedTime * 6) / 4

      backLeg.current.rotation.x = Math.cos(eslapedTime * 4) / 4
      backLeg2.current.rotation.x = Math.cos(eslapedTime * 6) / 4
    }
  })

  return (
    <group {...props} dispose={null} position-y={4} rotation-y={Math.PI}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* FRONT LEG */}
        <group ref={frontLeg} position={[0, -0.47, 0]}>
          <mesh
            geometry={nodes.Cylinder012_0.geometry}
            material={materials.FRONT_LEG}
          />
          <mesh
            geometry={nodes.Cylinder012_0_1.geometry}
            material={materials.FRONT_LEG}
          />
        </group>
        <mesh geometry={nodes.Cylinder_0.geometry} material={materials.BODY} />
        <mesh
          geometry={nodes.Cylinder_0_1.geometry}
          material={materials.BODY}
        />
        <mesh
          geometry={nodes.Cylinder_0_2.geometry}
          material={materials.BODY}
        />
        <mesh
          geometry={nodes.Cylinder_0_3.geometry}
          material={materials.BODY}
        />
        <mesh
          geometry={nodes.Cylinder_0_4.geometry}
          material={materials.BODY}
        />
        <mesh
          geometry={nodes.Cylinder_0_5.geometry}
          material={materials.BODY}
        />
        <group position={[0, -2.03, 0]} rotation={[0, 0, -Math.PI]}>
          <mesh
            geometry={nodes.Cylinder001_0.geometry}
            material={materials.DRUM}
          />
        </group>
        <mesh
          geometry={nodes.Cylinder004_0.geometry}
          material={materials.GRAVITY}
        />
        <mesh
          geometry={nodes.Cube_0.geometry}
          material={materials.material_8}
        />
        <mesh
          geometry={nodes.Cube_0_1.geometry}
          material={materials.material_8}
        />
        <mesh
          geometry={nodes.Cube_0_2.geometry}
          material={materials.material_8}
        />
        <mesh
          geometry={nodes.Cube_0_3.geometry}
          material={materials.material_8}
        />
        <mesh
          geometry={nodes.Cube_0_4.geometry}
          material={materials.material_8}
        />
        <mesh
          geometry={nodes.Cylinder010_0.geometry}
          material={materials.FREEZE_CANISTER}
        />
        <mesh
          geometry={nodes.Cylinder011_0.geometry}
          material={materials.BATTERY}
        />
        <mesh
          geometry={nodes.Cylinder011_1.geometry}
          material={materials["Material.002"]}
        />
        {/* REAR LEG */}
        <group ref={backLeg} position={[0, -4, 0]}>
          <mesh
            geometry={nodes.Cylinder012_0.geometry}
            material={materials.REAR_LEG}
          />
          <mesh
            geometry={nodes.Cylinder012_0_1.geometry}
            material={materials.REAR_LEG}
          />
        </group>
        <group position={[0.69, 2.7, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder009_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder009_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group ref={frontLeg2} position={[0, -0.47, 0]}>
          <mesh
            geometry={nodes.Cylinder033_0.geometry}
            material={materials.FRONT_LEG}
          />
          <mesh
            geometry={nodes.Cylinder033_0_1.geometry}
            material={materials.FRONT_LEG}
          />
        </group>
        <group ref={backLeg2} position={[0, -4, 0]}>
          <mesh
            geometry={nodes.Cylinder033_0.geometry}
            material={materials.REAR_LEG}
          />
          <mesh
            geometry={nodes.Cylinder033_0_1.geometry}
            material={materials.REAR_LEG}
          />
        </group>
        <mesh
          geometry={nodes.Cylinder035_0.geometry}
          material={materials.GRAVITY}
        />
        <group position={[-0.13, -0.56, 0.76]}>
          <mesh
            geometry={nodes.Cylinder013_0.geometry}
            material={materials.GRAVITY}
          />
        </group>
        <group position={[0.13, -0.56, 0.76]}>
          <mesh
            geometry={nodes.Cylinder036_0.geometry}
            material={materials.GRAVITY}
          />
        </group>
        <group position={[-0.13, -1.31, 1.35]}>
          <mesh
            geometry={nodes.Cylinder037_0.geometry}
            material={materials.GRAVITY}
          />
        </group>
        <group position={[0.12, -1.31, 1.35]}>
          <mesh
            geometry={nodes.Cylinder038_0.geometry}
            material={materials.GRAVITY}
          />
        </group>
        <mesh
          geometry={nodes.Cylinder002_0.geometry}
          material={materials.FREEZE_CANISTER}
        />
        <group position={[0.69, 2.8, -0.86]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder003_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder003_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[0.61, 2.8, -0.95]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder005_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder005_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[0.61, 2.7, -0.79]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder006_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder006_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-0.46, 2.7, -0.79]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder026_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder026_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-0.46, 2.8, -0.95]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder027_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder027_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-0.54, 2.8, -0.86]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder028_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder028_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-0.54, 2.7, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cylinder039_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Cylinder039_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/robotDog/scene.gltf")