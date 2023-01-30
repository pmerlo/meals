import { Request, Response, Router } from 'express';
import { router as mealsRouter } from './meals';

const router: Router = Router();

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({});
});

router.use('/meals', mealsRouter);

export default function (): Router {
  return router;
}
