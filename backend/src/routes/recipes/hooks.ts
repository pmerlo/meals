import { NextFunction, Request } from 'express';
import { AppResponse, ClientError } from './types';
import { validate } from 'jsonschema';

export function validateBody(schema: object) {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    const result = validate(req.body, schema);
    if (result.valid) {
      return next();
    }

    const error: ClientError = {
      errorCode: 'SCHEMA_VALIDATION_ERROR',
      details: result.errors,
    };
    res.status(400).json(error);
  };
}

export function handleError() {
  return (req: Request, res: AppResponse, next: NextFunction) => {
    if (!res.locals.errorCode) {
      return next();
    }
    const error: ClientError = {
      errorCode: res.locals.errorCode,
    };
    if (res.locals.errorCode === 'INVALID_ID') {
      error.details = `Resource does not exist`;
    }
    res.status(404).json(error);
    return next();
  };
}
