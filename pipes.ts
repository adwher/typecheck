import { SchemaContext } from "./context.ts";
import { error, SchemaError, SchemaIssue } from "./errors.ts";

/** Allow to transform the initial `value` and add extra validations with more details to the schemas. */
export type SchemaPipe<T> = (
  value: T,
  context: SchemaContext,
) => T | SchemaError;

/** List of multiple schema steps of the same `T`. */
export type SchemaPipes<T> = SchemaPipe<T>[];

/** Validate each pipe with the response of a schema validation. */
export function pipeline<T>(
  value: T,
  context: SchemaContext,
  pipes: SchemaPipes<T>,
) {
  const issues: SchemaIssue[] = [];

  let final: T = value;

  for (const pipe of pipes) {
    const output = pipe(final, context);

    if (output instanceof SchemaError) {
      issues.push(...output.issues);
      continue;
    }

    final = output;
  }

  if (issues.length === 0) {
    return final;
  }

  return error(context, { issues });
}
