import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './router/index.js';
import cors from 'cors';

const PORT = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json());
app.use('/', router);

app.set('io', io);

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('message', (data) => {
        const { roomId, message } = data;
        io.to(roomId).emit('message', message); // Пересылаем сообщение всем пользователям в комнате
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const start = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Good start, PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
