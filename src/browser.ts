import { BrowserExtension, Toast, environment, getPreferenceValues, open, showHUD, showToast } from "@raycast/api";
import { marked } from "marked";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async () => {
  if (!environment.canAccess(BrowserExtension)) {
    await showToast({ title: "This script requires access to the browser extension", style: Toast.Style.Failure });
    return;
  }
  const CONTENT = await BrowserExtension.getContent({ format: "markdown" });
  const DATA = await marked.parse(CONTENT);
  console.log(DATA);
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
    <article id="container" class="prose">
    ${DATA}
    </article>
    </body>
    `;
  await writeFile(FILE, TEMPLATE);
  await open(FILE);
};
