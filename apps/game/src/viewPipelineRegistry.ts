import {
  JsonRenderer,
  TreeDiagramRenderer,
  FlatRenderer,
  IdentityTransformer,
  LogicalTreeTransformer,
  LayoutTreeTransformer,
  ViewPipeline,
} from "@mind-architect/viewer";

export const viewPipelineRegistry: Record<
  string,
  () => ViewPipeline<any, any>
> = {
  raw: () =>
    new ViewPipeline(new IdentityTransformer(), new JsonRenderer()),
  logical: () =>
    new ViewPipeline(new LogicalTreeTransformer(), new JsonRenderer()),
  layout: () =>
    new ViewPipeline(new LayoutTreeTransformer(), new JsonRenderer()),
  tree: () =>
    new ViewPipeline(new LayoutTreeTransformer(), new TreeDiagramRenderer()),
  flat: () => new ViewPipeline(new LayoutTreeTransformer(), new FlatRenderer()),
};

export const pipelineNames = Object.keys(viewPipelineRegistry);
