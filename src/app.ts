import express from 'express';
import cors from 'cors';
import { router } from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

export const app = express();

// --- Parsers --- //
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials:true
  }),
);

// --- Application route --- //
app.use('/api/v1', router);

app.use(globalErrorHandler);

app.get('/', (_, res) => {
  res.send('Japan learn server is running...');
});
