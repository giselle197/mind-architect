import { renderers, type RendererPort } from "@mind-architect/renderer";
import worldData from "@mind-architect/data/world.json";
import { useEffect, useRef, useState } from "react";
import { startApp } from "./bootstrap";
import { ModeSwitcher } from "./components/ModeSwitcher";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [rendererName, setRendererName] = useState("dev");

  useEffect(() => {
    if (!containerRef.current) return;

    const Renderer = renderers[rendererName];
    const renderer: RendererPort = new Renderer();

    startApp(containerRef.current, worldData, renderer);

    return () => {
      renderer.dispose?.();
    };
  }, [rendererName]);

  return (
    <>
      <ModeSwitcher
        modes={Object.keys(renderers)}
        value={rendererName}
        onChange={setRendererName}
      />

      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </>
  );
}

export default App;
