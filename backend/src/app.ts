import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import router from './presentation/routes/index';
import { errorHandler } from './shared/middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', router);
app.use(errorHandler);

export default app;
