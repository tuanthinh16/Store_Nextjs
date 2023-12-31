'use client'
import { Col, Container, Form,Row } from 'react-bootstrap'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import 'dotenv/config'
import { toast } from 'react-toastify';
import { useSnackbar } from 'notistack';

const defaultTheme = createTheme();
const LoginFrom = ()=>{
    const {enqueueSnackbar} = useSnackbar();
    const route = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    React.useEffect(() => {
        if (sessionStatus === "authenticated") {
            toast.success("Login Successfully",{position:toast.POSITION.BOTTOM_CENTER});
            route.replace("/");
        }
    }, [sessionStatus, route]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const _data = new FormData(event.currentTarget);
        const username = _data.get('username');
        const password = _data.get('password');
        const res = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });
        if (res?.error) {
            console.log("error");
            enqueueSnackbar("Error when login",{variant:'error'});
        if (res?.url) {
            enqueueSnackbar("Login success",{variant:'success'});
            route.replace("/"); 
            }
        }
        console.log("response ",res)
    } 
    return (
        sessionStatus !== "authenticated"&&(
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{padding:'3rem'}}>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3" style={{color:'red'}}>
                    {' Bunney Store - Sign in'}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}

                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/user/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <Button onClick={()=>signIn("google")}>Google</Button>
            </Grid>
        </Grid>
        </ThemeProvider>
        )
    )
}
export default LoginFrom;