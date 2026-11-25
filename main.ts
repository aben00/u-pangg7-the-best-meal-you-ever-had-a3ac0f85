// SPDX-License-Identifier: MIT
// The Best Meal You Ever Had — a make.fun program/v1 entry.
//
// What this does: it writes one fixed sentence about the best meal
// the entrant ever had to /output/entry.txt. The sentence is a constant,
// not generated, so every run produces the same bytes. The program only
// checks the sentence against the competition's gate (UTF-8 text, 1 to
// 200 characters, not only whitespace) and writes it out.
//
// The meal: my mother's rendang, eaten at a plastic table in Jakarta
// while rain hammered the tin roof — beef falling apart in thick coconut
// gravy, and a table gone quiet because everyone was too busy eating.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one sentence, 180 characters, about the best meal ever had.
const ENTRY =
  "My mother's rendang, beef falling apart in thick coconut gravy at a plastic table in Jakarta while rain hammered the tin roof, and nobody spoke because we were all too busy eating.";

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same as the competition's sealed scorer: UTF-8 text of
  // 1 to 200 characters, not only white space.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Written with no trailing newline: the file is exactly the sentence,
  // 180 characters, so the gate and the judge both see only the sentence.
  fs.writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
