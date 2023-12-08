'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import Menu from '../components/app.menu';
import { SnackbarProvider } from 'notistack';
const Dashboard = () => {
    return (
        <SnackbarProvider maxSnack={3}>
        <Container>
            <Menu/>
        </Container>
        </SnackbarProvider>
    )
}

export default Dashboard