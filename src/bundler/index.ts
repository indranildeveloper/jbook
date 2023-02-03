import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const bundleCode = async (rawCode: string) => {
  // TODO: run initialize single time
  // await esbuild.initialize({
  //   worker: true,
  //   wasmURL: "https://unpkg.com/esbuild-wasm@0.17.5/esbuild.wasm",
  // });

  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result.outputFiles[0].text;
};

export default bundleCode;
