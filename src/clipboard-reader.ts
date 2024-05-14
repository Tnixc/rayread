import { showHUD, Clipboard, open, getPreferenceValues } from "@raycast/api";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function main() {
  const CSS_URL: string = getPreferenceValues().css;
  const FILE = join("tmp", "raycast_reader.html");

  const DATA = await Clipboard.readText();
  if (!DATA) {
    await showHUD("No data in clipboard");
    return;
  }

  const TEMPLATE = `
    <head>
    <title>Raycast Reader</title>
      <link rel="stylesheet" type="text/css" href="${CSS_URL}" />
    </head>
    <body>
    <article class="prose">
    ${DATA}
    </article>
    </body>
    `;
  await writeFile(FILE, TEMPLATE);
  await open(FILE);
}
