import {
  DevTreeDiagramRenderer,
  FlatRenderer,
  FlatLayoutEngine,
} from "@mind-architect/renderer";
import type { AppPipeline } from "./pipelines";
import { DevPipeline, StandardPipeline } from "./pipelines";

export const pipelines: Record<string, () => AppPipeline> = {
  "dev-raw": () => new DevPipeline("raw"),
  "dev-tree": () => new DevPipeline("tree"),
  tree: () =>
    new StandardPipeline(new FlatLayoutEngine(), new DevTreeDiagramRenderer()),
  flat: () => new StandardPipeline(new FlatLayoutEngine(), new FlatRenderer()),
};

export const pipelineNames = Object.keys(pipelines);
