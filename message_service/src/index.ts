import express, { json, urlencoded } from 'express';
import cors from 'cors';
import queueRabbit from './routes/events/queueRabbit';

/* application */
const app = express();

/* middleware */
app.use(json());
app.use(cors());

/* routes and events */
queueRabbit;

/* listen */
const PORT = process.env.PORT || 3040;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));