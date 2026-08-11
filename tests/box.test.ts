import { describe, it, expect } from "vitest";
import { box } from "../src/box";
import { stripAnsi } from "../src/utils";

describe("Box Generator", () => {
  it("renders a single border box around text", () => {
    const output = box("Hello");
    const clean = stripAnsi(output);
    expect(clean).toContain("┌");
    expect(clean).toContain("┐");
    expect(clean).toContain("Hello");
    expect(clean).toContain("└");
    expect(clean).toContain("┘");
  });

  it("renders round and double borders with title", () => {
    const roundOutput = stripAnsi(box("Info", { borderStyle: "round", title: "TITLE" }));
    expect(roundOutput).toContain("╭");
    expect(roundOutput).toContain("TITLE");
    expect(roundOutput).toContain("Info");

    const doubleOutput = stripAnsi(box("Alert", { borderStyle: "double" }));
    expect(doubleOutput).toContain("╔");
    expect(doubleOutput).toContain("║");
  });
});
