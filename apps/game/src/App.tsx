import worldData from "@mind-architect/data/world.json";
import { FlatRenderer } from "@mind-architect/renderer-flat/src/FlatRenderer";
import { useEffect, useRef } from "react";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new FlatRenderer();
    renderer.render(worldData, containerRef.current);

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