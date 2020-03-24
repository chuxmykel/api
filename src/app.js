// Packages
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import debug from 'debug';
import 'dotenv/config';

// Directories
import routes from './routes';

const app = express();
const port = process.env.PORT || 4321;
const print = debug('dev');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req, res) => res.status(301).redirect('/api/v1'));

app.use('/api/v1', routes);

app.listen(port, () => {
  print(`Listening on port ${chalk.blue(port)}`);
});

export default app;
