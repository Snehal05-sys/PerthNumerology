import { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment, Sparkles } from "@react-three/drei";

function GemBody({ color, shape = "octa" }) {
  const geometry = {
    octa:    <octahedronGeometry args={[1.15, 0]} />,
    diamond: <octahedronGeometry args={[1.3, 0]} />,
    emerald: <boxGeometry args={[1.3, 0.9, 1.0]} />,
    round:   <icosahedronGeometry args={[1.1, 0]} />,
    pear:    <coneGeometry args={[0.9, 1.8, 6]} />,
  }[shape] || <octahedronGeometry args={[1.15, 0]} />;

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.7}>
      <group rotation={[0.35, 0.6, 0]}>
        <mesh castShadow receiveShadow>
          {geometry}
          <meshPhysicalMaterial
            color={color}
            metalness={0.08}
            roughness={0.02}
            transmission={0.92}
            thickness={1.8}
            ior={2.1}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={1.6}
            emissive={color}
            emissiveIntensity={0.12}
          />
        </mesh>
        <mesh scale={0.72}>
          {geometry}
          <meshPhysicalMaterial
            color={"#ffffff"}
            transparent
            opacity={0.08}
            transmission={1}
            roughness={0}
            thickness={2}
            ior={2.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function BaseShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <circleGeometry args={[1.2, 48]} />
      <meshBasicMaterial color="#111827" transparent opacity={0.35} />
    </mesh>
  );
}

// memo() prevents ANY re-render unless color or shape actually changes
// This stops the WebGL Canvas from being destroyed and recreated
const Gemstone3DViewer = memo(function Gemstone3DViewer({ color = "#8b5cf6", shape = "octa" }) {
  return (
    <div className="gem-3d-frame realistic-gem-frame">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} shadows>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 3]} intensity={2.1} />
        <pointLight position={[-3, 2, 2]} intensity={1.3} />
        <pointLight position={[2, -2, 2]} intensity={0.8} color={color} />
        <Sparkles count={40} scale={[4, 2.5, 4]} size={2.2} speed={0.5} color={color} />
        <GemBody color={color} shape={shape} />
        <BaseShadow />
        <Environment preset="city" />
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.1} />
      </Canvas>
    </div>
  );
});

export default Gemstone3DViewer;
