import express, { json, urlencoded } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from "http";

/* application */
const app = express();

/* middleware */
app.use(json());
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "http://localhost:3000" 
    },
});

export { serverHttp, io };