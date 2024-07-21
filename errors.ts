interface IssueBase {
  reason: string;
  /** Stack of issues with more details. */
  issues?: Issue[];
  /** Current `index` or `key` where the issue was generated. */
  position?: unknown;
}

/** Received type is not the expected. */
export const ISSUE_TYPE_REASON = "TYPE";

/** Received type is not the expected. */
export interface IssueType extends IssueBase {
  reason: typeof ISSUE_TYPE_REASON;
  /** The expected type. */
  expected: unknown;
  /** The received type. */
  received?: unknown;
}

export const ISSUE_VALIDATION_REASON = "VALIDATION";

/** Received value does not fulfill the constraint. */
export interface IssueValidation extends IssueBase {
  reason: typeof ISSUE_VALIDATION_REASON;
  /** The validation that was not fulfilled. */
  validation?: string;
  /** The expected value. */
  expected?: unknown;
  /** The received value. */
  received?: unknown;
}

/** Expect one value but no one was received. */
export const ISSUE_MISSING_REASON = "MISSING";

/** Expect one value but no one was received. */
export interface IssueMissing extends IssueBase {
  reason: typeof ISSUE_MISSING_REASON;
}

/** Expect no value but one was received. */
export const ISSUE_PRESENT_REASON = "PRESENT";

/** Expect no value but one was received. */
export interface IssuePresent extends IssueBase {
  reason: typeof ISSUE_PRESENT_REASON;
}

export type Issue = Readonly<
  IssueType | IssueValidation | IssueMissing | IssuePresent
>;
