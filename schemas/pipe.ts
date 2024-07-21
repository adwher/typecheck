import type { Context } from "../context.ts";
import type { Issue } from "../errors.ts";
import {
  type CheckFrom,
  type Failure,
  failure,
  GENERIC_FAILURE,
  type Schema,
  type SchemaFrom,
  success,
} from "../schema.ts";
import { isFailure } from "../utils.ts";

/**
 * Allow to transform the initial `value` and add extra validations with more details to the schemas.
 * @param value Given value of the schema.
 * @param context Context of the current step.
 */
export type Pipe<T> = (value: T, context: Context) => T | Failure;

/** List of multiple schema pipes of the same `T`. */
export type Pipes<T> = Pipe<T extends Schema<infer R> ? R : T>[];

export const SCHEMA_PIPE_NAME = "SCHEMA_PIPE";

export class SchemaPipe<S extends Schema> implements SchemaFrom<S> {
  readonly name = SCHEMA_PIPE_NAME;
  /** List of multiple schema pipes of the same `T`. */
  #pipes: Pipes<S>;

  /**
   * Create a chain of `pipes` once the `schema` return the validated value.
   * @param wrapped Wrapped schema.
   * @param pipes List of multiple schema pipes of the same `T`.
   */
  constructor(readonly wrapped: S, pipes: Pipes<S>) {
    this.#pipes = pipes;
  }

  check(value: unknown, context: Context): CheckFrom<S> {
    const commit = this.wrapped.check(value, context);

    if (isFailure(commit)) {
      return commit;
    }

    let final = commit?.value ?? value;
    const issues: Issue[] = [];

    for (const pipe of this.#pipes) {
      const commit = pipe(final, context);

      if (isFailure(commit) === false) {
        final = commit;
        continue;
      }

      if (context.verbose === false) {
        return GENERIC_FAILURE;
      }

      for (const issue of commit.issues) {
        issues.push(issue);
      }
    }

    if (issues.length === 0) {
      return success(final);
    }

    return failure(issues);
  }
}

/** Create a chain of `pipes` once the `schema` return the validated value. */
export function pipe<S extends Schema>(
  schema: S,
  ...pipes: Pipes<S>
): SchemaPipe<S> {
  return new SchemaPipe(schema, pipes);
}
