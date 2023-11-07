/**
 * Transform the `value` to upper case using `.toUpperCase`.
 */
export function toUpperCase() {
  return function (value: string) {
    return value.toUpperCase();
  };
}
