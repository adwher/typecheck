import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema } from "../schema.ts";
import { isArr } from "../types.ts";

export class SchemaArray<T> extends Schema<T[]> {
  /**
   * Creates a new schema array of `T`.
   * @param schema Shape of the schema.
   */
  constructor(readonly schema: Schema<T>) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (!isArr<T>(value)) {
      return error(context, {
        message: `Must be an "array", got "${typeof value}"`,
      });
    }

    const size = value.length;
    const final: T[] = new Array(size);
    const issues: SchemaIssue[] = [];

    for (let key = 0; key < size; key++) {
      const field = value[key];

      const scope: SchemaContext = {
        path: [...context.path, key],
      };

      const output = this.schema.check(field, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[key] = output;
    }

    if (issues.length > 0) {
      return error(context, { issues });
    }

    return value;
  }
}

/** Creates a new schema array of `T`. */
export function array<T>(schema: Schema<T>) {
  return new SchemaArray(schema);
}
