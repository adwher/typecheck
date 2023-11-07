import { SchemaContext } from "../context.ts";
import { createError, SchemaError, SchemaIssue } from "../errors.ts";
import { Infer, SchemaFrom } from "../schema.ts";
import { isObj } from "../types.ts";
import { SchemaObject } from "./object.ts";

export class SchemaStrict<S extends SchemaObject> extends SchemaFrom<S> {
  /**
   * Create a stricted schema that wraps the original one.
   * @param schema Wrapped schema.
   */
  constructor(readonly schema: S) {
    super();
  }

  check(value: unknown, context: SchemaContext): Infer<S> | SchemaError {
    type R = Infer<S>;

    if (!isObj<R>(value)) {
      return createError(context, { message: `Must be an "object"` });
    }

    const issues: SchemaIssue[] = [];

    for (const key in value) {
      if (key in this.schema.shape) {
        continue;
      }

      const message = `"${key}" is not defined on the shape`;
      issues.push({ ...context, message });
    }

    const output = this.schema.check(value, context);

    if (output instanceof SchemaError) {
      issues.push(...output.issues);
    }

    if (issues.length > 0) {
      return createError(context, { issues });
    }

    return output as R;
  }
}

/**
 * Create a stricted schema that wraps the original one.
 * @param schema Wrapped schema.
 */
export function strict<S extends SchemaObject>(schema: S) {
  return new SchemaStrict(schema);
}
