import worldData from "@mind-architect/data/world.json";
import { useEffect, useRef, useState } from "react";
import { ModeSwitcher } from "./components/ModeSwitcher";

import { pipelines, pipelineNames } from "./bootstrap";

function getInitialPipeline(names: string[]): string {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("pipeline");
  return query && names.includes(query) ? query : names[0];
}

function setPipelineQuery(name: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("pipeline", name);
  window.history.replaceState({}, "", url.toString());
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pipelineName, setPipelineName] = useState(() =>
    getInitialPipeline(pipelineNames),
  );

  useEffect(() => {
    setPipelineQuery(pipelineName);
  }, [pipelineName]);

  useEffect(() => {
    if (!containerRef.current) return;

    const createPipeline = pipelines[pipelineName];
    const pipeline = createPipeline();

    pipeline.run(containerRef.current, worldData);

    return () => pipeline.dispose?.();
  }, [pipelineName]);

  return (
    <div className="app">
      <ModeSwitcher
        modes={pipelineNames}
        value={pipelineName}
        onChange={setPipelineName}
      />
      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}

export default App;
