import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        // Caching
        // const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // );

        // if (cacheResult) {
        //   return cacheResult;
        // }

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? "css" : "jsx";
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents =
          fileType === "css"
            ? `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style)
        `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
