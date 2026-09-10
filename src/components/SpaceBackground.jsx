import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Main star field component
function Stars({ count = 3000 }) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count), { radius: 50 });
    // Ensure no NaN values
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = (Math.random() - 0.5) * 100; // Replace NaN with random value
      }
    }
    return [positions];
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Distant stars with different colors
function DistantStars({ count = 1500 }) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count), { radius: 80 });
    // Ensure no NaN values
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = (Math.random() - 0.5) * 160; // Replace NaN with random value
      }
    }
    return [positions];
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#B3E5FC"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Blue giant stars
function BlueGiants({ count = 300 }) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count), { radius: 60 });
    // Ensure no NaN values
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = (Math.random() - 0.5) * 120; // Replace NaN with random value
      }
    }
    return [positions];
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 30;
    ref.current.rotation.z -= delta / 40;
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#40C4FF"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Cosmic dust particles
function CosmicDust({ count = 2000 }) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count), { radius: 100 });
    // Ensure no NaN values
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = (Math.random() - 0.5) * 200; // Replace NaN with random value
      }
    }
    return [positions];
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 50;
    ref.current.position.x = Math.sin(state.clock.elapsedTime / 20) * 0.2;
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#E1BEE7"
          size={0.001}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

// Nebula cloud effect
function NebulaCloud() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.z += delta / 60;
    ref.current.position.x = Math.sin(state.clock.elapsedTime / 15) * 0.3;
    ref.current.position.y = Math.cos(state.clock.elapsedTime / 20) * 0.2;
  });

  return (
    <mesh ref={ref} position={[0, 0, -20]}>
      <planeGeometry args={[40, 40, 1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.05}
        color="#4A148C"
        side={2}
      />
    </mesh>
  );
}

// Purple nebula layer
function PurpleNebula() {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.z -= delta / 80;
    ref.current.position.x = Math.cos(state.clock.elapsedTime / 25) * 0.4;
    ref.current.position.y = Math.sin(state.clock.elapsedTime / 30) * 0.3;
  });

  return (
    <mesh ref={ref} position={[5, -3, -30]}>
      <planeGeometry args={[60, 30, 1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.03}
        color="#7C4DFF"
        side={2}
      />
    </mesh>
  );
}

// Twinkling bright stars
function TwinklingStars({ count = 50 }) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count), { radius: 70 });
    // Ensure no NaN values
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = (Math.random() - 0.5) * 140; // Replace NaN with random value
      }
    }
    return [positions];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      if (ref.current.material) {
        ref.current.material.size = 0.01 + Math.sin(state.clock.elapsedTime * 2) * 0.005;
      }
      ref.current.rotation.x += 0.001;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFD700"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const SpaceBackground = () => {
  // Adaptive performance based on device capabilities
  const isLowEnd = typeof window !== 'undefined' && (
    navigator.hardwareConcurrency <= 4 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
  
  const starCount = isLowEnd ? 1500 : 3000;
  const distantCount = isLowEnd ? 750 : 1500;
  const blueGiantsCount = isLowEnd ? 150 : 300;
  const dustCount = isLowEnd ? 1000 : 2000;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
          preserveDrawingBuffer: false,
        }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        performance={{ min: 0.5, max: 1 }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        {/* Main star layers */}
        <Stars count={starCount} />
        <DistantStars count={distantCount} />
        <BlueGiants count={blueGiantsCount} />
        
        {/* Atmospheric effects */}
        <CosmicDust count={dustCount} />
        <TwinklingStars count={50} />
        
        {/* Nebula layers */}
        <NebulaCloud />
        <PurpleNebula />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;