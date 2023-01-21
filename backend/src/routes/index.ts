import { Request, Response, Router } from 'express';
import { router as recipesRouter } from './recipes';

const router: Router = Router();

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({});
});

router.use('/recipes', recipesRouter);

export default function (): Router {
  return router;
}
