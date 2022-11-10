"use client"
import {
  ContactShadows,
  MeshReflectorMaterial,
  OrbitControls,
  useFBX,
  useGLTF,
} from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useMemo, useRef } from "react"
import { MeshStandardMaterial } from "three"
import { TGALoader } from "three/examples/jsm/loaders/TGALoader.js"
import { useControls } from "leva"
import { Perf } from "r3f-perf"

const recursive = (obj: any) => {
  obj.castShadow = true
  if (obj.children) {
    recursive(obj.children)
  }
}

// const LoadModal = ({
//   modelName,
//   fileTextures,
// }: {
//   modelName: string
//   fileTextures: string[]
// }) => {
//   const fbx = useFBX(`models/INU/${modelName}.fbx`)
//   if (modelName === "Hand") console.log(fbx)
//   const texture = useLoader(TGALoader, fileTextures)
//   const matAluMedium = new MeshStandardMaterial({
//     map: texture[0],
//     normalMap: texture[1],
//     metalnessMap: texture[2] || null,
//     emissiveMap: texture[3] || null,
//   })
//   fbx.castShadow = true
//   useEffect(() => {
//     fbx && recursive(fbx)
//   }, [fbx])

//   fbx.children.forEach((mesh, i) => {
//     //@ts-ignore
//     mesh.material = matAluMedium
//   })

//   return <primitive object={fbx} scale={0.01} />
// }

const LoadModalGLTF = ({ modelName }: { modelName: string[] }) => {
  const array = modelName.map((i) => `models/INU/${i}.gltf`)
  const [ao, gangtay, giay, head, phukien, quan] = useGLTF(array)

  useMemo(() => {
    ao.scene.traverse((node: any) => {
      console.log(node)
      if (node.isMesh) node.castShadow = true
    })
    quan.scene.traverse((node: any) => {
      if (node.isMesh) node.castShadow = true
    })
    gangtay.scene.traverse((node: any) => {
      if (node.isMesh) node.castShadow = true
    })
    head.scene.traverse((node: any) => {
      if (node.isMesh) node.castShadow = true
    })
    phukien.scene.traverse((node: any) => {
      if (node.isMesh) node.castShadow = true
    })
    giay.scene.traverse((node: any) => {
      if (node.isMesh) node.castShadow = true
    })
  }, [
    ao.scene,
    gangtay.scene,
    giay.scene,
    head.scene,
    phukien.scene,
    quan.scene,
  ])

  return (
    <>
      <primitive object={ao.scene} scale={0.01} />
      <primitive object={gangtay.scene} scale={0.01} />
      <primitive object={giay.scene} scale={0.01} />
      <primitive object={head.scene} scale={0.01} />
      <primitive object={phukien.scene} scale={0.01} />
      <primitive object={quan.scene} scale={0.01} />
    </>
  )
}

export default function TestLoadModel() {
  const inuRef = useRef(null)
  const { head, hand, hat, pant, shoes, cloth } = useControls({
    head: { options: ["HEAD1", "HEAD2"] },
    hand: { options: ["HAND1", "HAND2"] },
    hat: { options: ["HAT1", "HAT2"] },
    pant: { options: ["PANT1", "PANT2"] },
    shoes: { options: ["SHOES1", "SHOES2"] },
    cloth: { options: ["CLOTH1", "CLOTH2"] },
  })

  useFrame((state, delta) => {
    inuRef.current && ((inuRef.current as any).rotation.y += Math.sin(delta))
  })

  return (
    <>
      <Perf position="top-left" />
      <ambientLight color={0xffffff} intensity={0.8} />
      <directionalLight castShadow position={[1, 2, 2]} intensity={1.5} />

      <axesHelper args={[20]} />
      <OrbitControls makeDefault />

      <group ref={inuRef}>
        <LoadModalGLTF
          modelName={["ao", "gangtay", "giay", "head", "phukien", "quan"]}
        />
      </group>

      <mesh
        rotation-x={-Math.PI * 0.5}
        position-y={0.0001}
        scale={5}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color={"greenyellow"} />
      </mesh>
    </>
  )
}
