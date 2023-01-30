import { NextFunction, Request } from 'express';
import { MongoClient } from 'mongodb';
import { AppResponse } from '../shared';

let mongo: MongoClient;

export default function connect() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    if (mongo) {
      res.locals.mongoClient = mongo;
      return next();
    }

    MongoClient.connect(process.env.MONGODB_URL).then((client) => {
      mongo = client;
      res.locals.mongoClient = mongo;
      return next();
    });
  };
}

export function disconnect(): Promise<void> {
  return new Promise<void>((resolve) => {
    mongo.close().then(() => {
      mongo = null;
      resolve();
    });
  });
}
