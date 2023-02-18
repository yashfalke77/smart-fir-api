import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/status', (req: Request, res: Response) => {
  res.status(200).json({
    data: {},
    meta: {
      message: 'Complaint all you want !!!',
      flag: true,
      statusCode: 200,
    },
  });
});

export default router;
