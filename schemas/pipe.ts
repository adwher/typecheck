import { Context } from "../context.ts";
import { Issue } from "../errors.ts";
import { Failure, failure, Schema, SchemaFrom, success } from "../schema.ts";
import { isFailure } from "../utils/mod.ts";

/**
 * Allow to transform the initial `value` and add extra validations with more details to the schemas.
 * @param value Given value of the schema.
 * @param context Context of the current step.
 */
export type Pipe<T> = (value: T, context: Context) => T | Failure;

/** List of multiple schema pipes of the same `T`. */
export type Pipes<T> = Pipe<T extends Schema<infer R> ? R : T>[];

export const SCHEMA_PIPE_NAME = "SCHEMA_PIPE";

const ISSUE_GENERIC = failure();

export class SchemaPipe<S extends Schema> implements SchemaFrom<S> {
  readonly name = SCHEMA_PIPE_NAME;

  /**
   * Create a chain of `pipes` once the `schema` return the validated value.
   * @param wrapped Wrapped schema.
   * @param pipes List of multiple schema pipes of the same `T`.
   */
  constructor(readonly wrapped: S, private pipes: Pipes<S>) {}

  check(value: unknown, context: Context) {
    const commit = this.wrapped.check(value, context);

    if (isFailure(commit)) {
      return commit;
    }

    let final = commit?.value ?? value;
    const issues: Issue[] = [];

    for (const pipe of this.pipes) {
      const commit = pipe(final, context);

      if (isFailure(commit) === false) {
        final = commit;
        continue;
      }

      if (context.verbose === false) {
        return ISSUE_GENERIC;
      }

      issues.push({ reason: "VALIDATION", issues: commit.issues });
    }

    if (issues.length === 0) {
      return success(final);
    }

    return failure(issues);
  }
}

/** Create a chain of `pipes` once the `schema` return the validated value. */
export function pipe<S extends Schema>(schema: S, ...pipes: Pipes<S>) {
  return new SchemaPipe<S>(schema, pipes);
}
