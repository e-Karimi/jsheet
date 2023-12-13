import { Command } from "commander";
import { serve } from "@jsheet/local-api";
import path from "path";

//Error types
interface AddressInUseError {
  code: "EADDRINUSE";
}

//Type Guards function
const isAddressInUse = (err: any): err is AddressInUseError => {
  return err.code === "EADDRINUSE";
};

//Whether we are in development or production mode
const isProduction = process.env.NODE_ENV === "production";

//Make a serve command
const serveCommand = new Command();

serveCommand
  .name("serve")
  .command("serve [filename]")
  .description("Open a file for editting")
  .option("-p , --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
   
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, isProduction);
      console.log(
        `Open ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (error) {
      if (error instanceof Error) {
        if (isAddressInUse(error)) {
          console.log("Port is in use. Try running on a different port");
        } else {
          console.log("🔊 Here is the problem :", error.message);
        }
      } else {
        console.log("Error:", error);
      }
    }
  });

export { serveCommand };
