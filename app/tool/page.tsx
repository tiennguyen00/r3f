"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { toBlob, toPng } from "html-to-image"
import { saveAs } from "file-saver"
interface ImagePreviewProps {
  src: string
  srcLogo: string
  width: number | `${number}`
  height: number | `${number}`
  onClick: () => void
  onLoad: () => void
  onError: () => void
  loading: boolean
}

const ImagePreview = ({
  src,
  srcLogo,
  width,
  height,
  onClick,
  onLoad,
  onError,
  loading,
}: ImagePreviewProps) => {
  return (
    <div
      id="preview-image"
      style={{
        position: "relative",
      }}
    >
      <Link className="image-wrapper" href={src} onClick={onClick}>
        <Image
          src={src}
          // loader={({ src, width, quality }) => {
          //   return `/wallPaper/twitter/${src}/?${width}&q=${quality || 75}`
          // }}
          width={width}
          height={height}
          alt="Preview Image"
          onLoad={onLoad}
          onError={onError}
          style={{
            filter: loading ? "blur(5px)" : "",
            opacity: loading ? 0.1 : 1,
          }}
          title="Click to copy image URL to clipboard"
          priority
          onLoadingComplete={(img) => console.log(img)}
        />
      </Link>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Image src={srcLogo} width={594} height={175} alt="Logo Image" />
      </div>
    </div>
  )
}

interface DropdownProps {
  options: Record<string, string>[]
  onChange?: (val: string) => void
}

const Dropdown = ({ options, onChange }: DropdownProps) => {
  return (
    <div>
      <select>
        {options.map((_item, _index) => (
          <option key={_index} value={_item.value}>
            {_item.text}
          </option>
        ))}
      </select>
    </div>
  )
}

interface TextInputProps {
  value: string
  onInput: (val: string) => void
  small: boolean
  placeholder?: string
  type?: string
}

const TextInput = ({
  value,
  onInput,
  small,
  type = "text",
  placeholder = "",
}: TextInputProps) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        // onInput={onInput}
      />
    </div>
  )
}

interface ButtonProps {
  label: string
  onClick: () => void
}

const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>
}

const backgroudOptions = [
  { text: "Background 1", value: "bg1" },
  { text: "Background 2", value: "bg2" },
  { text: "Background 3", value: "bg3" },
]
const logoOptions = [
  { text: "Logo 1", value: "logo1" },
  { text: "Logo 2", value: "logo2" },
  { text: "Logo 3", value: "logo3" },
]

interface WallPaperToolProps {
  overrideURL?: string
}

const WallPaperTool = ({ overrideURL }: WallPaperToolProps) => {
  const [loadChanged, setLoadChanged] = useState(false)
  const handleDownload = () => {
    let node = document.getElementById("preview-image")
    toBlob(node as any)
      .then((blob) => {
        !!blob
          ? saveAs(blob, "test_framework")
          : console.error("Blob data is not available")
      })
      .catch((err) => console.error("Something went wrong: ", err))
  }
  return (
    <>
      <div>
        <ImagePreview
          src={overrideURL ?? "/wallPaper/twitter/SplashArt01.png"}
          srcLogo="/wallPaper/logo/Logo02.png"
          width={1500}
          height={500}
          loading={loadChanged}
          onError={() => {
            return
          }}
          onLoad={() => {
            return
          }}
          onClick={() => {
            return
          }}
        />
        <Dropdown options={backgroudOptions} />
        <Dropdown options={logoOptions} />
      </div>
      <Button label="Download this image" onClick={handleDownload} />
    </>
  )
}

export default WallPaperTool
