import {
  Center,
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Text,
  useGLTF,
  useHelper,
} from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls } from "leva"
import React, { useEffect, useRef } from "react"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"

const LoadModel = () => {
  const gltf = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  )
  const { position, rotationX } = useControls("Pos Macbook", {
    position: {
      value: { x: 0.01, y: 1.54, z: -1.39 },
      step: 0.01,
      joystick: "invertY",
    },
    rotationX: -0.28,
  })
  return (
    <primitive object={gltf.scene} scale={1.4}>
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.17}
        position={[position.x, position.y, position.z]}
        rotation-x={rotationX}
      >
        <iframe src="https://bruno-simon.com/html/" />
      </Html>
    </primitive>
  )
}

const Portfolio = () => {
  const { speedF, floatIntensityF, rotationIntensityF } = useControls(
    "Float Macbook",
    {
      speedF: { value: 3, min: 2, max: 5, step: 0.5 },
      floatIntensityF: { value: 1, min: 0.5, max: 5, step: 0.5 },
      rotationIntensityF: { value: 0.4, min: 0, max: 2, step: 0.2 },
    }
  )
  const { positionRL, rotationXRL } = useControls("Rect Light", {
    positionRL: {
      value: { x: 0, y: 2.23, z: -1.93 },
      step: 0.01,
      joystick: "invertY",
    },
    rotationXRL: {
      value: { x: -0.26, z: 0 },
      step: 0.01,
      joystick: "invertY",
    },
  })
  const { scene } = useThree()
  const refRectLigth = useRef(null)
  // useHelper(refRectLigth, RectAreaLightHelper)

  // useEffect(() => {
  // !!refRectLigth &&
  //     scene.add(new RectAreaLightHelper((refRectLigth as any).current))

  // }, [refRectLigth])

  return (
    <>
      <Environment preset="city" />
      <color args={["#695b5b"]} attach="background" />
      {/* <OrbitControls /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]} // ? Horizontal
        azimuth={[-0.85, 0.75]} // ? Vertical
        config={{
          // ! Config is the same react-spring
          mass: 2,
          tension: 400,
        }}
        snap={{
          // ! Go back to the initial position if dropping
          mass: 4,
          tension: 400,
        }}
      >
        <Center>
          <Float
            speed={speedF}
            floatIntensity={floatIntensityF}
            rotationIntensity={rotationIntensityF}
          >
            <rectAreaLight
              ref={refRectLigth}
              width={4.2}
              height={2.2}
              intensity={65}
              color={0xff6900}
              rotation={[rotationXRL.x, Math.PI, rotationXRL.z]}
              position={[positionRL.x, positionRL.y, positionRL.z]}
            />
            <LoadModel />
            <Text
              font="/fonts/CentComic.woff"
              fontSize={1}
              maxWidth={2}
              textAlign={"center"}
            >
              ALEX MAHONE
            </Text>
          </Float>
        </Center>
      </PresentationControls>
      <ContactShadows position-y={-3} />
    </>
  )
}

export default Portfolio
