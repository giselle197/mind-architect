import type { RendererPort } from "@mind-architect/renderer";
import worldData from "@mind-architect/data/world.json";
import { useEffect, useRef } from "react";
import { startApp } from "./bootstrap";


function App({ renderer }: { renderer: RendererPort }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    startApp(containerRef.current, worldData, renderer);

    return () => {
      renderer.dispose?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

export default App;