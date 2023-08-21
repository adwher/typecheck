import { literal } from "./literal.ts";
import { union } from "./union.ts";

type Enumerable = string | number;

/**
 * Creates a new enumerated schema that only receives the given `options`.
 * This is a alias to use `union` and `literal` to generate the same schema.
 * @example ```
 * const RoleSchema = enumerated("Student", "Teacher", "Administrator");
 * ```
 */
export function enumerated<E extends Enumerable[]>(...options: E) {
  const [first, ...rest] = options.map(literal<E[number]>);

  return union(first, ...rest);
}

/** Alias of {@link enumerated}. */
export const options = enumerated;
