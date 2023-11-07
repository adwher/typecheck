import { SchemaContext } from "../context.ts";
import { createError, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isArr } from "../types.ts";

export class SchemaArray<T> extends Schema<T[]> {
  /**
   * Creates a new schema array of `T`.
   * @param wrapped Shape of the schema.
   */
  constructor(readonly wrapped: Schema<T>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (!isArr<T>(value)) {
      return createError(context, { message: `Must be an "array"` });
    }

    const size = value.length;
    const final: T[] = new Array(size);
    const issues: SchemaIssue[] = [];

    for (let key = 0; key < size; key++) {
      const received = value[key];

      const scope: SchemaContext = {
        path: [...context.path, key],
      };

      const output = this.wrapped.check(received, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[key] = output;
    }

    if (issues.length > 0) {
      return createError(context, { issues });
    }

    return value;
  }
}

/** Creates a new schema array of `T`. */
export function array<T>(schema: Schema<T>) {
  return new SchemaArray(schema);
}
