import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/modules/Routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application router
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello Car rental World!');
};
app.get('/', test);

export default app;
