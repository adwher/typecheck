import { Success } from "../schema.ts";
import { isProp } from "../types.ts";

/** Checks `value` as `Success`. */
export function isSuccess<T>(value: unknown): value is Success<T> {
  return isProp<Success<T>>(value, "success") && value.success === true;
}
