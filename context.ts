export interface SchemaContext {
  /** Exact path of the current context. */
  path: Array<string | number>;
  /**
   * Strictify the validations of some of the schemas like: strip out unrecognized keys during parsing.
   */
  strict?: boolean;
}
