"use client"
import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"
import { ACESFilmicToneMapping } from "three"

export default function Layout({ children }: { children: React.ReactNode }) {
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
        shadows={true}
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
        {children}
      </Canvas>
    </div>
  )
}
