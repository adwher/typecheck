import { SchemaContext } from "./context.ts";

/** Describes one single issue during the process of validation. */
export interface SchemaIssue extends SchemaContext {
  message?: string;
  issues?: SchemaIssue[];
}

/** Used to gather all the issues during the validation phase. */
export class SchemaError extends Error {
  readonly issues: SchemaIssue[];

  constructor(issue: SchemaIssue) {
    super(issue.message);

    this.issues = [issue];
  }
}

export function error(
  context: SchemaContext,
  descriptor?: Omit<SchemaIssue, keyof SchemaContext>,
) {
  return new SchemaError({ ...context, ...descriptor });
}
