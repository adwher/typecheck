import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { pipeline, SchemaPipes } from "../pipes.ts";
import { Schema } from "../schema.ts";
import { isBool } from "../types.ts";

export class SchemaBoolean extends Schema<boolean> {
  constructor(private pipes: SchemaPipes<boolean>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (isBool(value)) {
      return pipeline(value, context, this.pipes);
    }

    return error(context, {
      message: `Must be a "boolean", got "${typeof value}"`,
    });
  }
}

/** Creates a new `boolean` schema. */
export function boolean(...pipes: SchemaPipes<boolean>) {
  return new SchemaBoolean(pipes);
}
