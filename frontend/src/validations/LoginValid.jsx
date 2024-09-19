import * as Yup from 'yup';

export const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .email('Must be a valid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3  characters')
});
