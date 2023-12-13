#!/usr/bin/env node
import { serveCommand } from "./commands/serve";

serveCommand.parse(process.argv);
