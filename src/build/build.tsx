import React from "react";
import { renderToFile } from "@react-pdf/renderer";
import SimpleLayout from "../layout/SimpleLayout.js";


import * as child from "child_process";
import process from 'process';

const commitHash = child.execSync("git rev-parse --short HEAD").toString();

const main = async () => {
  await renderToFile(<SimpleLayout commitHash={commitHash}/>, `${process.cwd()}/.out/resume.pdf`);
};

main();
