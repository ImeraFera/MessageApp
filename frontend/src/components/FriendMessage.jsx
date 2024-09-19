import { Box, Typography } from '@mui/material'
import React from 'react'

function FriendMessage(props) {
    const { content } = props
    return (
        <Box
            display="flex"
            justifyContent="flex-start"
            mb={1}
            p={1}
        >
            <Box
                display="flex"
                flexDirection="column"
                p={1}
                bgcolor="gray"
                maxWidth="75%"
                sx={{
                    borderTopRightRadius: '1em',
                    borderBottomRightRadius: '1em',
                    borderTopLeftRadius: '1em',
                    borderBottomLeftRadius: '1em',
                }}
            >
                <Box p={1}>
                    <Typography color="white" variant="body1">
                        {content}
                    </Typography>
                </Box>
                <Box>
                    <Typography textAlign="left" color="yellow">
                        {new Date().getHours() + ':' + new Date().getMinutes()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default FriendMessage