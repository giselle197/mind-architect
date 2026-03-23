import {
  JsonRenderer,
  TreeDiagramRenderer,
  FlatRenderer,
} from "#infrastructure/adapters/renderers";
import {
  IdentityTransformer,
  LogicalTreeTransformer,
  LayoutTreeTransformer,
} from "#infrastructure/adapters/transformers";
import { ViewPipeline } from "#core";

export const viewPipelinePresets: Record<
  string,
  () => ViewPipeline<any, any>
> = {
  raw: () => new ViewPipeline(new IdentityTransformer(), new JsonRenderer()),
  logical: () =>
    new ViewPipeline(new LogicalTreeTransformer(), new JsonRenderer()),
  layout: () =>
    new ViewPipeline(new LayoutTreeTransformer(), new JsonRenderer()),
  tree: () =>
    new ViewPipeline(new LayoutTreeTransformer(), new TreeDiagramRenderer()),
  flat: () => new ViewPipeline(new LogicalTreeTransformer(), new FlatRenderer()),
};

