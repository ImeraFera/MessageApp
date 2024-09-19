import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'

function CurrentUserHeader(props) {

    const { username, avatar } = props;
    return (
        <Box display={'flex'} borderRadius={'1em'} bgcolor={'#1976D2'} alignItems={'center'} flex={1}>
            <Box display={'flex'} my={2} flex={0.75} justifyContent={'center'} alignItems={'center'}>
                <Avatar sx={{ width: 48, height: 48 }}></Avatar>
            </Box>
            <Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'left'} alignItems={'center'}>
                <Typography color='white' textAlign={'center'} variant='h6'>{username}</Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'center'} alignItems={'center'}>
                <Button variant='contained' color='warning'>asd</Button>
            </Box>
        </Box>
    )
}

export default CurrentUserHeader