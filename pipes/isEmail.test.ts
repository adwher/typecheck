import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { pipe, string } from "../schemas/mod.ts";
import { createContext } from "../context.ts";
import { isEmail } from "./isEmail.ts";

const context = createContext();

Deno.test("should assert emails formats", () => {
  const schema = pipe(string(), isEmail());

  const correct = [
    `name@domain.com`,
    `name@sub.domain.com`,
    `name@sub.domain.com.co`,
    `firstname.lastname@domain.com`,
    `123456@domain.com`,
    `disposable.email+symbol@example.com`,
    `name@large-domain.com`,
    `name-@domain.com`,
    `a@b.cd`,
  ];

  const invalid = [
    ``,
    `plaintext`,
    `name@double..com`,
    `name@@double.com`,
    `name@190.0.0.1`,
    `name@190.0.0.1`,
    `email.domain.com`,
    `@domain.com`,
    `Joe Smith <joe@domain.com>`,
    `Joe Smith: joe@domain.com`,
  ];

  for (const email of correct) {
    assertEquals(schema.check(email, context), email);
  }

  for (const email of invalid) {
    assertIsError(schema.check(email, context));
  }
});
