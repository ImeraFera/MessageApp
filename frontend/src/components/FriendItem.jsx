import { Avatar, Box, CardActionArea, Typography } from '@mui/material'
import React from 'react'

function FriendItem(props) {

    const { username } = props
    return (
        <Box display={'flex'} flex={1} alignItems={'center'} p={1}>
            <Box display={'flex'} flex={0.3} justifyContent={'center'}>
                <Avatar sx={{ width: 64, height: 64 }}></Avatar>
            </Box>
            <Box display={'flex'} flex={0.7}>
                <Typography variant='h6'>{username}</Typography>
            </Box>
        </Box>
    )
}

export default FriendItem