import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg-path-plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  //* start Service If it hasn't started yet
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  //* Bundle the data entered
  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      write: false,
      bundle: true,
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
      err: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: "",
        err: error.message,
      };
    } else {
      throw error;
    }
  }
};

export default bundle;
