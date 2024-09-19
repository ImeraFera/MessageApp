import * as Yup from 'yup';

export const validationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be at most 20 characters'),

    email: Yup.string()
        .required('Email is required')
        .email('Must be a valid email address'),

    password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters')
        .max(20, 'Password must be at most 20 characters'),
});
