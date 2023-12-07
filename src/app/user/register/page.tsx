'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Alert, AspectRatio, IconButton, LinearProgress, Snackbar } from '@mui/joy';
import { Check, Close } from '@mui/icons-material';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Register = () => {
    const [open, setOpen] = React.useState(false);
    const route = useRouter();
    const[data,setData] = React.useState({username:'',email:'',password:'',name:{firstname:'',lastname:''},phone:''})
    const [registerAlert, setRegisterAlert] = React.useState({
        color: '',
        value: ''
    });
    React.useEffect(()=>{
        document.title = "Bunney | Register";
    },[]);
    const onValueChange =(_key:string)=>(e: { target: { value: any; }; })=>{
        setData((prev)=>({...prev,[_key]:e.target.value}))
    }
    const onValueChangeName = (_key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
        ...prev,
        name: {
            ...prev.name,
            [_key]: e.target.value
        }
        }));
    };
    const handleSubmit = () => {
        const formData = {
            username: data.username,
            email: data.email,
            password: data.password,
            phone: data.phone,
            name: {
                firstname: data.name.firstname,
                lastname: data.name.lastname
            }
        };
        const url="/api/user";
        axios({
            method:"post",
            url: url,
            data:formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response =>{
            if (response.status === 200) {
                setRegisterAlert({ color: 'success', value: 'Create account successfully' });
            } else if (response.status === 504) {
                setRegisterAlert({ color: 'danger', value: 'Username has been existed' });
                setOpen(true);
            } else {
                setRegisterAlert({ color: 'warning', value: 'Error when creating account' });
            }
        })
        .catch(error=>{
            console.error("Err: "+error)
        });  
        
    };

    return (
    <ThemeProvider theme={defaultTheme} >
        {registerAlert.value && (
        <RegisterAlert color={registerAlert.color} value={registerAlert.value} />
        )}
        {/* <RegisterAlert color= 'danger' value= 'Username has been existed' /> */}
                <Snackbar
                    autoHideDuration={4000}
                    open={false}
                    variant="soft"
                    color="success"
                    onClose={(event, reason) => {
                        if (reason === 'clickaway') {
                            return;
                        }
                        setOpen(false);
                    }}
                    >
                    Create successful
                </Snackbar>
        <Container component="main" maxWidth="sm" style={{display:'flex',maxWidth:'80%',justifyContent:'center',alignContent:'center',alignItems:'center',marginLeft:'3rem'}}>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={onValueChangeName('firstname')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={onValueChangeName('lastname')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={onValueChange('email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={onValueChange('username')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    onChange={onValueChange('phone')}
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
                    onChange={onValueChange('password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
                </Grid>
                <Button
                // type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/user/login" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>

        </Container>
        </ThemeProvider>
    );
}

export default Register;
const RegisterAlert = ({color,value}:any)=>{
    return (
        <Alert
        size="lg"
        color={color}
        variant="solid"
        invertedColors
        startDecorator={
            <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                minWidth: 40,
                borderRadius: '50%',
                boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                }}
            >
                <div>
                <Check fontSize="medium" />
                </div>
            </AspectRatio>
            }
            endDecorator={
            <IconButton
                variant="plain"
                sx={{
                '--IconButton-size': '32px',
                transform: 'translate(0.5rem, -0.5rem)',
                }}
            >
                <Close />
            </IconButton>
            }
            sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
        >
            <div>
            <Typography >{color}</Typography>
            <Typography >
                {value}
            </Typography>
            </div>
            <LinearProgress
                variant="solid"
                color="success"
                value={40}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 0,
                }}
            />
        </Alert>
    )
}