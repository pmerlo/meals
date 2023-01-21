import dotenv from 'dotenv';
dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });

import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import errors from './errors';

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  morgan(process.env.MORGAN_CONFIG, {
    skip: () => process.env.NODE_ENV !== 'dev',
  })
);

app.use('/v1', routes());
app.use(errors());

export default app;
