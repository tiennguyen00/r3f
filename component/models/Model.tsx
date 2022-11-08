import { useGLTF, Clone } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = () => {
  const gltf = useLoader(
    GLTFLoader,
    "/models/robotDog/scene.gltf",
    (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath("/draco/gltf/")
      loader.setDRACOLoader(dracoLoader)
    }
  )
  console.log(gltf)
  return (
    <>
      <Clone object={gltf.scene} scale={0.4} />
      <Clone object={gltf.scene} scale={0.4} position-x={-2} />
      <Clone object={gltf.scene} scale={0.4} position-x={2} />
    </>
  )
}
useGLTF.preload("/models/robotDog/scene.gltf")
export default Model
