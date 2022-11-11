"use client"
import {
  ContactShadows,
  MeshReflectorMaterial,
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useMemo, useRef } from "react"
import THREE, { MeshStandardMaterial } from "three"
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

const LoadModalGLTF = ({
  modelName,
  animationsBone,
}: {
  modelName: string[]
  animationsBone: any
}) => {
  const array = modelName.map((i) => `models/INU/${i}.gltf`)
  const [ao, gangtay, giay, head, phukien, quan] = useGLTF(array)
  // console.log(ao, gangtay, giay, head, phukien, quan)
  console.log("a", animationsBone)

  useMemo(() => {
    ao.scene.traverse((node: any) => {
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

  const group = useRef(null)

  const animationsA = useAnimations(animationsBone, group)
  const animationsB = useAnimations(animationsBone, gangtay.scene)
  const animationsC = useAnimations(animationsBone, giay.scene)
  const animationsD = useAnimations(animationsBone, head.scene)
  const animationsE = useAnimations(animationsBone, phukien.scene)
  const animationsF = useAnimations(animationsBone, quan.scene)

  useEffect(() => {
    const name = "animation_0"
    const animations = [
      animationsA,
      animationsB,
      animationsC,
      animationsD,
      animationsE,
      animationsF,
    ]
    if (animations.length > 5) {
      animations.forEach((child) => {
        child.actions[name]?.fadeIn(0.5).play()
      })
    }

    return () => {
      animations.forEach((child) => {
        child.actions[name]?.fadeOut(0.5).reset()
      })
    }
  }, [])

  return (
    <group ref={group}>
      <primitive ref={animationsA.ref} object={ao.scene} scale={0.01} />
      <primitive ref={animationsB.ref} object={gangtay.scene} scale={0.01} />
      <primitive ref={animationsC.ref} object={giay.scene} scale={0.01} />
      <primitive ref={animationsD.ref} object={head.scene} scale={0.01} />
      <primitive ref={animationsE.ref} object={phukien.scene} scale={0.01} />
      <primitive ref={animationsF.ref} object={quan.scene} scale={0.01} />
    </group>
  )
}

export default function TestLoadModel() {
  const inuRef = useRef(null)
  const BoneAnim = useGLTF("/models/INU/Bone.gltf")
  console.log(BoneAnim)

  return (
    <>
      <Perf position="top-left" />
      <ambientLight color={0xffffff} intensity={0.8} />
      <directionalLight castShadow position={[1, 2, 2]} intensity={1.5} />

      <axesHelper args={[20]} />
      <OrbitControls makeDefault />

      <group ref={inuRef}>
        <LoadModalGLTF
          animationsBone={BoneAnim.animations}
          modelName={["Accessory", "Cloth", "Hand", "Pant", "Shoes", "Head"]}
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
