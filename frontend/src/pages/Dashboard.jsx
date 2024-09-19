import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, CardActionArea, Grid2, Stack, TextField, Typography } from '@mui/material';
import CurrentUserHeader from '../components/CurrentUserHeader';
import FriendItem from '../components/FriendItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageList, getUser, getUserFriends, joinRoom, saveMessage } from '../redux/slices/userSlice';
import OtherUserHeader from '../components/OtherUserHeader';
import io from 'socket.io-client';
import MyMessage from '../components/MyMessage';
import FriendMessage from '../components/FriendMessage';
import { generateRoomName } from '../utils/roomNameGenerator';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function Dashboard() {
    const dispatch = useDispatch();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null); // Referans

    const id = useSelector(({ user }) => user.id);
    const messageList = useSelector(({ user }) => user.messages);
    const username = useSelector(({ user }) => user.username);
    const friends = useSelector(({ user }) => user.friends);

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = async () => {
        if (message.trim() && selectedFriend) {
            const roomName = generateRoomName(id, selectedFriend?._id);
            const messageData = {
                senderId: id,
                roomName,
                message,
            };
            socket.emit('send_message', { roomName, message });
            setMessage('');
            await dispatch(saveMessage(messageData)).unwrap();
            await dispatch(getMessageList({ roomName })).unwrap();
        }
    };

    useEffect(() => {
        dispatch(getUser());
        dispatch(getUserFriends());
    }, [dispatch]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        return () => {
            socket.off('connect');
        };
    }, []);

    const handleJoinRoom = (friend) => {
        if (id && friend) {
            setSelectedFriend(friend);
            const roomName = generateRoomName(id, friend._id);
            dispatch(joinRoom({ roomName, socket }))
            dispatch(getMessageList({ roomName }));
            socket.emit('join_room', roomName);
        }
    };

    useEffect(() => {
        socket.on('receive_message', () => {
            if (selectedFriend) {
                const roomName = generateRoomName(id, selectedFriend._id);
                dispatch(getMessageList({ roomName }));
            }
        });

        return () => {
            socket.off('receive_message');
        };
    }, [selectedFriend, dispatch, id]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);

    return (
        <Grid2 container justifyContent={'center'} spacing={1} my={5} minHeight={'70vh'}>
            <Grid2 size={4} bgcolor={'white'} borderRadius={'1em'}>
                <CurrentUserHeader username={username} avatar={''} />
                <Box display={'flex'} mt={1} mx={2}>
                    <Button fullWidth variant='contained' color='warning'>
                        Add Friend
                    </Button>
                </Box>
                <Box mt={2}>
                    <Stack direction={'column'} display={'flex'} maxHeight={'68vh'} sx={{ overflowY: 'auto' }}>
                        {friends?.map((friend) => {
                            const isSelected = selectedFriend?._id === friend._id;

                            return (
                                <CardActionArea
                                    key={friend._id}
                                    onClick={() => {
                                        if (!isSelected) {
                                            handleJoinRoom(friend);
                                        }
                                    }}
                                    sx={{
                                        cursor: isSelected ? 'default' : 'pointer',
                                        opacity: isSelected ? 0.5 : 1,
                                        pointerEvents: isSelected ? 'none' : 'auto',
                                    }}
                                >
                                    <FriendItem username={friend.username} avatar={friend.avatar} />
                                </CardActionArea>
                            );
                        })}
                    </Stack>

                </Box>
            </Grid2>

            <Grid2 size={8} bgcolor={'white'} borderRadius={'1em'}>
                {selectedFriend ? (
                    <>
                        <OtherUserHeader username={selectedFriend?.username} />
                        <Box height={'60vh'} sx={{ overflowY: 'auto' }}>
                            {messageList && messageList.length > 0 ? (
                                <>
                                    {messageList.map((message, index) => (
                                        id !== message.senderId ? (
                                            <FriendMessage key={index} content={message.message} />
                                        ) : (
                                            <MyMessage key={index} content={message.message} />
                                        )
                                    ))}
                                    <div ref={messagesEndRef} />
                                </>
                            ) : (
                                <Typography variant='h3' textAlign={'center'}>
                                    No messages available
                                </Typography>
                            )}
                        </Box>

                        <Box display={'flex'}>
                            <TextField
                                fullWidth
                                variant='filled'
                                label='Message'
                                value={message}
                                onChange={handleChange}
                            />
                            <Button variant='contained' onClick={sendMessage}>
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box display={'flex'} p={2}>
                        <Typography variant='h3'>You should select a friend to start conversation.</Typography>
                    </Box>
                )}
            </Grid2>
        </Grid2>
    );
}

export default Dashboard;
