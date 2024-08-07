import type { Context } from "../context.ts";
import type { Issue } from "../errors.ts";
import { type Check, failure, type Infer, type Schema } from "../schema.ts";

export const SCHEMA_EITHER_NAME = "SCHEMA_EITHER";

const ISSUE_VALIDATION = failure({ reason: "VALIDATION" });

/** @internal Shortcut to the schema inference. */
type ThisInfer<S extends readonly Schema[]> = Infer<S[number]>;

/** @internal Shortcut to the schema extension. */
type ThisFrom<S extends readonly Schema[]> = Schema<ThisInfer<S>>;

/**
 * Create a new schema that receives any of the given `schemas`.
 */
export class SchemaEither<S extends readonly Schema[]> implements ThisFrom<S> {
  readonly name = SCHEMA_EITHER_NAME;

  /**
   * Create a new schema that receives any of the given schemas.
   * @param schemas List of all possible schemas.
   */
  constructor(readonly schemas: S) {
  }

  check(value: unknown, context: Context): Check<ThisInfer<S>> {
    const issues: Issue[] = [];
    const schemas = this.#flatten();

    for (const schema of schemas) {
      const commit = schema.check(value, context);

      if (commit === undefined) {
        return undefined;
      }

      if (commit.success === true) {
        return commit;
      }

      if (context.verbose === false) {
        return ISSUE_VALIDATION;
      }

      issues.push({
        reason: "VALIDATION",
        issues: commit.issues,
      });
    }

    return failure(issues);
  }

  /** Transform the array of schemas applying the `flatten` strategy. */
  #flatten(): Schema[] {
    return this.schemas.flatMap((schema) => {
      if (schema instanceof SchemaEither) {
        return schema.#flatten();
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
>(first: A, ...other: B): SchemaEither<[A, ...B]> {
  const schemas: [A, ...B] = [first, ...other];
  return new SchemaEither(schemas);
}
