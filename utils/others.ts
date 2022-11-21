import { mimes, Options } from "./types"

const px = (node: HTMLElement, styleProperty: string) => {
  const win = node.ownerDocument.defaultView || window
  const val = win.getComputedStyle(node).getPropertyValue(styleProperty)
  return val ? parseFloat(val.replace("px", "")) : 0
}

const getNodeWidth = (node: HTMLElement) => {
  const leftBorder = px(node, "border-left-width")
  const rightBorder = px(node, "border-right-width")
  return node.clientWidth + leftBorder + rightBorder
}
const getNodeHeight = (node: HTMLElement) => {
  const topBorder = px(node, "border-top-width")
  const bottomBorder = px(node, "border-bottom-width")
  return node.clientHeight + topBorder + bottomBorder
}

export const getImageSize = (
  targetNode: HTMLElement,
  options: Options
): { width: number; height: number } => {
  const width = options.width || getNodeWidth(targetNode)
  const height = options.height || getNodeHeight(targetNode)
  return { width, height }
}

/**
 * Clone node
 */
const cloneSingleNode = async <T extends HTMLElement>(
  node: T,
  options: Options
): Promise<HTMLElement> => {
  const cloneCanvasElement = async (canvas: HTMLCanvasElement) => {
    const dataURL = canvas.toDataURL()
    if (dataURL === "data:,") {
      return canvas.cloneNode(false) as HTMLCanvasElement
    }

    return createImage(dataURL)
  }
  if (node instanceof HTMLCanvasElement) {
    return cloneCanvasElement(node)
  }

  return node.cloneNode(false) as T
}
const cloneChildren = async <T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
  options: Options
): Promise<T> => {
  const isSlotElement = (node: HTMLElement): node is HTMLSlotElement =>
    node.tagName != null && node.tagName.toUpperCase() === "SLOT"
  const children =
    isSlotElement(nativeNode) && nativeNode.assignedNodes
      ? toArray<T>(nativeNode.assignedNodes())
      : toArray<T>((nativeNode.shadowRoot ?? nativeNode).childNodes)

  if (children.length === 0 || nativeNode instanceof HTMLVideoElement) {
    return clonedNode
  }

  await children.reduce(
    (deferred, child) =>
      deferred
        .then(() => cloneNode(child, options))
        .then((clonedChild: HTMLElement | null) => {
          if (clonedChild) {
            clonedNode.appendChild(clonedChild)
          }
        }),
    Promise.resolve()
  )

  return clonedNode
}
export const cloneNode = async <T extends HTMLElement>(
  node: T,
  options: Options,
  isRoot?: boolean
): Promise<T | null> => {
  if (!isRoot && options.filter && !options.filter(node)) {
    return null
  }

  return Promise.resolve(node)
    .then((clonedNode) => cloneSingleNode(clonedNode, options) as Promise<T>)
    .then((clonedNode) => cloneChildren(node, clonedNode, options))
  // .then((clonedNode) => decorate(node, clonedNode))
}

/**
 * EmbedImages, it had disabled embedBackground (image)
 */

const getCacheKey = (
  url: string,
  contentType: string | undefined,
  includeQueryParams: boolean | undefined
) => {
  let key = url.replace(/\?.*/, "")

  if (includeQueryParams) key = url

  return contentType ? `[${contentType}]${key}` : key
}

const fetchAsDataURL = async <T>(
  url: string,
  init: RequestInit | undefined,
  process: (data: { result: string; res: Response }) => T
): Promise<T> => {
  const res = await fetch(url, init)
  if (res.status === 404) {
    throw new Error(`Resource "${res.url}" not found`)
  }
  const blob = await res.blob()
  return new Promise<T>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onloadend = () => {
      try {
        resolve(process({ res, result: reader.result as string }))
      } catch (error) {
        reject(error)
      }
    }

    reader.readAsDataURL(blob)
  })
}

const resourceToDataURL = async (
  resourceUrl: string,
  contentType: string | undefined,
  options: Options
) => {
  const cache: { [url: string]: string } = {}
  const cacheKey = getCacheKey(
    resourceUrl,
    contentType,
    options.includeQueryParams
  )

  if (cache[cacheKey] != null) {
    return cache[cacheKey]
  }

  // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
  if (options.cacheBust) {
    // eslint-disable-next-line no-param-reassign
    resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + new Date().getTime()
  }

  let dataURL: string
  try {
    const content = await fetchAsDataURL(
      resourceUrl,
      options.fetchRequestInit,
      ({ res, result }) => {
        if (!contentType) {
          // eslint-disable-next-line no-param-reassign
          contentType = res.headers.get("Content-Type") || ""
        }
        // Get content from URL
        return result.split(/,/)[1]
      }
    )
    // Make default URL
    dataURL = `data:${contentType};base64,${content}`
  } catch (error) {
    dataURL = options.imagePlaceholder || ""

    let msg = `Failed to fetch resource: ${resourceUrl}`
    if (error) {
      msg = typeof error === "string" ? error : (error as any).message || ""
    }

    if (msg) {
      console.warn(msg)
    }
  }

  cache[cacheKey] = dataURL
  return dataURL
}

const embedImageNode = async <T extends HTMLElement | SVGImageElement>(
  clonedNode: T,
  options: Options
) => {
  const isDataUrl = (url: string) => {
    return url.search(/^(data:)/) !== -1
  }
  const getExtension = (url: string): string => {
    const match = /\.([^./]*?)$/g.exec(url)
    return match ? match[1] : ""
  }
  const getMimeType = (url: string): string => {
    const etx = getExtension(url).toLowerCase()
    return mimes[etx] || ""
  }

  if (
    !(clonedNode instanceof HTMLImageElement && !isDataUrl(clonedNode.src)) &&
    !(
      clonedNode instanceof SVGImageElement &&
      !isDataUrl(clonedNode.href.baseVal)
    )
  )
    return

  const url =
    clonedNode instanceof HTMLImageElement
      ? clonedNode.src
      : clonedNode.href.baseVal

  const dataURL = await resourceToDataURL(url, getMimeType(url), options)
  await new Promise((resolve, reject) => {
    clonedNode.onload = resolve
    clonedNode.onerror = reject
    if (clonedNode instanceof HTMLImageElement) {
      clonedNode.srcset = ""
      clonedNode.src = dataURL
    } else {
      clonedNode.href.baseVal = dataURL
    }
  })
}

const toArray = <T>(arrayLike: any): T[] => {
  const arr: T[] = []

  for (let i = 0, l = arrayLike.length; i < l; i++) {
    arr.push(arrayLike[i])
  }

  return arr
}
const embedChildren = async <T extends HTMLElement>(
  clonedNode: T,
  options: Options
) => {
  const children = toArray<HTMLElement>(clonedNode.childNodes)
  const deferreds = children.map((child) => embedImages(child, options))
  await Promise.all(deferreds).then(() => clonedNode)
}

export const embedImages = async <T extends HTMLElement>(
  clonedNode: T,
  options: Options
) => {
  if (clonedNode instanceof Element) {
    await embedImageNode(clonedNode, options)
    await embedChildren(clonedNode, options)
  }
}

/**
 * Apply style css
 */
export const applyStyle = <T extends HTMLElement>(
  node: T,
  options: Options
): T => {
  const { style } = node

  if (options.backgroundColor) {
    style.backgroundColor = options.backgroundColor
  }

  if (options.width) {
    style.width = `${options.width}px`
  }

  if (options.height) {
    style.height = `${options.height}px`
  }

  const manual = options.style
  if (manual != null) {
    Object.keys(manual).forEach((key: any) => {
      style[key] = manual[key] as string
    })
  }

  return node
}

/**
 * Create URL link data from node
 */
const svgToDataURL = async (svg: SVGElement): Promise<string> => {
  return Promise.resolve()
    .then(() => new XMLSerializer().serializeToString(svg))
    .then(encodeURIComponent)
    .then((html) => `data:image/svg+xml;charset=utf-8,${html}`)
}
export const nodeToDataURL = async (
  node: HTMLElement,
  width: number,
  height: number
): Promise<string> => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  const foreignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  )

  svg.setAttribute("width", `${width}`)
  svg.setAttribute("height", `${height}`)
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

  foreignObject.setAttribute("width", "100%")
  foreignObject.setAttribute("height", "100%")
  foreignObject.setAttribute("x", "0")
  foreignObject.setAttribute("y", "0")
  foreignObject.setAttribute("externalResourcesRequired", "true")

  svg.appendChild(foreignObject)
  foreignObject.appendChild(node)

  return svgToDataURL(svg)
}

export const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.crossOrigin = "anonymous"
    img.decoding = "sync"
    img.src = url
  })
}
export const checkCanvasDimensions = (canvas: HTMLCanvasElement) => {
  const canvasDimensionLimit = 16384
  if (
    canvas.width > canvasDimensionLimit ||
    canvas.height > canvasDimensionLimit
  ) {
    if (
      canvas.width > canvasDimensionLimit &&
      canvas.height > canvasDimensionLimit
    ) {
      if (canvas.width > canvas.height) {
        canvas.height *= canvasDimensionLimit / canvas.width
        canvas.width = canvasDimensionLimit
      } else {
        canvas.width *= canvasDimensionLimit / canvas.height
        canvas.height = canvasDimensionLimit
      }
    } else if (canvas.width > canvasDimensionLimit) {
      canvas.height *= canvasDimensionLimit / canvas.width
      canvas.width = canvasDimensionLimit
    } else {
      canvas.width *= canvasDimensionLimit / canvas.height
      canvas.height = canvasDimensionLimit
    }
  }
}
