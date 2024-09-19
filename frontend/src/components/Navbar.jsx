import React, { useEffect } from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate kullanımı
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { toast } from "react-toastify";

function Navbar() {

    const dispatch = useDispatch();
    const navigation = useNavigate()

    const isAuth = sessionStorage.getItem('userToken');


    const handleLogout = () => {
        try {
            dispatch(logoutUser());
            toast.success("Çıkış Başarılı", {
                autoClose: 1500,
            });
            return navigation('/login');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AppBar position='sticky' >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MyApp
                </Typography>
                <Box sx={{ display: 'flex' }}>

                    {(isAuth) ? (

                        <Button color="inherit" onClick={handleLogout}  >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigation('/login')}  >
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => navigation('/register')}  >
                                Register
                            </Button>
                        </>

                    )}

                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar