"use client"
import React, { useEffect, useMemo, useRef } from "react"
import { BufferGeometry, DoubleSide, Material, Mesh } from "three"

const CustomGeometry = () => {
  const verticesCount = 10 * 3 // 10 Triangles => 3 points per triangle
  const numberVertex = new Float32Array(verticesCount * 3)

  const positions = useMemo(() => {
    const positions = numberVertex // We have 30 vertices => We need 3 values per vertex (x, y, z)

    Array.from(Array(verticesCount * 3).keys()).map((i) => {
      positions[i] = (Math.random() - 0.5) * 3
    })
    return positions
  }, [])

  const colors = useMemo(() => {
    const colors = numberVertex
    Array.from(Array(verticesCount * 3).keys()).map((i) => {
      colors[i] = Math.random()
    })
    return colors
  }, [])

  const bufferRef = useRef<BufferGeometry | null>(null)

  useEffect(() => {
    if (!!bufferRef.current) bufferRef.current.computeVertexNormals()
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={bufferRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
        <bufferAttribute
          attach="attributes-colors"
          count={verticesCount}
          itemSize={3}
          array={colors}
        />
      </bufferGeometry>
      <meshStandardMaterial side={DoubleSide} />
    </mesh>
  )
}

export default CustomGeometry
