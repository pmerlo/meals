import { Response } from 'express';
import { Collection, MongoClient } from 'mongodb';

export interface Meal {
  name: string;
  portions: number;
  stock: number;
  date: string;
  ingredients: [Ingredient];
}

export interface Ingredient {
  name: string;
  qty: string;
}

export interface CreateOneResult {
  id: string;
}

export interface AppResponse extends Response {
  locals: {
    mongoClient: MongoClient;
    collection?: Collection<any>;
    errorCode?: ClientErrorCode;
  };
}

export type ClientErrorCode = 'INVALID_ID' | 'SCHEMA_VALIDATION_ERROR';

export interface ClientError {
  errorCode: ClientErrorCode;
  details?: string | object[];
}
