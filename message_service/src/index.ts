import queueRabbit from './routes/events/queueRabbit';
import { serverHttp } from './routes/web-socket/http';
import './routes/web-socket/websocket'; 

/* routes and events */
// queueRabbit;

/* listen */
const PORT = process.env.PORT || 3040;
serverHttp.listen(PORT, ()=> console.log(`Server listening on ${PORT} \n`));