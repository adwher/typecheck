import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { pipeline, SchemaPipes } from "../pipes.ts";
import { Schema } from "../schema.ts";
import { isStr } from "../types.ts";

export class SchemaString extends Schema<string> {
  constructor(private pipes: SchemaPipes<string>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (isStr(value)) {
      return pipeline(value, context, this.pipes);
    }

    return error(context, {
      message: `Must be a "string", got "${typeof value}"`,
    });
  }
}

/** Creates a new `string` schema. */
export function string(...pipes: SchemaPipes<string>) {
  return new SchemaString(pipes);
}
