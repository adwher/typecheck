import type { Pipe } from "../schemas/pipe.ts";

/**
 * Transform the `value` using `.trim`.
 */
export function toTrimmed(): Pipe<string> {
  return function (value: string) {
    return value.trim();
  };
}
