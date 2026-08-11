import { describe, it, expect } from "vitest";
import {
  truncate,
  wordCount,
  readingTime,
  stripAnsi,
  pad,
  wrap,
} from "../src/utils";
import { red } from "../src/colors";

describe("Text Utilities", () => {
  it("strips ANSI escape codes", () => {
    const colored = red("Colored Text");
    expect(stripAnsi(colored)).toBe("Colored Text");
  });

  it("truncates text correctly", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
    expect(truncate("Short", 10)).toBe("Short");
  });

  it("counts words accurately", () => {
    expect(wordCount("Hello world text craft")).toBe(4);
    expect(wordCount("")).toBe(0);
  });

  it("calculates reading time", () => {
    const stats = readingTime("word ".repeat(400));
    expect(stats.minutes).toBe(2);
    expect(stats.words).toBe(400);
    expect(stats.text).toBe("2 min read");
  });

  it("pads text with left, right, and center alignment", () => {
    expect(pad("hi", 6, "left")).toBe("hi    ");
    expect(pad("hi", 6, "right")).toBe("    hi");
    expect(pad("hi", 6, "center")).toBe("  hi  ");
  });

  it("wraps text to specified width", () => {
    const text = "This is a long sentence that should be wrapped.";
    const wrapped = wrap(text, 15);
    expect(wrapped.split("\n").length).toBeGreaterThan(1);
  });
});
