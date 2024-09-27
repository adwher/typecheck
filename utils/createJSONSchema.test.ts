import { assertObjectMatch } from "@std/assert";

import {
  array,
  date,
  either,
  enumerated,
  literal,
  nullable,
  number,
  object,
  optional,
  pipe,
  record,
  string,
  transform,
  tuple,
} from "../schemas.ts";

import {
  createJSONSchema,
  JSONSchemaFormat,
  JSONSchemaType,
} from "./createJSONSchema.ts";

Deno.test("string should generate JSON JSON schema", () => {
  const schema = string();
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, { type: JSONSchemaType.STRING });
});

Deno.test("number should generate JSON schema", () => {
  const schema = number();
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, { type: JSONSchemaType.NUMBER });
});

Deno.test("array should generate JSON schema", () => {
  const schema = array(string());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: JSONSchemaType.ARRAY,
    items: { type: JSONSchemaType.STRING },
  });
});

Deno.test("date should generate JSON schema", () => {
  const schema = date();
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: JSONSchemaType.STRING,
    format: JSONSchemaFormat.DATETIME,
  });
});

Deno.test("enumerated should generate JSON schema", () => {
  const schema = enumerated("value1", "value2");
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: [
      JSONSchemaType.STRING,
      JSONSchemaType.NUMBER,
      JSONSchemaType.BOOLEAN,
    ],
    enum: ["value1", "value2"],
  });
});

Deno.test("enumerated should generate JSON schema", () => {
  const schema = either(string(), number());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: [
      JSONSchemaType.STRING,
      JSONSchemaType.NUMBER,
    ],
  });
});

Deno.test("literal should generate JSON schema", () => {
  const schema = literal("literalValue");
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: [
      JSONSchemaType.STRING,
      JSONSchemaType.NUMBER,
      JSONSchemaType.BOOLEAN,
    ],
    enum: ["literalValue"],
  });
});

Deno.test("optional should generate JSON schema", () => {
  const schema = optional(string());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, { type: JSONSchemaType.STRING });
});

Deno.test("object should generate JSON schema", () => {
  const schema = object({
    key1: string(),
    key2: optional(number()),
  });

  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: JSONSchemaType.OBJECT,
    properties: {
      key1: { type: JSONSchemaType.STRING },
      key2: { type: JSONSchemaType.NUMBER },
    },
    required: ["key1"],
  });
});

Deno.test("record should generate JSON schema", () => {
  const schema = record(string());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: JSONSchemaType.OBJECT,
    additionalProperties: { type: JSONSchemaType.STRING },
  });
});

Deno.test("tuple should generate JSON schema", () => {
  const schema = tuple(string(), number());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: JSONSchemaType.ARRAY,
    prefixItems: [{ type: JSONSchemaType.STRING }, {
      type: JSONSchemaType.NUMBER,
    }],
  });
});

Deno.test("nullable should generate JSON schema", () => {
  const schema = nullable(string());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, {
    type: [JSONSchemaType.NULL, JSONSchemaType.STRING],
  });
});

Deno.test("pipe should return wrapped JSON schema", () => {
  const schema = pipe(string());
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, { type: JSONSchemaType.STRING });
});

Deno.test("transform should return wrapped JSON schema", () => {
  const schema = transform(string(), (value) => value.length);
  const jsonSchema = createJSONSchema(schema);

  assertObjectMatch(jsonSchema, { type: JSONSchemaType.STRING });
});
