"use client"

import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"
import Link from "next/link"
import React from "react"
import { ACESFilmicToneMapping } from "three"
import { SubCpt } from "../../component"

const Three = () => {
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
        shadows={false}
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
        onCreated={({ gl }) => {
          gl.setClearColor("transparent")
        }}
      >
        {/* <Main /> */}
        <SubCpt />
      </Canvas>
    </div>
  )
}

export default Three
