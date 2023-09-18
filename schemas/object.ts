import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Infer, Schema } from "../schema.ts";
import { isObj } from "../types.ts";

/** Defines an record of `keys` and their schemas, useful for objects. */
export interface SchemaShape {
  [key: string | number | symbol]: Schema;
}

export class SchemaObject<
  S extends SchemaShape = SchemaShape,
> extends Schema<Infer<S>> {
  /**
   * Create a new schema with the shape of an `object`.
   * @param shape Shape of the schema.
   */
  constructor(readonly shape: S) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    type R = Infer<S>;

    if (!isObj<R>(value)) {
      return error(context, { message: `Must be a "object"` });
    }

    const final = {} as R;
    const issues: SchemaIssue[] = [];

    for (const key in this.shape) {
      const received = value[key];
      const schema = this.shape[key];

      if (!schema && context.strict === true) {
        const message = `"${key}" is not on the shape`;
        issues.push({ ...context, message, issues });
      }

      if (!schema) {
        continue;
      }

      const scope: SchemaContext = {
        path: [...context.path, key],
      };

      const output = schema.check(received, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[key] = output;
    }

    if (issues.length > 0) {
      return error(context, { issues });
    }

    return final as R;
  }
}

/** Creates a new `object` schema using a `ObjectShape`. */
export function object<S extends SchemaShape>(shape: S) {
  return new SchemaObject(shape);
}

/** Alias of {@link object}. */
export const struct = object;

/** Alias of {@link object}. */
export const shape = object;
