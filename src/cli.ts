#!/usr/bin/env node
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
} from "./cases";
import {
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bold,
  dim,
  italic,
  underline,
  strikethrough,
  bgRed,
  bgGreen,
  bgBlue,
  rainbow,
  gradient,
  hex,
} from "./colors";
import { truncate, wordCount, readingTime, wrap } from "./utils";
import { box } from "./box";

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve("");
      return;
    }

    let data = "";
    let timer: NodeJS.Timeout;

    const onData = (chunk: string) => {
      data += chunk;
    };

    const onEnd = () => {
      clearTimeout(timer);
      resolve(data.trim());
    };

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", onData);
    process.stdin.once("end", onEnd);

    // Safety timeout if stdin remains open without sending data
    timer = setTimeout(() => {
      process.stdin.removeListener("data", onData);
      process.stdin.removeListener("end", onEnd);
      resolve(data.trim());
    }, 50);
  });
}

function showHelp() {
  console.log(`
${bold(rainbow("✨ text-craft CLI ✨"))}
A powerful, lightweight text transformer, terminal colorizer, and utility suite.

${bold("USAGE:")}
  npx text-craft <command> [text] [options]
  echo "some text" | npx text-craft <command>

${bold("CASE TRANSFORM COMMANDS:")}
  kebab      hello-world
  snake      hello_world
  camel      helloWorld
  pascal     HelloWorld
  title      Hello World
  constant   HELLO_WORLD
  dot        hello.world
  train      Hello-World
  sentence   Hello world
  mocking    hElLo wOrLd
  slug       url-friendly-slug

${bold("COLOR & STYLE COMMANDS:")}
  red, green, yellow, blue, magenta, cyan, white, gray
  bgred, bggreen, bgblue
  bold, dim, italic, underline, strikethrough
  rainbow    Cycling multi-color rainbow
  gradient   Gradient effect (npx text-craft gradient "text" ff0000 00ff00)
  hex        Custom hex color (npx text-craft hex ff007f "text" or npx text-craft hex "#ff007f" "text")

${bold("UTILITY COMMANDS:")}
  box        Render boxed text (npx text-craft box "Hello" --title="INFO" --style=double)
  truncate   Truncate text (npx text-craft truncate "Text" 10 or --length=10)
  wrap       Word wrap text (npx text-craft wrap "Long line..." 20 or --width=20)
  stats      Display word count and reading time (npx text-craft stats "Sample text")

${bold("EXAMPLES:")}
  npx text-craft truncate "Hello World Text Craft" 10
  npx text-craft wrap "This is a very long text sentence that will wrap" 15
  npx text-craft hex ff007f "Halo"
  npx text-craft gradient "Welcome to text-craft CLI!" ff0055 00eeff
  npx text-craft box "Operation Successful" --title="SUCCESS" --style=round
  echo "Deep learning algorithms" | npx text-craft slug
`);
}

async function run() {
  const args = process.argv.slice(2);
  if (
    (args.length === 0 && process.stdin.isTTY) ||
    args.includes("--help") ||
    args.includes("-h") ||
    args[0] === "help"
  ) {
    showHelp();
    return;
  }

  const command = (args[0] || "").toLowerCase();

  // Extract flag options if present
  let rawTextArgs = args.slice(1);
  let title: string | undefined;
  let style: "single" | "double" | "round" | "bold" = "single";

  rawTextArgs = rawTextArgs.filter((arg) => {
    if (arg.startsWith("--title=")) {
      title = arg.split("=")[1];
      return false;
    }
    if (arg.startsWith("--style=")) {
      const s = arg.split("=")[1] as any;
      if (["single", "double", "round", "bold"].includes(s)) {
        style = s;
      }
      return false;
    }
    return true;
  });

  let textFromArgs = rawTextArgs.join(" ").trim();
  let stdinText = "";
  if (!textFromArgs && !process.stdin.isTTY) {
    stdinText = await readStdin();
  }

  const text = (textFromArgs || stdinText).trim();

  if (!text && command !== "help") {
    console.log(red(`\nError: No text input provided for command '${command}'.`));
    if (command === "hex" || command === "gradient") {
      console.log(yellow(`Tip: Unquoted '#' in PowerShell/Bash starts a shell comment.`));
      console.log(`Try omitting '#' or putting quotes around the hex code:`);
      console.log(`  npx text-craft hex ff007f "your text"`);
      console.log(`  npx text-craft hex "#ff007f" "your text"\n`);
    } else {
      console.log(`Usage: ${cyan(`npx text-craft ${command} "your text here"`)}`);
      console.log(`   or: ${cyan(`echo "your text" | npx text-craft ${command}`)}\n`);
    }
    process.exit(1);
  }

  switch (command) {
    // Case commands
    case "kebab":
      console.log(toKebabCase(text));
      break;
    case "snake":
      console.log(toSnakeCase(text));
      break;
    case "camel":
      console.log(toCamelCase(text));
      break;
    case "pascal":
      console.log(toPascalCase(text));
      break;
    case "title":
      console.log(toTitleCase(text));
      break;
    case "constant":
      console.log(toConstantCase(text));
      break;
    case "dot":
      console.log(toDotCase(text));
      break;
    case "train":
      console.log(toTrainCase(text));
      break;
    case "sentence":
      console.log(toSentenceCase(text));
      break;
    case "mocking":
      console.log(toMockingCase(text));
      break;
    case "slug":
      console.log(slugify(text));
      break;

    // Color commands
    case "red":
      console.log(red(text));
      break;
    case "green":
      console.log(green(text));
      break;
    case "yellow":
      console.log(yellow(text));
      break;
    case "blue":
      console.log(blue(text));
      break;
    case "magenta":
      console.log(magenta(text));
      break;
    case "cyan":
      console.log(cyan(text));
      break;
    case "white":
      console.log(white(text));
      break;
    case "gray":
      console.log(gray(text));
      break;
    case "bgred":
      console.log(bgRed(text));
      break;
    case "bggreen":
      console.log(bgGreen(text));
      break;
    case "bgblue":
      console.log(bgBlue(text));
      break;
    case "bold":
      console.log(bold(text));
      break;
    case "dim":
      console.log(dim(text));
      break;
    case "italic":
      console.log(italic(text));
      break;
    case "underline":
      console.log(underline(text));
      break;
    case "strikethrough":
      console.log(strikethrough(text));
      break;
    case "rainbow":
      console.log(rainbow(text));
      break;

    case "hex": {
      const hexCode = rawTextArgs[0];
      const targetText = rawTextArgs.slice(1).join(" ") || stdinText;
      if (!hexCode || !targetText) {
        console.log(red(`\nError: 'hex' command requires a hex color and text.`));
        console.log(`Usage: ${cyan('npx text-craft hex ff007f "Your Text"')}`);
        console.log(`   or: ${cyan('npx text-craft hex "#ff007f" "Your Text"')}\n`);
        process.exit(1);
      }
      console.log(hex(hexCode)(targetText));
      break;
    }

    case "gradient": {
      // Extract hex color codes from args
      const hexArgs: string[] = [];
      const wordArgs: string[] = [];
      for (const arg of rawTextArgs) {
        if (/^#?[0-9a-fA-F]{3,6}$/.test(arg)) {
          hexArgs.push(arg);
        } else {
          wordArgs.push(arg);
        }
      }
      const targetText = wordArgs.join(" ") || stdinText;
      const colors = hexArgs.length > 0 ? hexArgs : ["#ff007f", "#00f0ff"];
      console.log(gradient(targetText, colors));
      break;
    }

    // Utility commands
    case "box":
      console.log(box(text, { title, borderStyle: style }));
      break;

    case "truncate": {
      let len = 20;
      let targetText = stdinText;

      const flagLen = rawTextArgs.find((a) => a.startsWith("--length=") || a.startsWith("-l="));
      if (flagLen) {
        len = parseInt(flagLen.split("=")[1], 10) || 20;
        targetText = rawTextArgs.filter((a) => !a.startsWith("--length=") && !a.startsWith("-l=")).join(" ") || stdinText;
      } else {
        const lastNum = parseInt(rawTextArgs[rawTextArgs.length - 1], 10);
        if (!isNaN(lastNum)) {
          len = lastNum;
          targetText = rawTextArgs.slice(0, -1).join(" ") || stdinText;
        } else {
          targetText = rawTextArgs.join(" ") || stdinText;
        }
      }

      console.log(truncate(targetText, len));
      break;
    }

    case "wrap": {
      let width = 40;
      let targetText = stdinText;

      const flagWidth = rawTextArgs.find((a) => a.startsWith("--width=") || a.startsWith("-w="));
      if (flagWidth) {
        width = parseInt(flagWidth.split("=")[1], 10) || 40;
        targetText = rawTextArgs.filter((a) => !a.startsWith("--width=") && !a.startsWith("-w=")).join(" ") || stdinText;
      } else {
        const lastNum = parseInt(rawTextArgs[rawTextArgs.length - 1], 10);
        if (!isNaN(lastNum)) {
          width = lastNum;
          targetText = rawTextArgs.slice(0, -1).join(" ") || stdinText;
        } else {
          targetText = rawTextArgs.join(" ") || stdinText;
        }
      }

      console.log(wrap(targetText, width));
      break;
    }

    case "stats": {
      const count = wordCount(text);
      const read = readingTime(text);
      console.log(
        box(
          `${bold("Text Statistics:")}\nWord Count: ${cyan(
            count.toString()
          )}\nEstimated Reading Time: ${green(read.text)}`,
          { title: "STATS", borderStyle: "round" }
        )
      );
      break;
    }

    default:
      console.log(red(`\nUnknown command: '${command}'`));
      console.log(`Run ${cyan("npx text-craft --help")} to see all available commands.\n`);
      process.exit(1);
  }
}

run();
