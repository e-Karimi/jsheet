import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (port: number, filename: string, dir: string, isProduction: boolean) => {
  const app = express();

  //todo: Saving and Fetching cells from the storage file
  app.use(createCellsRouter(filename, dir));

  //todo: Serveing Up React assets
  if (isProduction) {
    //* using "production built files" => in user's machin
    const localClientPath = require.resolve('@jsheet/local-client/build/index.html');
    app.use(express.static(path.dirname(localClientPath)));
  } else {
    //* using "proxy" => When use "CRA" dev server
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  }

  //todo: Saving traffic on port
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
