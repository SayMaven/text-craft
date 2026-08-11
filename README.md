# 🎨 text-craft

A lightweight text transformer, terminal colorizer, and CLI utility with zero dependencies.

## Features

- **Case Conversions**: `kebab`, `snake`, `camel`, `pascal`, `title`, `constant`, `dot`, `train`, `sentence`, `mocking`, `slug`.
- **Terminal Colors**: ANSI colors, Hex, RGB, background colors, styles, and smooth gradients.
- **Text Utilities**: Truncate, word wrap, word count, reading time, and Unicode box generator.
- **CLI & Stdin Piping**: Works via `npx text-craft` or command pipes (`echo "text" | npx text-craft slug`).
- **Zero Dependencies**: Lightweight ESM & CommonJS package with full TypeScript support.

---

## Installation

```bash
npm install @saymaven/text-craft
```

---

## Usage

### 1. Library Usage

```typescript
import { 
  toKebabCase, 
  toConstantCase, 
  slugify, 
  red, 
  hex, 
  gradient, 
  truncate, 
  box 
} from "text-craft";

// Case Conversions
console.log(toKebabCase("Hello World"));             // "hello-world"
console.log(toConstantCase("hello world"));          // "HELLO_WORLD"
console.log(slugify("Élégant Text!"));               // "elegant-text"

// Terminal Colors & Gradients
console.log(red("Access Denied"));
console.log(hex("ff007f")("Custom Hex Text"));
console.log(gradient("Gradient Text", ["#ff0055", "#00eeff"]));

// Utilities & Box Frame
console.log(truncate("Hello World Text Craft", 10)); // "Hello W..."
console.log(box("Operation Successful", { title: "INFO", borderStyle: "round" }));
```

### 2. CLI Usage

```bash
# Case Transformations
npx text-craft kebab "Hello World"
npx text-craft slug "Élégant Text!"

# Terminal Colors & Gradients
npx text-craft red "Access Denied"
npx text-craft hex ff007f "Custom Hex"
npx text-craft gradient "Gradient Text" ff0055 00eeff

# Utilities & Box Framing
npx text-craft truncate "Hello World Text Craft" 10
npx text-craft wrap "This is a long sentence that wraps" 15
npx text-craft box "Success" --title="INFO" --style=round
npx text-craft stats "Sample text to analyze"

# Stdin Piping Support
echo "Deep learning algorithms" | npx text-craft slug
```

---

## License

MIT © SayMaven
