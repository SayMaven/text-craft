/**
  * Splits any string into individual words by handling spaces, hyphens, underscores, and camelCase transitions.
  */
export function getWords(str: string): string[] {
  if (!str) return [];
  const matches = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g
  );
  return matches || [];
}

/**
 * Converts text to kebab-case (e.g., "Hello World" -> "hello-world")
 */
export function toKebabCase(str: string): string {
  const words = getWords(str);
  return words.map((w) => w.toLowerCase()).join("-");
}

/**
 * Converts text to snake_case (e.g., "Hello World" -> "hello_world")
 */
export function toSnakeCase(str: string): string {
  const words = getWords(str);
  return words.map((w) => w.toLowerCase()).join("_");
}

/**
 * Converts text to camelCase (e.g., "Hello World" -> "helloWorld")
 */
export function toCamelCase(str: string): string {
  const words = getWords(str);
  return words
    .map((w, index) =>
      index === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

/**
 * Converts text to PascalCase (e.g., "Hello World" -> "HelloWorld")
 */
export function toPascalCase(str: string): string {
  const words = getWords(str);
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

/**
 * Converts text to Title Case (e.g., "hello world" -> "Hello World")
 */
export function toTitleCase(str: string): string {
  const words = getWords(str);
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Converts text to CONSTANT_CASE (e.g., "Hello World" -> "HELLO_WORLD")
 */
export function toConstantCase(str: string): string {
  const words = getWords(str);
  return words.map((w) => w.toUpperCase()).join("_");
}

/**
 * Converts text to dot.case (e.g., "Hello World" -> "hello.world")
 */
export function toDotCase(str: string): string {
  const words = getWords(str);
  return words.map((w) => w.toLowerCase()).join(".");
}

/**
 * Converts text to Train-Case (e.g., "hello world" -> "Hello-World")
 */
export function toTrainCase(str: string): string {
  const words = getWords(str);
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("-");
}

/**
 * Converts text to Sentence case (e.g., "hello world" -> "Hello world")
 */
export function toSentenceCase(str: string): string {
  const words = getWords(str);
  if (words.length === 0) return "";
  const joined = words.map((w) => w.toLowerCase()).join(" ");
  return joined.charAt(0).toUpperCase() + joined.slice(1);
}

/**
 * Converts text to mOcKiNg cAsE (e.g., "hello world" -> "hElLo wOrLd")
 */
export function toMockingCase(str: string): string {
  let result = "";
  let upper = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (/[a-zA-Z]/.test(char)) {
      result += upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Converts text into a clean URL-friendly slug (e.g., "Élégant Text!" -> "elegant-text")
 */
export function slugify(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

