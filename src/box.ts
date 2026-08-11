import { stripAnsi, pad } from "./utils";

export interface BoxOptions {
  padding?: number;
  margin?: number;
  borderStyle?: "single" | "double" | "round" | "bold";
  title?: string;
  borderColor?: (text: string) => string;
}

const BORDER_STYLES = {
  single: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    horizontal: "─",
    vertical: "│",
  },
  double: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    horizontal: "═",
    vertical: "║",
  },
  round: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    horizontal: "─",
    vertical: "│",
  },
  bold: {
    topLeft: "┏",
    topRight: "┓",
    bottomLeft: "┗",
    bottomRight: "┛",
    horizontal: "━",
    vertical: "┃",
  },
};

/**
 * Renders text inside a formatted ASCII/Unicode box.
 */
export function box(text: string, options: BoxOptions = {}): string {
  const padding = options.padding ?? 1;
  const margin = options.margin ?? 0;
  const styleKey = options.borderStyle ?? "single";
  const border = BORDER_STYLES[styleKey] || BORDER_STYLES.single;
  const colorize = options.borderColor || ((str: string) => str);

  const rawLines = text.split("\n");
  const maxContentLength = Math.max(
    ...rawLines.map((line) => stripAnsi(line).length),
    options.title ? stripAnsi(options.title).length + 4 : 0
  );

  const innerWidth = maxContentLength + padding * 2;

  // Build top border (with optional title)
  let topBorder = "";
  if (options.title) {
    const cleanTitle = ` ${options.title} `;
    const titleLen = stripAnsi(cleanTitle).length;
    const remaining = innerWidth - titleLen;
    const leftBarLen = Math.max(1, Math.floor(remaining / 2));
    const rightBarLen = Math.max(1, remaining - leftBarLen);

    topBorder =
      border.topLeft +
      border.horizontal.repeat(leftBarLen) +
      cleanTitle +
      border.horizontal.repeat(rightBarLen) +
      border.topRight;
  } else {
    topBorder =
      border.topLeft + border.horizontal.repeat(innerWidth) + border.topRight;
  }

  const bottomBorder =
    border.bottomLeft +
    border.horizontal.repeat(innerWidth) +
    border.bottomRight;

  const emptyLine =
    colorize(border.vertical) +
    " ".repeat(innerWidth) +
    colorize(border.vertical);

  const resultLines: string[] = [];

  // Add margin top
  for (let m = 0; m < margin; m++) {
    resultLines.push("");
  }

  // Top border
  resultLines.push(colorize(topBorder));

  // Top padding lines
  for (let p = 0; p < padding; p++) {
    resultLines.push(emptyLine);
  }

  // Content lines
  for (const line of rawLines) {
    const paddedContent = pad(line, maxContentLength, "left");
    const fullLine =
      colorize(border.vertical) +
      " ".repeat(padding) +
      paddedContent +
      " ".repeat(padding) +
      colorize(border.vertical);
    resultLines.push(fullLine);
  }

  // Bottom padding lines
  for (let p = 0; p < padding; p++) {
    resultLines.push(emptyLine);
  }

  // Bottom border
  resultLines.push(colorize(bottomBorder));

  // Add margin bottom
  for (let m = 0; m < margin; m++) {
    resultLines.push("");
  }

  return resultLines.join("\n");
}
