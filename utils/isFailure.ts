import type { Failure } from "../schema.ts";
import { isProp } from "../types.ts";

/** Checks `value` as `Failure`. */
export function isFailure(value: unknown): value is Failure {
  return isProp<Failure>(value, "success") && value.success === false;
}
