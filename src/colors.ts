const RESET = "\x1b[0m";

const CODES = {
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  inverse: "\x1b[7m",
  strikethrough: "\x1b[9m",

  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
} as const;

function formatText(code: string, text: string): string {
  return `${code}${text}${RESET}`;
}

export function red(text: string): string {
  return formatText(CODES.red, text);
}

export function green(text: string): string {
  return formatText(CODES.green, text);
}

export function yellow(text: string): string {
  return formatText(CODES.yellow, text);
}

export function blue(text: string): string {
  return formatText(CODES.blue, text);
}

export function magenta(text: string): string {
  return formatText(CODES.magenta, text);
}

export function cyan(text: string): string {
  return formatText(CODES.cyan, text);
}

export function white(text: string): string {
  return formatText(CODES.white, text);
}

export function gray(text: string): string {
  return formatText(CODES.gray, text);
}

export function bold(text: string): string {
  return formatText(CODES.bold, text);
}

export function dim(text: string): string {
  return formatText(CODES.dim, text);
}

export function italic(text: string): string {
  return formatText(CODES.italic, text);
}

export function underline(text: string): string {
  return formatText(CODES.underline, text);
}

export function inverse(text: string): string {
  return formatText(CODES.inverse, text);
}

export function strikethrough(text: string): string {
  return formatText(CODES.strikethrough, text);
}

// Background Colors
export function bgBlack(text: string): string {
  return formatText(CODES.bgBlack, text);
}

export function bgRed(text: string): string {
  return formatText(CODES.bgRed, text);
}

export function bgGreen(text: string): string {
  return formatText(CODES.bgGreen, text);
}

export function bgYellow(text: string): string {
  return formatText(CODES.bgYellow, text);
}

export function bgBlue(text: string): string {
  return formatText(CODES.bgBlue, text);
}

export function bgMagenta(text: string): string {
  return formatText(CODES.bgMagenta, text);
}

export function bgCyan(text: string): string {
  return formatText(CODES.bgCyan, text);
}

export function bgWhite(text: string): string {
  return formatText(CODES.bgWhite, text);
}

/**
 * Creates a text styling function for a specific TrueColor RGB value.
 */
export function rgb(r: number, g: number, b: number) {
  const cleanR = Math.max(0, Math.min(255, Math.floor(r)));
  const cleanG = Math.max(0, Math.min(255, Math.floor(g)));
  const cleanB = Math.max(0, Math.min(255, Math.floor(b)));
  const code = `\x1b[38;2;${cleanR};${cleanG};${cleanB}m`;
  return (text: string): string => formatText(code, text);
}

/**
 * Parses Hex color code (#ff0000 or ff0000 or #f00) and returns a text styling function.
 */
export function hex(hexCode: string) {
  let cleanHex = hexCode.replace(/^#/, "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(cleanHex, 16);
  if (isNaN(num) || cleanHex.length !== 6) {
    return (text: string) => text;
  }

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return rgb(r, g, b);
}

/**
 * Colors each character with a cycling rainbow gradient.
 */
export function rainbow(text: string): string {
  const rainbowCodes = [
    CODES.red,
    CODES.yellow,
    CODES.green,
    CODES.cyan,
    CODES.blue,
    CODES.magenta,
  ];

  let charIndex = 0;
  let result = "";

  for (const char of text) {
    if (/\s/.test(char)) {
      result += char;
      continue;
    }
    const colorCode = rainbowCodes[charIndex % rainbowCodes.length];
    result += `${colorCode}${char}${RESET}`;
    charIndex++;
  }

  return result;
}

/**
 * Smoothly interpolates text characters across a list of colors (Hex or RGB).
 */
export function gradient(
  text: string,
  colors: (string | [number, number, number])[]
): string {
  if (!text || colors.length === 0) return text;
  if (colors.length === 1) {
    const col = typeof colors[0] === "string" ? hex(colors[0]) : rgb(...colors[0]);
    return col(text);
  }

  const rgbColors = colors.map((c) => {
    if (Array.isArray(c)) return c;
    let clean = c.replace(/^#/, "");
    if (clean.length === 3) clean = clean.split("").map((x) => x + x).join("");
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255] as [number, number, number];
  });

  const visibleLength = text.replace(/\s/g, "").length;
  if (visibleLength === 0) return text;

  let result = "";
  let visibleIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/\s/.test(char)) {
      result += char;
      continue;
    }

    const position =
      visibleLength > 1 ? visibleIndex / (visibleLength - 1) : 0;
    const segment = position * (rgbColors.length - 1);
    const index = Math.min(Math.floor(segment), rgbColors.length - 2);
    const factor = segment - index;

    const c1 = rgbColors[index];
    const c2 = rgbColors[index + 1];

    const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
    const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
    const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));

    result += rgb(r, g, b)(char);
    visibleIndex++;
  }

  return result;
}
