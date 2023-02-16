import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as child from "child_process";
import process from 'process';

const commitHash = child.execSync("git rev-parse --short HEAD").toString();

process.env.VITE_COMMIT_HASH = commitHash

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
