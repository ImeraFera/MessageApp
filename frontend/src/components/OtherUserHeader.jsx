import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

function OtherUserHeader(props) {
    const { username, avatar } = props
    return (
        <Box display={'flex'} bgcolor={'#1976D2'} borderRadius={'1em'}>
            <Box display={'flex'} flex={1} alignItems={'center'}>
                <Box my={2} mx={2}>
                    <Avatar sx={{ width: 48, height: 48 }}></Avatar>
                </Box>
                <Box>
                    <Typography variant='h6' color='white'>
                        {username}
                    </Typography>
                </Box>
            </Box>
        </Box>)
}

export default OtherUserHeader