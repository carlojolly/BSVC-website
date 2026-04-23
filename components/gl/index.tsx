"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";

const PARTICLE_CONFIG = {
  speed: 1.0,
  noiseScale: 0.6,
  noiseIntensity: 0.52,
  timeScale: 1.0,
  focus: 3.8,
  aperture: 1.79,
  pointSize: 10.0,
  opacity: 0.8,
  planeScale: 10.0,
};

export const GL = ({ hovering }: { hovering: boolean }) => {
  return (
    <div id="webgl" style={{ willChange: "transform" }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
        }}
        performance={{ min: 0.5 }}
        camera={{
          position: [
            1.2629783123314589, 2.664606471394044, -1.8178993743288914,
          ],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
      >
        <color attach="background" args={["#ffffff"]} />
        <Particles
          speed={PARTICLE_CONFIG.speed}
          aperture={PARTICLE_CONFIG.aperture}
          focus={PARTICLE_CONFIG.focus}
          size={512}
          noiseScale={PARTICLE_CONFIG.noiseScale}
          noiseIntensity={PARTICLE_CONFIG.noiseIntensity}
          timeScale={PARTICLE_CONFIG.timeScale}
          pointSize={PARTICLE_CONFIG.pointSize}
          opacity={PARTICLE_CONFIG.opacity}
          planeScale={PARTICLE_CONFIG.planeScale}
          useManualTime={false}
          manualTime={0}
          introspect={hovering}
        />
      </Canvas>
    </div>
  );
};
