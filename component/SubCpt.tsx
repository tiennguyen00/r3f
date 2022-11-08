import React, { Ref, Suspense, useRef, useState } from "react"
import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
  useVideoTexture,
  useHelper,
  ContactShadows,
  BakeShadows,
  softShadows,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Lightformer,
  Stage,
  useGLTF,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei"
import {
  BoxGeometry,
  Material,
  Mesh,
  SphereGeometry,
  DirectionalLightHelper,
} from "three"

import { useControls, button, folder } from "leva"
import { Perf } from "r3f-perf"

import RobotDog from "./models/RobotDog"
import ModelFox from "./models/ModelFox"

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// })

const StageCpt = () => {
  const cubeRef = useRef<Mesh<BoxGeometry, Material | Material[]> | null>(null)

  return (
    <Stage contactShadow={{ opacity: 0.2, blur: 3 }}>
      <mesh position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cubeRef} position-y={1} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </Stage>
  )
}

const SubCpt = () => {
  const cubeRef = useRef<Mesh<BoxGeometry, Material | Material[]> | null>(null)
  const sphereRef = useRef<Mesh<SphereGeometry, Material | Material[]> | null>(
    null
  )
  const directionalLight = useRef(null)
  useHelper(directionalLight, DirectionalLightHelper, 2)

  const { position, visible, scale1 } = useControls("sphere", {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    visible: true,
    selected: { options: ["a", "b", "v"] },
    runFunction: button(() => console.log("hello")),
    nestedFolder: folder({ scale1: 1 }),
  })
  const { radius, amount, intensity, position2 } = useControls("randomLight", {
    position2: {
      value: { x: -1, z: 1 },
      step: 0.25,
      joystick: "invertY",
    },
    radius: 1,
    amount: 8,
    intensity: 1,
  })

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#4B2709",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  })

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 70, min: 10, max: 1000 },
    })

  const videoTexture = useVideoTexture("./comic-compress.mp4", "_")
  const [torusGeometryState, setTorusGeometryState] = useState()
  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.6} color={0xffffff} />

      {/* <Suspense
        fallback={
          <mesh position-y={0.5} scale={[2, 2, 3]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
          </mesh>
        }
      >
        <RobotDog />
        <ModelFox />
      </Suspense> */}

      <axesHelper args={[20]} />

      <Center>
        <Text3D
          font="./fonts/CentComic.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello World <meshNormalMaterial />
        </Text3D>
      </Center>

      {/* <torusGeometry
        args={[1, 0.6, 16, 32]}
        ref={setTorusGeometryState as any}
      />
      {[...Array(100)].map((value, index) => (
        <mesh
          geometry={torusGeometryState}
          key={index}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <meshNormalMaterial />
        </mesh>
      ))} */}

      {/* <Environment
        background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <Lightformer position-z={1} scale={0.5} color="red" intensity={10} />
      </Environment> */}

      {/* <AccumulativeShadows
        temporal
        frames={Infinity}
        scale={15}
        position={[position2.x, -0.99, position2.z]}
        opacity={0.4}
        color="#316d39" // Color of shadow
        blend={100}
      >
        <RandomizedLight
          amount={amount}
          radius={radius}
          ambient={0.5}
          intensity={intensity}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      /> */}
      {/* <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        ref={directionalLight}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}

      {/* <Model /> */}

      <Perf position="top-left" />

      <Float speed={5} position-x={3} floatIntensity={4} rotationIntensity={2}>
        <Text
          font="./fonts/CentComic.woff"
          fontSize={0.7}
          position-y={2.5}
          maxWidth={1}
          textAlign="center"
        >
          Nguyễn Hữu Tiến
          <meshBasicMaterial />
        </Text>
      </Float>
      {/* /* it will be used for center the element in 3D space */}

      {/* <PivotControls
        anchor={[0, 1, 0]}
        scale={100}
        depthTest={false}
        fixed={true}
      >
        <mesh
          castShadow
          ref={sphereRef}
          position={[position.x, position.y, 0]}
          visible={visible}
        >
          <sphereGeometry />
          <meshStandardMaterial envMapIntensity={envMapIntensity} />
        </mesh>
      </PivotControls>
      <mesh castShadow ref={cubeRef} position-x={-2} position-y={1}>
        <boxGeometry args={[2, 2]} />
        <meshStandardMaterial
          map={videoTexture}
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* <TransformControls object={cubeRef as any} mode="rotate" /> */}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={20}>
        <planeGeometry />
        <meshStandardMaterial
          color={"#ffff00"}
          envMapIntensity={envMapIntensity}
        />

        <MeshReflectorMaterial
          mirror={0.75}
          resolution={1024}
          blur={[1000, 1000]}
          mixBlur={1}
        />
      </mesh>
    </>
  )
}

export default SubCpt
