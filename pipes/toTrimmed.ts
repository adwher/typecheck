/**
 * Transform the `value` using `.trim`.
 */
export function toTrimmed() {
  return function (value: string) {
    return value.trim();
  };
}
