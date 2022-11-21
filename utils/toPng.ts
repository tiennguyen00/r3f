import {
  applyStyle,
  checkCanvasDimensions,
  cloneNode,
  createImage,
  embedImages,
  getImageSize,
  nodeToDataURL,
} from "./others"
import { Options } from "./types"

const toSvg = async <T extends HTMLElement>(node: T, options: Options) => {
  const { width, height } = getImageSize(node, options)
  const clonedNode = (await cloneNode(node, options, true)) as HTMLElement
  console.log("clonedNode: ", clonedNode)
  await embedImages(clonedNode, options)
  applyStyle(clonedNode, options)
  const datauri = await nodeToDataURL(clonedNode, width, height)
  return datauri
}

const toCanvas = async <T extends HTMLElement>(
  node: T,
  options: Options = {}
): Promise<HTMLCanvasElement> => {
  const { width, height } = getImageSize(node, options)
  const svg = await toSvg(node, options)
  const img = await createImage(svg)

  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")!
  const ratio = options.pixelRatio || window.devicePixelRatio || 1
  const canvasWidth = options.canvasWidth || width
  const canvasHeight = options.canvasHeight || height

  canvas.width = Number(canvasWidth) * ratio
  canvas.height = Number(canvasHeight) * ratio

  if (!options.skipAutoScale) {
    checkCanvasDimensions(canvas)
  }
  canvas.style.width = `${canvasWidth}`
  canvas.style.height = `${canvasHeight}`

  if (options.backgroundColor) {
    context.fillStyle = options.backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  context.drawImage(img, 0, 0, canvas.width, canvas.height)

  return canvas
}

const toPng = async <T extends HTMLElement>(
  node: T,
  options: Options
): Promise<string> => {
  const canvas = await toCanvas(node, options)
  return canvas.toDataURL()
}
export default toPng
