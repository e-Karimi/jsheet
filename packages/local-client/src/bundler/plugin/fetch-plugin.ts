import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (inputValue:  string ) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      //TODO => (Handle entryPoints file) If  args.path === "index.js"
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputValue,
        };
      });

      //TODO => If the path has already used and its related data there are in the cache
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cacheResult) {
          return cacheResult;
        }
      });

      //TODO => If it's the first time to use path => fetch the data
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const filteredCssData = data.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${filteredCssData}';
          document.head.appendChild(style);
          `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",

          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
