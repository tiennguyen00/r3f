"use client"
import { Physics } from "@react-three/cannon"
import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"
import { NextLayoutComponentType } from "next"
import { Perf } from "r3f-perf"
import { ACESFilmicToneMapping } from "three"
import { Physical, Portfolio, TestLoadModel } from "../component"

const Home: NextLayoutComponentType = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        overflow: "hidden",
      }}
    >
      <Leva collapsed />
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
        }}
        camera={{
          fov: 75,
          position: [4, 2, 2],
          near: 0.1,
          far: 100,
        }}
        // onCreated={({ gl }) => {
        //   gl.setClearColor("transparent")
        // }}
      >
        <Physics>
          <Perf position="top-left" />
          {/* <TestLoadModel /> */}
          {/* <Portfolio /> */}
          <Physical />
        </Physics>
      </Canvas>
    </div>
  )
}

export default Home
