import { useAnimations, useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import React, { useEffect } from "react"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const ModelFox = () => {
  const gltfLoader = useLoader(
    GLTFLoader,
    "/models/fox/Fox.gltf",
    (loader: any) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath("/draco/gltf/")
      loader.setDRACOLoader(dracoLoader)
    }
  )
  //   const gltfLoader = useGLTF("/models/fox/Fox.gltf")
  const animations = useAnimations(gltfLoader.animations, gltfLoader.scene)
  const { animationName } = useControls({
    animationName: { options: animations.names },
  })

  useEffect(() => {
    const action = animations.actions[animationName]
    !!action && action.fadeIn(0.5).reset().play()
    return () => {
      action?.fadeOut(0.5)
    }
  }, [animationName, animations.actions])
  return (
    <primitive scale={0.06} position={[5, 2, 0]} object={gltfLoader.scene} />
  )
}

export default ModelFox
