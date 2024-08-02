import type { Issue } from "../errors.ts";
import type { Schema } from "../schema.ts";

/**
 * Represents an error that occurs when parsing a value.
 */
export class ParseError extends Error {
  readonly name = "ParseError";
  readonly issues: Issue[];

  /**
   * Creates a new instance of the ParseError class.
   * @param issues An array of issues encountered during parsing.
   */
  constructor(issues: Issue[]) {
    super("Failed to parse the value.");

    this.issues = issues;
  }
}

/**
 * Parse the `value` with the given `schema` and return the result.
 * @throws An {@linkcode ParseError} in cases where the `value` does not satisfies the `schema`.
 * @returns Parsed `value` with the given `schema`.
 */
export function parse<T>(value: unknown, schema: Schema<T>): T {
  const commit = schema.check(value, { verbose: true, strict: false });

  if (commit === undefined) {
    return value as T;
  }

  if (commit.success === false) {
    throw new ParseError(commit.issues);
  }

  return commit.value;
}
