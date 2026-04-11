"use client";

import { useEffect, useRef } from "react";
import { Effects } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";
import { VignetteShader } from "./shaders/vignetteShader";

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
  vignetteDarkness: 1.5,
  vignetteOffset: 0.4,
};

function getParticleSize() {
  if (typeof window === "undefined") return 256;
  const isMobile = window.innerWidth < 768;
  const isLowEnd =
    typeof navigator !== "undefined" &&
    navigator.hardwareConcurrency !== undefined &&
    navigator.hardwareConcurrency <= 4;
  if (isMobile || isLowEnd) return 128;
  return 256;
}

export const GL = ({ hovering }: { hovering: boolean }) => {
  const size = useRef(256);

  useEffect(() => {
    size.current = getParticleSize();
  }, []);

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
        <color attach="background" args={["#000"]} />
        <Particles
          speed={PARTICLE_CONFIG.speed}
          aperture={PARTICLE_CONFIG.aperture}
          focus={PARTICLE_CONFIG.focus}
          size={256}
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
        <Effects multisamping={0} disableGamma>
          <shaderPass
            args={[VignetteShader]}
            uniforms-darkness-value={PARTICLE_CONFIG.vignetteDarkness}
            uniforms-offset-value={PARTICLE_CONFIG.vignetteOffset}
          />
        </Effects>
      </Canvas>
    </div>
  );
};
