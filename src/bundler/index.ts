import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let waiting: Promise<void>;

export const initializeBundle = async () => {
  waiting = esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.17.6/esbuild.wasm",
  });
};

const bundleCode = async (rawCode: string) => {
  await waiting;
  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: "",
        error: error.message,
      };
    } else {
      throw error;
    }
  }
};

export default bundleCode;
