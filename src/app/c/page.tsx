"use client";

import { Apple, Candy, Duck, Flash, Soda, Target } from "@/components/Models";
import {
  CameraShake,
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  PivotControls,
  Preload,
  View,
} from "@react-three/drei";
import { addEffect, Canvas } from "@react-three/fiber";
// import Lenis from "lenis";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

// @ts-ignore
// @ts-ignore

// const lenis = new Lenis({ syncTouch: true });
// // Integrate into fibers own raf loop instead of opening another
// addEffect((t) => lenis.raf(t));

export default function Home() {
  const lenisRef = useRef<any>(null);
  const lenis = useLenis();
  console.log(lenis);

  useEffect(() => {
    // if (lenis) {
    addEffect((t) => {
      console.log("t", t);
      return lenisRef.current?.lenis?.raf(t);
    });
    // }

    // function update(time: number) {
    //   console.log("time", time);
    //   console.log("lenisRef", lenisRef.current);
    //   lenisRef.current?.lenis?.raf(time);
    // }

    // const rafId = requestAnimationFrame(update);

    // return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/** Regular HTML with canvas bits mixed into it (<View>) */}
          <div className="text">
            Work on{" "}
            <Link
              href="https://github.com/pmndrs/react-three-fiber/releases/tag/v8.0.0"
              text="version 8"
            >
              <Common color="lightpink" />
              <Center>
                <Target scale={1.5} />
              </Center>
            </Link>{" "}
            has begun 3 Sep 2021.
            <View className="view translateX">
              <Common color="lightpink" />
              <PivotControls lineWidth={3} depthTest={false} scale={2}>
                <Soda scale={6} position={[0, -1.6, 0]} />
              </PivotControls>
              <OrbitControls makeDefault />
            </View>
            This is perhaps the biggest update to Fiber yet.
            <View
              className="view scale"
              style={{
                height: 300,
                width: 400,
                display: "inline-block",
                overflow: "hidden",
                margin: "0.2em",
              }}
            >
              <Common color="lightblue" />
              <Apple position={[0, -1, 0]} scale={14} />
              <OrbitControls makeDefault />
            </View>
            We've tried our best to keep breaking-changes to a minimum,
            <View
              className="view translateY"
              style={{
                height: 200,
                width: 400,
                display: "inline-block",
                overflow: "hidden",
                margin: "0.2em",
              }}
            >
              <Common color="lightgreen" />
              <Duck scale={2} position={[0, -1.6, 0]} />
              <CameraShake intensity={2} />
            </View>
            they mostly affect rarely used api's like attach.
            <View
              className="view scale"
              style={{
                height: 200,
                width: 400,
                display: "inline-block",
                overflow: "hidden",
                margin: "0.2em",
              }}
            >
              <Common color="peachpuff" />
              <Candy scale={3} />
            </View>
            This release brings a ton of performance related fixes,
            <View
              className="view translateX"
              style={{
                height: 200,
                width: 400,
                display: "inline-block",
                overflow: "hidden",
                margin: "0.2em",
              }}
            >
              <Common color="orange" />
              <Flash scale={3} />
            </View>
            but also includes some new and ground-breaking features.
          </div>
          {/** Fixed fullscreen canvas on top of everything, events tied to index root */}
          <Canvas
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
            // eventSource={document.getElementById("root") }
          >
            <View.Port />
            <Preload all />
          </Canvas>
        </div>
      </ReactLenis>
    </>
  );
}

// @ts-ignore

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  );
}

// @ts-ignore

function Link({ href, text, children }) {
  const ref = useRef(null);
  const [hovered, hover] = useState(false);
  // @ts-ignore

  return (
    <a
      href={href}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      onPointerMove={(e) => {
        const x = e.nativeEvent.offsetX;
        // @ts-ignore

        const y = e.nativeEvent.offsetY - e.target.offsetTop - 100;
        // @ts-ignore

        ref.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      }}
    >
      {text}
      <View
        ref={ref}
        visible={hovered}
        index={Infinity} // Render this view on top of all others
        className="view"
        style={{
          position: "absolute",
          width: 200,
          display: "block",
          pointerEvents: "none",
        }}
      >
        <group>{children}</group>
      </View>
    </a>
  );
}
