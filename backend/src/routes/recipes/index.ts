import { Router } from 'express';
import {
  connectDb,
  setCollection,
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from './database';
import { validateBody, handleError } from './hooks';
import { recipeSchema } from './schemas';

export const router: Router = Router();

router.use([connectDb(), setCollection()]);

router.post('/', [validateBody(recipeSchema), createOne()]);
router.get('/', getAll());
router.get('/:id', getOne());
router.put('/:id', [validateBody(recipeSchema), updateOne()]);
router.delete('/:id', [deleteOne()]);

router.use(handleError());

export { disconnect as disconnectDb } from './database';
export * from './types';
