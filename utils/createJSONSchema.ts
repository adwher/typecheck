import type { Schema } from "../schema.ts";
import {
  SCHEMA_ARRAY_NAME,
  SCHEMA_BOOLEAN_NAME,
  SCHEMA_CUSTOM_NAME,
  SCHEMA_NEVER_NAME,
  SCHEMA_NUMBER_NAME,
  SCHEMA_OBJECT_NAME,
  SCHEMA_RECORD_NAME,
  SCHEMA_STRING_NAME,
  SCHEMA_TUPLE_NAME,
  SCHEMA_UNKNOWN_NAME,
  SchemaArray,
  SchemaDate,
  SchemaEither,
  SchemaEnumerated,
  SchemaLazy,
  SchemaLiteral,
  SchemaNullable,
  SchemaObject,
  SchemaOptional,
  SchemaPipe,
  SchemaRecord,
  SchemaStrict,
  SchemaTransform,
  SchemaTuple,
} from "../schemas.ts";

export enum JSONSchemaType {
  STRING = "string",
  NUMBER = "number",
  OBJECT = "object",
  ARRAY = "array",
  BOOLEAN = "boolean",
  NULL = "null",
}

export enum JSONSchemaFormat {
  DATETIME = "date-time",
  TIME = "time",
  DATE = "date",
}

export interface JSONSchema {
  /**
   * The `type` keyword is fundamental to JSON Schema. It specifies the data type for a schema.
   * @see https://json-schema.org/understanding-json-schema/reference/type
   */
  type?: JSONSchemaType | JSONSchemaType[];
  /**
   * The `oneOf` keyword is used to restrict a value to a fixed set of values.
   * @see https://json-schema.org/understanding-json-schema/reference/generic.html#oneof
   */
  oneOf?: JSONSchema[];
  /**
   * Describes the purpose of the instance property.
   * @see https://json-schema.org/draft/2020-12/json-schema-validation#name-title-and-description
   */
  description?: string;

  /**
   * The `format` keyword allows for basic semantic validation on certain kinds of string values that are commonly used.
   * @see https://json-schema.org/understanding-json-schema/reference/string#format
   */
  format?: JSONSchemaFormat;
  /**
   * The default keyword provides a default value for undefined object properties.
   * @see https://json-schema.org/understanding-json-schema/reference/object.html#default
   */
  properties?: Record<string, JSONSchema>;
  /**
   * The `additionalProperties` keyword is used to control the handling of extra stuff, that is, properties whose names are not listed in the properties keyword.
   * @see https://json-schema.org/understanding-json-schema/reference/object#additionalproperties
   */
  additionalProperties?: boolean | JSONSchema;
  /**
   * The items keyword defines an array of schemas, each of which is applied to the items in an instance array.
   * @see https://json-schema.org/understanding-json-schema/reference/array.html#items
   */
  items?: JSONSchema;
  /**
   * The `prefixItems` keyword is used to restrict the number of items in an array.
   * @see https://json-schema.org/understanding-json-schema/reference/array#tupleValidation
   */
  prefixItems?: JSONSchema[];
  /**
   * The enum keyword is used to restrict a value to a fixed set of values.
   * @see https://json-schema.org/understanding-json-schema/reference/generic.html#enumerated-values
   */
  enum?: Array<string | number | boolean>;
  /**
   * The required keyword is used to indicate that a particular property must be present.
   * @see https://json-schema.org/learn/getting-started-step-by-step#define-optional-properties
   */
  required?: string[];
}

const SCHEMA_NAME_TYPE: Record<string, JSONSchemaType> = {
  [SCHEMA_ARRAY_NAME]: JSONSchemaType.ARRAY,
  [SCHEMA_BOOLEAN_NAME]: JSONSchemaType.BOOLEAN,
  [SCHEMA_NEVER_NAME]: JSONSchemaType.NULL,
  [SCHEMA_NUMBER_NAME]: JSONSchemaType.NUMBER,
  [SCHEMA_OBJECT_NAME]: JSONSchemaType.OBJECT,
  [SCHEMA_RECORD_NAME]: JSONSchemaType.OBJECT,
  [SCHEMA_STRING_NAME]: JSONSchemaType.STRING,
  [SCHEMA_TUPLE_NAME]: JSONSchemaType.ARRAY,
};

/**
 * Extracts the JSON schema type from a given `schema`.
 * @param schema - The schema to extract the type from.
 * @returns The JSON schema type or an array of JSON schema types.
 */
function extractSchemaType(schema: Schema): JSONSchemaType | JSONSchemaType[] {
  if (schema instanceof SchemaEither) {
    return schema.schemas.map(extractSchemaType);
  }

  if (schema instanceof SchemaEnumerated || schema instanceof SchemaLiteral) {
    return [
      JSONSchemaType.STRING,
      JSONSchemaType.NUMBER,
      JSONSchemaType.BOOLEAN,
    ];
  }

  if (schema instanceof SchemaNullable) {
    return [
      JSONSchemaType.NULL,
      extractSchemaType(schema.schema) as JSONSchemaType,
    ];
  }

  return SCHEMA_NAME_TYPE[schema.name] ?? JSONSchemaType.NULL;
}

/**
 * Converts a given schema object to a [JSON Schema](https://json-schema.org) structure.
 * @param schema - The schema object to convert.
 * @returns The JSON Schema representation of the given schema.
 */
export function createJSONSchema(schema: Schema): JSONSchema {
  const base: JSONSchema = {
    type: extractSchemaType(schema),
  };

  if (schema instanceof SchemaArray) {
    base.items = createJSONSchema(schema.schema);
  }

  if (
    schema.name === SCHEMA_CUSTOM_NAME ||
    schema.name === SCHEMA_UNKNOWN_NAME
  ) {
    throw new Error("Schema is unknown at compile time schema.");
  }

  if (schema instanceof SchemaDate) {
    base.type = JSONSchemaType.STRING;
    base.format = JSONSchemaFormat.DATETIME;
  }

  if (schema instanceof SchemaEnumerated) {
    base.enum = schema.allowed;
  }

  if (schema instanceof SchemaLazy) {
    const generated = schema.generate(undefined, {
      strict: false,
      verbose: false,
    });

    // Generate a JSON schema for the lazy schema.
    return createJSONSchema(generated);
  }

  if (schema instanceof SchemaLiteral) {
    base.enum = [schema.literal];
  }

  if (schema instanceof SchemaObject) {
    const keys = Object.keys(schema.shape);

    const properties: Record<string, JSONSchema> = {};
    const required: string[] = [];

    for (const key of keys) {
      const shape = schema.shape[key];

      properties[key] = createJSONSchema(shape);

      if (shape instanceof SchemaOptional) {
        continue;
      }

      required.push(key);
    }

    base.properties = properties;
    base.required = required;
  }

  if (
    schema instanceof SchemaOptional ||
    schema instanceof SchemaPipe ||
    schema instanceof SchemaStrict ||
    schema instanceof SchemaTransform
  ) {
    // Instance is not part of the JSON Schema standard.
    // Should be added within the `oneOf` field.
    return createJSONSchema(schema.schema);
  }

  if (schema instanceof SchemaRecord) {
    base.additionalProperties = createJSONSchema(schema.schema);
  }

  if (schema instanceof SchemaTuple) {
    base.prefixItems = schema.schemas.map(createJSONSchema);
  }

  return base;
}
