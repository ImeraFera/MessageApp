import React from 'react'
import { Box, Button, CircularProgress, Grid2, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik'
import { validationSchema } from '../validations/LoginValid';
import { toast } from 'react-toastify';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const loading = useSelector(({ auth }) => auth.loading);

    const handleSubmit = async (values) => {

        try {
            await dispatch(loginUser(values)).unwrap();

            toast.success("Giriş Başarılı", {
                autoClose: 1500,
            });

            return navigation('/home');

        } catch (error) {
            toast.error(error.message, {
                autoClose: 1500,
            });
        }
    }

    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    return (


        <Grid2 container my={5} justifyContent={'center'} spacing={2}>
            <Grid2 size={12} p={2}>
                <Box>
                    <Typography textAlign={'center'} variant='h4'>Login</Typography>
                </Box>
            </Grid2>
            <Grid2 size={8} p={2}>
                <form onSubmit={formik.handleSubmit}>
                    <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Box display={'flex'} mb={2}>
                            <TextField
                                label='Eamil'
                                name='email'
                                id='email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                variant='standard'
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Box>
                        <Box display={'flex'} mb={2}>
                            <TextField
                                label='Password'
                                name='password'
                                id='password'
                                type='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                variant='standard'
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Box>
                        <Box display={'flex'} mb={2}>
                            <Button type='submit' variant='contained'>
                                {(loading ? (
                                    <CircularProgress size={24} color='white' />
                                ) : 'Login')}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Grid2>
        </Grid2>

    )
}

export default Login