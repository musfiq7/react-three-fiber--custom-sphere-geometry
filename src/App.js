import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import './App.css';

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Radius: 1, Width and Height segments: 32

const positions = new Float32Array(sphereGeometry.getAttribute('position').array);
const normals = new Float32Array(sphereGeometry.getAttribute('normal').array);
const colors = new Float32Array(positions.length);

console.log(positions);

// Assign random colors to each vertex for demonstration
for (let i = 0; i < colors.length; i += 3) {
  colors[i] = Math.random();
  colors[i + 1] = Math.random();
  colors[i + 2] = Math.random();
}

const indices = new Uint16Array(sphereGeometry.index.array);

const CustomGeometryParticles = () => {
  const ref = useRef();

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-color'
          array={colors}
          count={colors.length / 3}
          itemSize={3} // 3 components for RGB
        />
        <bufferAttribute
          attach='attributes-normal'
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
      <ambientLight intensity={0.5} />
      <CustomGeometryParticles />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
