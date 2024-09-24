import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { isEmail } from "./isEmail.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), isEmail());

Deno.test("assert formatted emails", () => {
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

  const incorrect = [
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

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
