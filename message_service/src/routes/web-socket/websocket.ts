import { io } from './http';

io.on("connection", (socket) => {
    console.log(`CONEXÃO PRIMÁRIA: Usuário conectado: ${socket.id} \n`);
    console.log(socket.handshake.headers['user-agent'], '\n');

    /* chat room */
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`Usuário ID: ${socket.id}  chat: ${data}`);
    });

    /* message conection */
    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    });

    /* desconect conection info */
    socket.on("disconnect", () => {
        console.log(`CONEXAO PERDIDA: ${socket.id} \n`);
    });
});