import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib"];
const EXTENSIONS = new Set([".ts", ".tsx", ".css"]);
const BAD_PATTERN = /(Ã.|Â.|Ù.|Ø.|ï¿½)/g;

const findings = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;
    inspectFile(fullPath);
  }
}

function inspectFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    BAD_PATTERN.lastIndex = 0;
    if (BAD_PATTERN.test(line)) {
      findings.push({
        filePath,
        line: i + 1,
        text: line.trim().slice(0, 180),
      });
    }
  }
}

for (const root of ROOTS) {
  walk(path.resolve(process.cwd(), root));
}

if (findings.length > 0) {
  console.error("Mojibake-like text detected. Fix encoding before commit:");
  for (const finding of findings) {
    const rel = path.relative(process.cwd(), finding.filePath).replace(/\\/g, "/");
    console.error(`- ${rel}:${finding.line} -> ${finding.text}`);
  }
  process.exit(1);
}

console.log("Text encoding check passed.");

