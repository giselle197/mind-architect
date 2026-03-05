import { renderers, type RendererPort } from "@mind-architect/renderer";
import worldData from "@mind-architect/data/world.json";
import { useEffect, useRef, useState } from "react";
import { startApp } from "./bootstrap";

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

  const rendererNames = Object.keys(renderers);

  return (
    <>
      <select
        value={rendererName}
        onChange={(e) => setRendererName(e.target.value)}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
        }}
      >
        {rendererNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

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
