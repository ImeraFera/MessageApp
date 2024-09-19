import express from 'express';
import { register, login, getUser, getUserFriends, joinRoom, saveMessage, getMessageList } from '../controllers/userController.js';  // getMessageList'i de import et
import { jwtCheck } from '../middlewares/jwtCheck.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/get-user', jwtCheck, getUser);
router.get('/get-user-friends', jwtCheck, getUserFriends);

router.post('/join-room', jwtCheck, joinRoom);

router.get('/get-message-list', jwtCheck, getMessageList);

router.post('/save-message', jwtCheck, saveMessage);

export default router;
