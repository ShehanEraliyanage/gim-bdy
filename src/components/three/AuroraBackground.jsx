import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float wave(vec2 uv, float speed, float freq) {
    return sin(uv.x * freq + uTime * speed) * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = vUv;

    float w1 = wave(uv, 0.3, 8.0);
    float w2 = wave(uv + 0.2, 0.5, 12.0);
    float w3 = wave(uv - 0.1, 0.2, 6.0);

    vec3 green = vec3(0.1, 0.9, 0.5);
    vec3 purple = vec3(0.55, 0.35, 0.95);
    vec3 gold = vec3(1.0, 0.84, 0.0);

    vec3 color = mix(green, purple, w1);
    color = mix(color, gold, w2 * 0.35);
    color *= 0.35 + w3 * 0.25;

    float vignette = 1.0 - length(uv - 0.5) * 0.8;
    color *= vignette;

    gl_FragColor = vec4(color, 0.85);
  }
`

export default function AuroraBackground() {
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta
    }
  })

  return (
    <mesh position={[0, 0, -2]} scale={[12, 8, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
