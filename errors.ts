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
   * Attach new issues to the current `SchemaError`.
   * @returns Same `SchemaError` with new issues.
   */
  attach(...issues: SchemaIssue[]) {
    this.issues.push(...issues);
    return this;
  }

  /**
   * Flatten the stack of issues by returning the non-nested ones.
   * @returns Summarized array of issues.
   */
  flatten() {
    return flatten(this.issues);
  }

  /**
   * Flatten the stack of issues and returns the first one.
   * @returns First issue in the flatten stack.
   */
  first() {
    const [first] = this.flatten();
    return first;
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
