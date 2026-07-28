import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@/config/env';
import { healthRouter } from '@/routes/health.routes';
import { authRouter } from '@/routes/auth.routes';
import { errorHandler } from '@/middlewares/error-handler.middleware';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/health', healthRouter);
app.use('/auth', authRouter);

app.use(errorHandler);
