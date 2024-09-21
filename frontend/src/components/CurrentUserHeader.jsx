import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { useSelector } from 'react-redux';

function CurrentUserHeader(props) {
    const { username, avatar } = props;
    const loading = useSelector(({ user }) => user.loading)
    return (
        <Box display={'flex'} borderRadius={'1em'} bgcolor={'#1976D2'} alignItems={'center'} flex={1}>
            <Box display={'flex'} my={2} flex={0.75} justifyContent={'center'} alignItems={'center'}>
                {avatar ? (
                    <Box
                        component="span"
                        dangerouslySetInnerHTML={{ __html: avatar }}
                        sx={{ width: 48, height: 48 }}
                    />
                ) : (
                    <Avatar sx={{ width: 48, height: 48 }} />
                )}
            </Box>
            <Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'left'} alignItems={'center'}>
                <Typography color='white' textAlign={'center'} variant='h6'>
                    {username}
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'} flex={1} justifyContent={'center'} alignItems={'center'}>
                <IconButton aria-label="settings">
                    <IoMdSettings color='white' size={24} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default CurrentUserHeader;
