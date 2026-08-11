import { describe, it, expect } from "vitest";
import {
  red,
  green,
  rainbow,
  rgb,
  hex,
  gradient,
  bgRed,
  italic,
  strikethrough,
} from "../src/colors";

describe("ANSI Colors & Formatting", () => {
  it("wraps text in red ANSI code", () => {
    expect(red("Error")).toBe("\x1b[31mError\x1b[0m");
  });

  it("wraps text in background red ANSI code", () => {
    expect(bgRed("Error")).toBe("\x1b[41mError\x1b[0m");
  });

  it("wraps text in italic and strikethrough", () => {
    expect(italic("Italic")).toBe("\x1b[3mItalic\x1b[0m");
    expect(strikethrough("Strike")).toBe("\x1b[9mStrike\x1b[0m");
  });

  it("formats text with rgb()", () => {
    const customRgb = rgb(255, 0, 128);
    expect(customRgb("Pink")).toBe("\x1b[38;2;255;0;128mPink\x1b[0m");
  });

  it("formats text with hex()", () => {
    const customHex = hex("#ff0080");
    expect(customHex("Pink")).toBe("\x1b[38;2;255;0;128mPink\x1b[0m");
  });

  it("formats rainbow text without crashing", () => {
    const output = rainbow("Hello");
    expect(output).toContain("H");
    expect(output).toContain("\x1b[0m");
  });

  it("creates smooth gradient strings", () => {
    const result = gradient("Gradient Text", ["#ff0000", "#00ff00"]);
    expect(result).toContain("\x1b[38;2;");
    expect(result).toContain("G");
  });
});
