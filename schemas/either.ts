import { SchemaContext } from "../context.ts";
import { createError, SchemaError, SchemaIssue } from "../errors.ts";
import { Infer, Schema, SchemaFrom } from "../schema.ts";

export class SchemaEither<
  S extends readonly Schema[],
> extends SchemaFrom<S[number]> {
  /**
   * Create a new schema that receives any of the given schemas.
   * @param schemas List of all posible schemas.
   */
  constructor(readonly schemas: S) {
    super();
  }

  check(value: unknown, context: SchemaContext) {
    type R = Infer<S[number]>;

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

    const message = "Must be valid at least one of the specified schemas";
    return createError(context, { message, issues });
  }

  /** Transform the array of schemas applying the `flatten` strategy. */
  private flatten(): Schema[] {
    return this.schemas.flatMap((schema) => {
      if (schema instanceof SchemaEither) {
        return schema.flatten();
      }

      return schema;
    });
  }
}

/**
 * Create a new schema that receives any of the given schemas.
 * @returns A new `SchemaEither` with the type `A | B | ...`
 */
export function either<
  A extends Schema,
  B extends Schema[],
>(first: A, ...schemas: B) {
  return new SchemaEither<[A, ...B]>([first, ...schemas]);
}

/** Alias of `either`. */
export const or = either;
