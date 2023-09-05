/**
 * Transform the `value` to upper case using `.toUpperCase`.
 * @example ```ts
 * const TitleSchema = pipe(string(), toUpperCase());
 * ```
 */
export function toUpperCase() {
  return function (value: string) {
    return value.toUpperCase();
  };
}
