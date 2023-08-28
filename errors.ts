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

  /**
   * Flatten the stack of issues by returning the non-nested ones.
   * @returns Summarized array of issues.
   */
  flatten() {
    return flatten(this.issues);
  }
}

export function error(
  context: SchemaContext,
  descriptor?: Omit<SchemaIssue, keyof SchemaContext>,
) {
  return new SchemaError({ ...context, ...descriptor });
}

/** Flatten a stack of issues by returning the non-nested ones. */
function flatten(issues: SchemaIssue[]): SchemaIssue[] {
  return issues.flatMap((issue) => {
    const stack = issue.issues ?? [];

    if (stack.length > 0) {
      return flatten(stack);
    }

    return issue;
  });
}
