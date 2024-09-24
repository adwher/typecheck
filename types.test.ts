import { assert } from "@std/assert";

import {
  isArr,
  isBool,
  isDate,
  isErr,
  isFn,
  isNum,
  isObj,
  isPromiseLike,
  isProp,
  isStr,
} from "./types.ts";

Deno.test("isStr", () => {
  assert(isStr("Hello"));
  assert(!isStr(123));
});

Deno.test("isNum", () => {
  assert(isNum(123));
  assert(!isNum("Hello"));
});

Deno.test("isBool", () => {
  assert(isBool(true));
  assert(isBool(false));
  assert(!isBool("true"));
});

Deno.test("isFn", () => {
  assert(isFn(() => {}));
  assert(!isFn(123));
});

Deno.test("isObj", () => {
  assert(isObj({}));
  assert(!isObj(null));
  assert(!isObj([]));
});

Deno.test("isProp", () => {
  assert(isProp({ key: "value" }, "key"));
  assert(!isProp({ key: "value" }, "nonexistent"));
});

Deno.test("isArr", () => {
  assert(isArr([]));
  assert(isArr([1, 2, 3]));
  assert(!isArr("not an array"));
});

Deno.test("isErr", () => {
  assert(isErr(new Error("error")));
  assert(!isErr("error"));
});

Deno.test("isDate", () => {
  assert(isDate(new Date()));
  assert(!isDate("2024-01-01"));
});

Deno.test("isPromiseLike", () => {
  assert(isPromiseLike(Promise.resolve()));
  assert(isPromiseLike({ then: () => {} }));
  assert(!isPromiseLike({}));
});
