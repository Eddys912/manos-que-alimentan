import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import router from './presentation/routes/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', router);

export default app;
