'use client'
import React, { useState } from 'react'
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Switch } from '@mui/joy';
import { useTheme } from 'next-themes';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';

const Header = () => {
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = React.useState(false)
    const { theme, setTheme } = useTheme()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null;
    return (
        <Container className='w-screen fixed top-3 mb-10 ml-10 rounded-lg bg-stone-500 right-0 h-20 p-2 items-center z-10'>
            <Row>
                <Col aria-colspan={2}>
                    <Container style={{}}>
                        Bunney Admin Dashboard
                    </Container>
                </Col>
                <Col>
                    <Container style={{display:'flex',right:'2rem'}}>
                        <Container>
                            <Button variant='outlined'><NotificationsIcon/></Button>
                        </Container>
                        <Container>
                            <Button onClick={handleShow} variant='outlined'><SettingsIcon/></Button>
                        </Container>
                        <Container style={{}}>
                            <Button variant='outlined'><AccountCircleIcon/></Button>
                        </Container>
                    </Container>
                </Col>
            </Row>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <div>
                        <Switch size='lg' checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                        slotProps={{
                            input: { 'aria-label': 'Dark mode' },
                            thumb: {
                            children: <Brightness4OutlinedIcon />,
                            },
                        }}
                        sx={{
                            '--Switch-thumbSize': '16px',
                            padding:1
                        }} />
                    </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    )
}

export default Header;