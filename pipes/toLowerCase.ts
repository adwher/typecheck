import type { Pipe } from "../schemas/pipe.ts";

/**
 * Transform the `value` to lower case using `.toLowerCase`.
 */
export function toLowerCase(): Pipe<string> {
  return function (value: string) {
    return value.toLowerCase();
  };
}
