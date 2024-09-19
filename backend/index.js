import express from 'express';
import { connectDB } from './db/connect.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://messageapp-react.onrender.com",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

// CORS ayarlarını güncelleyin
app.use(cors({
    origin: "https://messageapp-react.onrender.com",
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));

app.use(express.json());

app.use('/api', userRoutes)

let i = 0;
io.on('connect', (socket) => {
    i++;
    console.log(i)
    console.log('Bir kullanıcı bağlandı:', socket.id);

    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı:', socket.id);
        i--;
        console.log(i)

    });

    socket.on('join_room', (newRoomName) => {
        const rooms = Array.from(socket.rooms);
        rooms.forEach(room => {
            if (room !== socket.id) {
                socket.leave(room);
                console.log(`Kullanıcı ${socket.id} ${room} odasından ayrıldı`);
            }
        });



        socket.join(newRoomName);
        console.log(`Kullanıcı ${socket.id} ${newRoomName} odasına katıldı`);
    });

    socket.on('send_message', (data) => {
        const { roomName, message, senderId } = data;
        console.log(data)
        console.log(`Oda: ${roomName}, Mesaj: ${message}`);

        io.to(roomName).emit('receive_message', { message, senderId });
    });

});

export { io };

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
    await connectDB();
});
