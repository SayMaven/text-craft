/**
 * Removes all ANSI escape sequences from a string.
 */
export function stripAnsi(text: string): string {
  if (!text) return "";
  // Matches ANSI escape codes
  return text.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[\()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqa-z]/g,
    ""
  );
}

/**
 * Truncates a string to a specified length and appends a suffix (default: "...").
 */
export function truncate(
  text: string,
  length: number,
  suffix: string = "..."
): string {
  if (!text) return "";
  if (text.length <= length) return text;
  const targetLength = Math.max(0, length - suffix.length);
  return text.slice(0, targetLength) + suffix;
}

/**
 * Counts the number of words in a string.
 */
export function wordCount(text: string): number {
  if (!text) return 0;
  const clean = text.trim();
  if (!clean) return 0;
  return clean.split(/\s+/).length;
}

/**
 * Calculates estimated reading time for a text based on words per minute (default: 200 WPM).
 */
export function readingTime(
  text: string,
  wpm: number = 200
): { minutes: number; words: number; text: string } {
  const words = wordCount(text);
  const minutes = Math.ceil(words / Math.max(1, wpm));
  const timeText = minutes === 1 ? "1 min read" : `${minutes} min read`;
  return { minutes, words, text: timeText };
}

/**
 * Pads a string to a target width with specified alignment ('left', 'center', 'right').
 */
export function pad(
  text: string,
  width: number,
  align: "left" | "center" | "right" = "left",
  char: string = " "
): string {
  const cleanText = stripAnsi(text);
  const visibleLength = cleanText.length;
  if (visibleLength >= width) return text;

  const padChar = char.charAt(0) || " ";
  const totalPadding = width - visibleLength;

  if (align === "right") {
    return padChar.repeat(totalPadding) + text;
  }

  if (align === "center") {
    const leftPad = Math.floor(totalPadding / 2);
    const rightPad = totalPadding - leftPad;
    return padChar.repeat(leftPad) + text + padChar.repeat(rightPad);
  }

  // default 'left'
  return text + padChar.repeat(totalPadding);
}

/**
 * Wraps text to a specified column width.
 */
export function wrap(text: string, width: number = 80): string {
  if (!text || width <= 0) return text;

  const lines = text.split("\n");
  const wrappedLines: string[] = [];

  for (const line of lines) {
    if (line.length <= width) {
      wrappedLines.push(line);
      continue;
    }

    const words = line.split(" ");
    let currentLine = "";

    for (const word of words) {
      if (!currentLine) {
        currentLine = word;
      } else if (currentLine.length + 1 + word.length <= width) {
        currentLine += " " + word;
      } else {
        wrappedLines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      wrappedLines.push(currentLine);
    }
  }

  return wrappedLines.join("\n");
}
