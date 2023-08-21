import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";
import { pipeline, SchemaPipes } from "../pipes.ts";
import { Schema } from "../schema.ts";
import { isNum } from "../types.ts";

export class SchemaNumber extends Schema<number> {
  constructor(private pipes: SchemaPipes<number>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (isNum(value)) {
      return pipeline(value, context, this.pipes);
    }

    return error(context, {
      message: `Must be a "number", got "${typeof value}"`,
    });
  }
}

/** Creates a new `number` schema. */
export function number(...pipes: SchemaPipes<number>) {
  return new SchemaNumber(pipes);
}
