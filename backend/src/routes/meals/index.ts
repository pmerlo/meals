import { Router } from 'express';
import {
  setCollection,
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from './database';
import { insertModified, validateBody, handleError } from './hooks';
import { mealSchema } from './schemas';

export const router: Router = Router();

router.use(setCollection());

router.post('/', [validateBody(mealSchema), createOne()]);
router.get('/', getAll());
router.get('/:id', getOne());
router.put('/:id', [insertModified(), validateBody(mealSchema), updateOne()]);
router.delete('/:id', [deleteOne()]);

router.use(handleError());
