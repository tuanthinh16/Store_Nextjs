'use client'
import React, { useState } from 'react'
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
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