/**
 * Transform the `value` using `.trim`.
 * @example ```ts
 * const NameSchema = pipe(string(), toTrimmed());
 * ```
 */
export function toTrimmed() {
  return function (value: string) {
    return value.trim();
  };
}
