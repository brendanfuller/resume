import React from "react";
import { renderToFile } from "@react-pdf/renderer";
import Simplex from "../layout/Simplex.js";

import path from "path";
import process from "process";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
  await renderToFile(<Simplex />, `${process.cwd()}/.out/resume.pdf`);
};

main();
