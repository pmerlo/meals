import { NextFunction, Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { AppResponse, Recipe } from './types';

let mongo: MongoClient;

export function connectDb() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (mongo) {
      next();
      return;
    }

    MongoClient.connect(process.env.MONGODB_URL).then((client) => {
      mongo = client;
      next();
    });
  };
}

export function setCollection() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals.collection = mongo
      .db(process.env.MONGODB_DB)
      .collection<Recipe>(process.env.MONGODB_COLLECTION);
    next();
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

export function createOne() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    res.locals.collection.insertOne(req.body).then((value) => {
      res.status(201).json({
        _id: value.insertedId,
        ...req.body,
      });
      return next();
    });
  };
}

export function getAll() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    res.locals.collection
      .find()
      .toArray()
      .then((value) => {
        res.status(200).json(value);
        return next();
      });
  };
}

export function getOne() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    res.locals.collection
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((value) => {
        if (value) {
          res.status(200).json(value);
        }
        res.locals.errorCode = 'INVALID_ID';
        return next();
      });
  };
}

export function updateOne() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const update = req.body;
    delete update._id;
    res.locals.collection
      .updateOne(filter, { $set: { ...update } }, { upsert: false })
      .then((value) => {
        if (value.matchedCount === 1) {
          res.status(200).json({ ...filter, ...update });
          return next();
        }
        res.locals.errorCode = 'INVALID_ID';
        return next();
      });
  };
}

export function deleteOne() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    const filter = { _id: new ObjectId(req.params.id) };
    res.locals.collection.deleteOne(filter).then((value) => {
      if (value.deletedCount === 1) {
        res.status(200).json({ deleted: value.acknowledged });
        return next();
      }
      res.locals.errorCode = 'INVALID_ID';
      return next();
    });
  };
}
