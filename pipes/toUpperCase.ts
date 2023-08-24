import { SchemaPipe } from "../pipes.ts";

/**
 * Transform the `value` to upper case using `.toUpperCase`.
 * @example ```ts
 * const TitleSchema = string(toUpperCase());
 * ```
 */
export function toUpperCase(): SchemaPipe<string> {
  return function (value) {
    return value.toUpperCase();
  };
}
