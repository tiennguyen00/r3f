"use client"
import { MeshReflectorMaterial, OrbitControls, useFBX } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useMemo } from "react"
import { MeshStandardMaterial } from "three"
import { TGALoader } from "three/examples/jsm/loaders/TGALoader.js"
import { useControls } from "leva"
import { Perf } from "r3f-perf"

const ModelHead = () => {
  const fbx = useFBX("/models/INU/Head.fbx")

  return <primitive object={fbx} scale={0.01} />
}

const recursive = (obj: any) => {
  obj.castShadow = true
  if (obj.children.length > 0) {
    obj.children.forEach((child: any) => {
      recursive(child)
    })
  }
}

const LoadModal = ({
  modelName,
  fileTextures,
}: {
  modelName: string
  fileTextures: string[]
}) => {
  const fbx = useFBX(`models/INU/${modelName}.fbx`)
  if (modelName === "Hand") console.log(fbx)
  const texture = useLoader(TGALoader, fileTextures)
  const matAluMedium = new MeshStandardMaterial({
    map: texture[0],
    normalMap: texture[1],
    metalnessMap: texture[2] || null,
    emissiveMap: texture[3] || null,
  })
  fbx.castShadow = true
  useEffect(() => {
    fbx && recursive(fbx)
  }, [fbx])

  fbx.children.forEach((mesh, i) => {
    //@ts-ignore
    mesh.material = matAluMedium
  })

  return <primitive object={fbx} scale={0.01} />
}

export default function TestLoadModel() {
  const path = "/models/INU/Textures/"
  const { head, hand, hat, pant, shoes, cloth } = useControls({
    head: { options: ["HEAD1", "HEAD2"] },
    hand: { options: ["HAND1", "HAND2"] },
    hat: { options: ["HAT1", "HAT2"] },
    pant: { options: ["PANT1", "PANT2"] },
    shoes: { options: ["SHOES1", "SHOES2"] },
    cloth: { options: ["CLOTH1", "CLOTH2"] },
  })

  return (
    <>
      <Perf position="top-left" />
      <ambientLight color={0xffffff} intensity={0.2} />
      <directionalLight castShadow position={[1, 2, 4]} intensity={1.5} />

      <axesHelper args={[20]} />
      <OrbitControls makeDefault />
      <group>
        <Suspense fallback={null}>
          {/* Head */}
          <ModelHead />
          <LoadModal
            modelName="Hat"
            fileTextures={[
              `${path}Head_bo.tga`,
              `${path}Head_n.tga`,
              `${path}Head_mra.tga`,
            ]}
          />
          {/* <ModelBody /> */}
          <LoadModal
            modelName="Cloth"
            fileTextures={[
              `${path}Cloth_bo.tga`,
              `${path}Cloth_n.tga`,
              `${path}Cloth_mra.tga`,
              `${path}Cloth_e.tga`,
            ]}
          />
          {/* Hand */}
          <LoadModal
            modelName="Hand"
            fileTextures={[
              `${path}Hand_bo.tga`,
              `${path}Hand_n.tga`,
              `${path}Hand_mra.tga`,
            ]}
          />
          {/* Pant */}
          <LoadModal
            modelName="Pant"
            fileTextures={[
              `${path}Pant_bo.tga`,
              `${path}Pant_n.tga`,
              `${path}Pant_mra.tga`,
            ]}
          />
          {/* Shoes */}
          <LoadModal
            modelName="Shoes"
            fileTextures={[
              `${path}Shoes_bo.tga`,
              `${path}Shoes_n.tga`,
              `${path}Shoes_mra.tga`,
            ]}
          />
        </Suspense>
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
