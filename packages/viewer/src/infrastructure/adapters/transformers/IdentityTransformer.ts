import type { TransformerPort } from "#core";
import type { WorldData } from "#core";

export class IdentityTransformer implements TransformerPort<WorldData, WorldData> {
  transform(data: WorldData): WorldData {
    return data;
  }
}
