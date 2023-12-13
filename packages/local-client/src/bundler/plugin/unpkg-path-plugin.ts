import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //TODO => (Handle entryPoints file) If  args.path === "index.js"
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      //TODO => (Handle relative paths in module) If args.path.startsWith("./") || ("../")
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        const { href } = new URL(args.path, "https://www.unpkg.com" + args.resolveDir + "/");
        return { path: href, namespace: "a" };
      });

      //TODO => (Handle index path in module) ex: 'axios'
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `https://www.unpkg.com/${args.path}`, namespace: "a" };
      });
    },
  };
};
