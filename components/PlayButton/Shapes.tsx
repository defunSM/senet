import { Canvas, useThree } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useLayoutEffect, useRef } from "react";
import setting from "./constants";
import useSmoothTransform from "./smoothTransform";

export default function Shapes({ isHover, isPress, mouseX, mouseY }: { isHover: boolean, isPress: boolean, mouseX: number, mouseY: number}) {
  const lightRotateX = useSmoothTransform(mouseY, setting.SPRING, setting.MOUSE_TO_LIGHT_ROTATION);
  const lightRotateY = useSmoothTransform(mouseX, setting.SPRING, setting.MOUSE_TO_LIGHT_ROTATION);

  return (
    <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={setting.TRANSITION}>
        <motion.group
          rotation={[lightRotateX, lightRotateY, 0]}
        >
          <Lights />
        </motion.group>
        <motion.group
          dispose={null}
        >
          <Sphere />
          <Cone />
          <Torus />
          <Icosahedron />
        </motion.group>
      </MotionConfig>
    </Canvas>
  );
}

function Lights() {
  return (
    <>
      <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={0.2} />
      <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={0.8} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={0.5} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={0.8} />
    </>
  );
}

function Sphere() {
  return (
    <motion.mesh position={[-0.5, -0.5, 0]}>
      <sphereGeometry args={[0.4]} />
      <Material />
    </motion.mesh>
  );
}

function Cone() {
  return (
    <motion.mesh
      position={[-0.8, 0.4, 0]}
      rotation={[-0.5, 0, -0.3]}
      // @ts-ignore
      variants={{
        hover: {
          z: 1.1,
          x: -1.5,
          rotateX: -0.2,
          rotateZ: 0.4
        }
      }}
    >
      <coneGeometry args={[0.3, 0.6, 20]} />
      <Material />
    </motion.mesh>
  );
}

function Torus() {
  return (
    <motion.mesh
      position={[0.1, 0.4, 0]}
      rotation={[-0.5, 0.5, 0]}
      // @ts-ignore
      variants={{
        hover: {
          y: 0.5,
          z: 2,
          rotateY: -0.2
        }
      }}
    >
      <torusGeometry args={[0.2, 0.1, 10, 50]} />
      <Material />
    </motion.mesh>
  );
}

function Icosahedron() {
  return (
    <motion.mesh
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      // @ts-ignore
      variants={{
        hover: {
          x: 1.8,
          z: 0.6,
          y: 0.6,
          rotateZ: -0.5
        }
      }}
    >
      <icosahedronGeometry args={[0.7, 0]} />
      <Material />
    </motion.mesh>
  );
}

export function Material() {
  return <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />;
}

interface CamType {
  aspect: number | undefined
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }: { mouseX: number, mouseY: number}) {
  const cameraX = useSmoothTransform(mouseX, setting.SPRING, (x: number) => x / 350);
  const cameraY = useSmoothTransform(mouseY, setting.SPRING, (y: number) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      // @ts-ignore
      cam.aspect = size.width / size.height;
      // @ts-ignore
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      // @ts-ignore
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));

  }, [cameraX]);

  return (
    <motion.perspectiveCamera
      // @ts-ignore
      ref={cameraRef}
      fov={90}
      position={[cameraX, cameraY, 3.8]}
    />
  );
}
