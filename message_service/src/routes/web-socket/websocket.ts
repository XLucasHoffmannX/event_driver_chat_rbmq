import { io } from './http';
import axios from 'axios';

io.on("connection", (socket) => {
    console.log(`CONEXÃO PRIMÁRIA: Usuário conectado: ${socket.id} \n`);
    /* console.log(socket.handshake.headers['user-agent'], '\n'); */

    /* chat room */
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`Joined Room ==> Usuário ID: ${socket.id}  chat: ${data}`);
    });

    /* message conection */
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);

        if(data){
            axios.post('http://localhost:8000/api/cmessage', {
                private_room : data.room,
                user_id: data.author,
                message_text: data.message.message
            })
            .then(res=>{
                console.log(res.status);
            });
        }
    });

    /* online user */
    socket.on('status', (data)=>{
        socket.broadcast.emit('sendToAll', data);
        /* console.log('status on', data) */
    })

    /* desconect conection info */
    socket.on("disconnect", () => {
        console.log(`CONEXAO PERDIDA: ${socket.id} \n`);
        console.clear();
    });
});