/**
 * Represents the context for type checking.
 */
export interface Context {
  /**
   * Skip the accumulation of issues during execution-time.
   * @default false
   */
  verbose: boolean;
}
