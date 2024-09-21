import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import { addFriend } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
function AddFriendButton() {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },

        onSubmit: async (values) => {

            formik.resetForm();
            try {
                await dispatch(addFriend(values.email)).unwrap();
                toast.success('Arkadaşınız listeye eklendi.', {
                    autoClose: 1500,
                })
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 1500,
                })
            }
            handleClose();
        }

    });

    return (
        <>
            <Box display={'flex'} mt={1} mx={2} >
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleClickOpen}
                    color='warning'>
                    Add Friend
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add Friend</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </>
    )
}

export default AddFriendButton