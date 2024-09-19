import User from '../models/User.js';
import Message from '../models/Message.js';
import Room from '../models/Room.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { io } from '../index.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const getMessageList = async (req, res) => {
    const { roomName } = req.query; // roomName doğrudan req.query'den alınıyor

    try {
        if (!roomName) {
            return res.status(400).json({ message: 'Room name is required.' });
        }

        const room = await Room.findOne({ name: roomName });

        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }

        const roomId = room._id;

        const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

        // Eğer mesaj bulunamazsa 404 yerine boş bir array dönebiliriz
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error while fetching messages.' });
    }
};


export const saveMessage = async (req, res) => {
    const { senderId, roomName, message } = req.body.message;

    console.log(req.body)
    if (!senderId || !roomName || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        let room = await Room.findOne({ name: roomName });

        if (!room) {
            room = await Room.create({
                name: roomName,
                users: [senderId],
            });
        }

        const roomId = room._id;

        const newMessage = await Message.create({
            senderId,
            roomId,
            message,
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const joinRoom = async (req, res) => {
    const { roomName, socketId } = req.body;

    try {
        let room = await Room.findOne({ name: roomName });

        if (!room) {
            room = new Room({ name: roomName });
            await room.save();
            console.log(`New room created: ${roomName}`);
        }

        if (io.sockets.sockets.get(socketId)) {
            io.sockets.sockets.get(socketId).join(roomName);
            res.status(200).send({ message: `Joined room: ${roomName}` });
        } else {
            res.status(404).send({ message: 'Socket not found' });
        }
    } catch (error) {
        console.error('Error joining room:', error);
        res.status(500).send({ message: 'Error joining room' });
    }
};

export const getUserFriends = async (req, res) => {
    const userId = req.user.id;

    try {
        const userFriends = await User.find({
            _id: { $ne: userId }
        });
        res.status(200).json(userFriends);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Kullanıcılar alınırken bir hata oluştu' });
    }
};


export const getUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Profil getirirken bir hata oluştu' });
    }
}

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Kullanıcı zaten mevcut' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Geçersiz şifre' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Giriş sırasında bir hata oluştu' });
    }
};
