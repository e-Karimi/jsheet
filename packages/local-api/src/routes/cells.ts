import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  type: string;
  content: "code" | "text";
}

//Error types
interface NoEntity {
  code: "ENOENT";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    //Type Guards function
    const errorISNoEntity = (err: any): err is NoEntity => {
      return err.code === "ENOENT";
    };

    try {
      //Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      // send list of cells back to the browser
      res.send(JSON.parse(result));
    } catch (err) {
      if (err instanceof Error) {
        if (errorISNoEntity(err)) {
          //Create a file and add default cells
          await fs.writeFile(fullPath, "[]", "utf-8");
          res.send([]);
        } else {
          throw err;
        }
      }
    }
  });

  router.post("/cells", async (req, res) => {
    // Take the list of cells from the request obj

    // Serialize them
    const { cells }: { cells: Cell[] } = req.body;

    //  Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
