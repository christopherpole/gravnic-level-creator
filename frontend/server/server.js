import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import winston from 'winston';

import App from '../src/app';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const router = express.Router();

router.get('^/$', (req, res) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      winston.error(err.message);
      return res.status(404).end();
    }

    //  Render the app as a string
    const html = ReactDOMServer.renderToString(<App />);

    //  Inject the rendered app into the HTML and send it
    return res.send(htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  });
});

//  Other static resources should just be served as they are
router.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }));

app.use(router);

app.listen(port, err => {
  if (err) {
    winston.error(err.message);
  }

  winston.info(`Listening on ${port}...`);
});
