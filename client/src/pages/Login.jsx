import {
  Box, Button, CssBaseline, Grid, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { ToastContext } from '../components/common/context/ToastContextProvider';
import Spinner from '../components/common/Spinner';
import GoogleLogin from '../components/GoogleLogin';
import { login, resetAuth } from '../reducers/Auth';
import { removeSignup } from '../reducers/Signup';
import { logoutUserProfile } from '../reducers/UserProfile';
import { resetScheduleState } from '../reducers/WorkoutAndMealSchedule';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login() {
  const openToast = useContext(ToastContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login({
        email: values.email,
        password: values.password,
      }));
    },
  });

  useEffect(() => {
    dispatch(removeSignup());
    dispatch(resetAuth());
    dispatch(logoutUserProfile());
    dispatch(resetScheduleState());
  });

  useEffect(() => {
    if (isError) {
      openToast('error', message);
    }

    if (isSuccess && user) openToast('success', 'You\'ve been logged in');
    if (isSuccess || user) navigate('/app');

    dispatch(resetAuth());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleGoogleLoginSuccess = (res) => {
    dispatch(login({
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="johndoe@email.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ width: '100%', height: '100%' }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <GoogleLogin
                  buttonText="Login with Google"
                  failureText="Could not authenticate with google"
                  onSuccess={handleGoogleLoginSuccess}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don&apos;t have an account? Create one.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
