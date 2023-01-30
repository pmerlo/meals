import { Router } from 'express';
import {
  setCollection,
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from './database';
import { validateBody, handleError } from './hooks';
import { mealSchema } from './schemas';

export const router: Router = Router();

router.use(setCollection());

router.post('/', [validateBody(mealSchema), createOne()]);
router.get('/', getAll());
router.get('/:id', getOne());
router.put('/:id', [validateBody(mealSchema), updateOne()]);
router.delete('/:id', [deleteOne()]);

router.use(handleError());
