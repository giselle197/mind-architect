import { renderers, type RendererPort } from "@mind-architect/renderer";
import worldData from "@mind-architect/data/world.json";
import { useEffect, useRef, useState } from "react";
import { startApp } from "./bootstrap";
import { ModeSwitcher } from "./components/ModeSwitcher";

function getInitialRenderer(rendererNames: string[]) {
  const params = new URLSearchParams(location.search);
  const queryRenderer = params.get("renderer");

  if (queryRenderer && rendererNames.includes(queryRenderer)) {
    return queryRenderer;
  }

  return rendererNames[0];
}

function setRendererQuery(name: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("renderer", name);
  window.history.replaceState(null, "", url);
}

const rendererNames = Object.keys(renderers);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [rendererName, setRendererName] = useState(() =>
    getInitialRenderer(rendererNames),
  );

  useEffect(() => {
    setRendererQuery(rendererName);
  }, [rendererName]);

  useEffect(() => {
    if (!containerRef.current) return;

    const Renderer = renderers[rendererName];
    const renderer: RendererPort = new Renderer();

    startApp(containerRef.current, worldData, renderer);

    return () => renderer.dispose?.();
  }, [rendererName]);

  return (
    <>
      <ModeSwitcher
        modes={rendererNames}
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
