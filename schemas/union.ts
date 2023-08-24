import { SchemaContext } from "../context.ts";
import { error, SchemaError, SchemaIssue } from "../errors.ts";
import { Schema, SchemaInfer } from "../schema.ts";

export class SchemaUnion<
  S extends [...Schema[]],
  R = SchemaInfer<S[number]>,
> extends Schema<R> {
  /**
   * Create a new schema that receives any of the given schemas.
   * @param schemas List of all posible schemas.
   */
  constructor(private schemas: S) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    const issues: SchemaIssue[] = [];
    const schemas = this.flatten();

    for (const schema of schemas) {
      const output: SchemaError | R = schema.check(value, context);

      if (output instanceof SchemaError) {
        issues.push(...output.issues);
        continue;
      }

      return output;
    }

    return error(context, {
      message: "Must be valid at least one of the specified schemas",
      issues,
    });
  }

  /** Transform the array of schemas applying the `flatten` strategy. */
  flatten(): Schema[] {
    return this.schemas.flatMap((schema) => {
      if (schema instanceof SchemaUnion) {
        return schema.flatten();
      }

      return schema;
    });
  }
}

/**
 * Create a new schema that receives any of the given schemas.
 * @returns A new `SchemaUnion` with the type `A | B | ...`
 */
export function union<
  A extends Schema,
  B extends Schema[],
>(first: A, ...schemas: B) {
  return new SchemaUnion<[A, ...B]>([first, ...schemas]);
}
