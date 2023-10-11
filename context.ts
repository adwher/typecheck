export interface SchemaContext {
  /** Exact path of the current context. */
  path: Array<string | number>;
}

/** Create an empty `SchemaContext` ready to use. */
export function createContext(): SchemaContext {
  return { path: [] };
}
