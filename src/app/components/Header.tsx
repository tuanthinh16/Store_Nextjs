'use client'
import Link from 'next/link';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { Badge, Button, DialogTitle, Drawer, ModalClose } from '@mui/joy';
const pages = ['Products', 'Categories', 'Wallet'];
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { signOut, useSession } from "next-auth/react";
import CartItem from '../ITEM/CartItem';
import {cart} from '../models/cartData';
import useLocalStorageState from 'use-local-storage-state';
import { useSelector } from 'react-redux';
import { useAppSelector  } from '../store/store';
import { totalCartItemsSelector } from '../store/features/cartSlice';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
        width: '20ch',
        },
    },
    },
}));
const MyAppBar = styled(AppBar)`
    && {
    background-color: #18277997; /* Màu chính của AppBar */
    color: white; /* Màu chữ của AppBar */
    max-width: 100%; /* Độ rộng tối đa của AppBar */
    }
`;
const Header = () => {
    const route = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };
    const handleClick = (_key:any)=>{
        route.push("/"+_key);
    }
    const handleLogout = ()=>{
        deleteCookie('token');
        route.refresh();
    }
    const token = getCookie('token');
    
    const handleClickUser = (key:any)=>{
        route.push('/user/'+key);
    }

    const { data: session }: any = useSession();
    const[openCart, setOpenCart] = React.useState(false);
    const totalItems = useAppSelector(totalCartItemsSelector);
    const cartItems = useAppSelector(
        (state) => state.cart.cartItems
    );
    return (
        <MyAppBar position="fixed">
        <Container style={{position:'relative',maxWidth:'90%'}}>
            <Toolbar disableGutters >
                {/* <Image src={logo} width={100} height={50} alt={'logo'}/> */}
                <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                {'Thinh Store'}
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                    display: { xs: 'block', md: 'none' },
                    }}
                >
                    <div><Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                </Search></div>
                    {pages.map((page) => (
                    <MenuItem key={page} onClick={()=>handleClick(page)}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                    ))}
                </Menu>
                </Box>
                <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                Thinh Store
                </Typography>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <div style={{paddingTop:15,marginRight:50}}><Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                </Search></div>
                <div style={{margin:'auto',display:'flex'}}>
                    {pages.map((page) => (
                        <Button
                        key={page}
                        onClick={()=>handleClick(page)}
                        sx={{ my: 2, color: 'white', display: 'block',fontWeight:'bold' }}
                        variant='soft'
                        >
                        {page}
                        </Button>
                    ))}
                </div>
                </Box>
                
                <Box sx={{ flexGrow: 1 ,display:'flex',justifyContent:'flex-end'}}>
                    <Badge size='lg' sx={{marginRight:5}} badgeContent={totalItems?(totalItems):""}>
                        <Typography fontSize="l">
                            <Button style={{borderRadius:'25px'}} onClick={() => setOpenCart(true)} >🛒</Button>
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Drawer open={openCart} onClose={() => setOpenCart(false)} anchor="right" size="sm" sx={{position:'relative'}}>
                                <ModalClose />
                                <DialogTitle level='h2'> My Cart</DialogTitle>
                                <CartItem cartItem={cartItems}/>
                            </Drawer>
                        </Box>
                    </Badge>
                
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountBoxIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <Typography style={{padding:7,color:'green'}}>{session?.user?.email}</Typography>
                    <MenuItem  onClick={()=>handleClickUser('Profile')}>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>handleClickUser('Wallet')}>
                        <Typography textAlign="center">Wallet</Typography>
                    </MenuItem>
                    {session?(
                        <MenuItem onClick={()=>signOut()}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                        
                    ):(
                        <MenuItem onClick={()=>handleClickUser('Login')}>
                            <Typography textAlign="center">Login</Typography>
                        </MenuItem> 
                    )}
                    
                </Menu>
                </Box>
            </Toolbar>
            </Container>
        </MyAppBar>
    )
}

export default Header