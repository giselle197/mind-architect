import { viewPipelinePresets } from "@mind-architect/viewer";

export const viewPipelineRegistry = {
  ...viewPipelinePresets,
};

export const pipelineNames = Object.keys(viewPipelinePresets);
