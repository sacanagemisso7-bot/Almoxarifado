import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

function listFiles(dir) {
  const files = [];

  for (const item of readdirSync(dir)) {
    const fullPath = join(dir, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...listFiles(fullPath));
      continue;
    }

    if (item.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = listFiles("src");
let hasError = false;

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`Arquivos verificados: ${files.length}`);
