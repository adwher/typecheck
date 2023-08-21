import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema, SchemaInfer, SchemaShape } from "../schema.ts";
import { isObj } from "../types.ts";

export class SchemaObject<
  S extends SchemaShape = SchemaShape,
  R extends object = SchemaInfer<S>,
> extends Schema<R> {
  /**
   * Create a new schema with the shape of an `object`.
   * @param shape Shape of the schema.
   */
  constructor(readonly shape: S) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    type Output = Record<string, unknown>;

    if (!isObj<Output>(value)) {
      return error(context, {
        message: `Must be a "object", got "${typeof value}"`,
      });
    }

    const final: Output = {};
    const issues: SchemaIssue[] = [];

    for (const key of this.keys) {
      const schema = this.shape[key];
      const field = value[key];

      if (!schema) {
        continue;
      }

      const scope: SchemaContext = {
        path: [...context.path, key],
      };

      const output = schema.check(field, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[key] = output;
    }

    if (issues.length > 0) {
      return error(context, {
        message: "Must have the given structure",
        issues,
      });
    }

    return final as R;
  }

  get keys() {
    return Object.keys(this.shape);
  }
}

/** Creates a new `object` schema using a `SchemaShape`. */
export function object<S extends SchemaShape>(shape: S) {
  return new SchemaObject(shape);
}

/** Alias of {@link object}. */
export const struct = object;

/** Alias of {@link object}. */
export const shape = object;
