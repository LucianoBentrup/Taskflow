import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@/config/env';
import { healthRouter } from '@/routes/health.routes';
import { authRouter } from '@/routes/auth.routes';
import { userRouter } from '@/routes/user.routes';
import { projectRouter } from '@/routes/project.routes';
import { taskRouter } from '@/routes/task.routes';
import { dashboardRouter } from '@/routes/dashboard.routes';
import { errorHandler } from '@/middlewares/error-handler.middleware';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);
app.use('/dashboard', dashboardRouter);

app.use(errorHandler);
