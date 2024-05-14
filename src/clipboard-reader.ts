import { showHUD, Clipboard, open, getPreferenceValues } from "@raycast/api";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function main() {
  const DATA = await Clipboard.readText();
  const CSS_URL: string = getPreferenceValues().css;
  if (!DATA) {
    await showHUD("No data in clipboard");
    return;
  }
  const FILE = join("tmp", "raycast_reader.html");
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
