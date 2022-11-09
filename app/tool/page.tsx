import Image from "next/image"
import Link from "next/link"
import React from "react"

interface ImagePreviewProps {
  src: string
  onClick: () => void
  onLoad: () => void
  onError: () => void
  loading: boolean
}

const ImagePreview = ({
  src,
  onClick,
  onLoad,
  onError,
  loading,
}: ImagePreviewProps) => {
  return (
    <Link className="image-wrapper" href={src} onClick={onClick}>
      <Image
        src={src}
        alt="Preview Image"
        onLoad={onLoad}
        onError={onError}
        style={{
          filter: loading ? "blur(5px)" : "",
          opacity: loading ? 0.1 : 1,
        }}
        title="Click to copy image URL to clipboard"
      />
    </Link>
  )
}

interface DropdownOption {
  text: string
  value: string
}

interface DropdownProps {
  options: Record<string, string>[]
  value: string
  onChange: (val: string) => void
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
        onInput={onInput}
      />
    </div>
  )
}

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
  return (
    <div>
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map((_item, _index) => (
          <option key={_index} value={_item.value}>
            {_item.text}
          </option>
        ))}
      </select>
    </div>
  )
}

const WallPaperTool = (props: Props) => {
  return <></>
}

export default WallPaperTool
