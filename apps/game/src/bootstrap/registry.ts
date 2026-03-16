import { DevTreeDiagramRenderer } from "@mind-architect/renderer/src/adapters/dev/DevTreeDiagramRenderer";
import { FlatLayoutEngine } from "@mind-architect/renderer/src/layout/LayoutEngine";
import type { AppPipeline } from "./pipelines";
import { DevPipeline, StandardPipeline } from "./pipelines";

export const pipelines: Record<string, () => AppPipeline> = {
  "dev-raw": () => new DevPipeline("raw"),
  "dev-tree": () => new DevPipeline("tree"),
  tree: () =>
    new StandardPipeline(new FlatLayoutEngine(), new DevTreeDiagramRenderer()),
};

export const pipelineNames = Object.keys(pipelines);
