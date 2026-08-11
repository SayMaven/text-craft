import { describe, it, expect } from "vitest";
import {
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  toTitleCase,
  toConstantCase,
  toDotCase,
  toTrainCase,
  toSentenceCase,
  toMockingCase,
  slugify,
} from "../src/cases";

describe("Text Case Transformations", () => {
  it("converts to kebab-case correctly", () => {
    expect(toKebabCase("Hello World")).toBe("hello-world");
    expect(toKebabCase("helloWorld")).toBe("hello-world");
    expect(toKebabCase("Hello_World-Test")).toBe("hello-world-test");
  });

  it("converts to snake_case correctly", () => {
    expect(toSnakeCase("Hello World")).toBe("hello_world");
    expect(toSnakeCase("kebab-case-text")).toBe("kebab_case_text");
  });

  it("converts to camelCase correctly", () => {
    expect(toCamelCase("Hello World")).toBe("helloWorld");
    expect(toCamelCase("kebab-case-text")).toBe("kebabCaseText");
  });

  it("converts to PascalCase correctly", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
    expect(toPascalCase("snake_case_text")).toBe("SnakeCaseText");
  });

  it("converts to Title Case correctly", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
    expect(toTitleCase("kebab-case-text")).toBe("Kebab Case Text");
  });

  it("converts to CONSTANT_CASE correctly", () => {
    expect(toConstantCase("hello world")).toBe("HELLO_WORLD");
    expect(toConstantCase("kebab-case-text")).toBe("KEBAB_CASE_TEXT");
  });

  it("converts to dot.case correctly", () => {
    expect(toDotCase("Hello World")).toBe("hello.world");
  });

  it("converts to Train-Case correctly", () => {
    expect(toTrainCase("hello world")).toBe("Hello-World");
  });

  it("converts to Sentence case correctly", () => {
    expect(toSentenceCase("hello world")).toBe("Hello world");
  });

  it("converts to mOcKiNg cAsE correctly", () => {
    expect(toMockingCase("hello")).toBe("hElLo");
  });

  it("creates URL-safe slugify output correctly", () => {
    expect(slugify("Élégant Text & Special #Char!")).toBe("elegant-text-special-char");
  });
});
