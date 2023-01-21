import { Request, Response } from 'express';

export default function handleUnsupportedRoute() {
  return (req: Request, res: Response) => {
    if (!res.headersSent) {
      res.status(404).json({
        error: 'unsupported route',
        details: req.originalUrl,
      });
    }
  };
}
