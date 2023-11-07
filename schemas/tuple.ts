import { SchemaContext } from "../context.ts";
import { createError, SchemaError, SchemaIssue } from "../errors.ts";
import { Infer, Schema, SchemaFrom } from "../schema.ts";
import { isArr } from "../types.ts";

export class SchemaTuple<
  S extends readonly Schema[],
> extends SchemaFrom<S> {
  /**
   * Creates a new schema tuple of `T`.
   * @param schema Shape of the schema.
   */
  constructor(readonly schemas: S) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    if (!isArr(value)) {
      return createError(context, {
        message: `Must be an "tuple", got "${typeof value}"`,
      });
    }

    const size = this.schemas.length;
    const final = new Array(size);
    const issues: SchemaIssue[] = [];

    if (value.length > size || value.length < size) {
      return createError(context, {
        message: `Must have ${size} elements. Got ${value.length}`,
      });
    }

    for (let index = 0; index < size; index++) {
      const received = value[index];
      const schema: S[number] | undefined = this.schemas[index];

      const scope: SchemaContext = {
        path: [...context.path, index],
      };

      if (!schema) {
        continue;
      }

      const output = schema.check(received, scope);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      final[index] = output;
    }

    if (issues.length > 0) {
      return createError(context, { issues });
    }

    return value as Infer<S>;
  }
}

/** Creates a new schema tuple of type `[A, B, ...C]`. */
export function tuple<
  A extends Schema,
  B extends Schema,
  C extends readonly Schema[],
>(first: A, second: B, ...rest: C) {
  return new SchemaTuple<[A, B, ...C]>([first, second, ...rest]);
}
