'use client'
import React from 'react'
import { Container } from 'react-bootstrap'
import MenuItem from '../components/Menu';
import { SnackbarProvider } from 'notistack';
const Dashboard = () => {
    return (
        <SnackbarProvider maxSnack={3}>
        <Container>
            
        </Container>
        </SnackbarProvider>
    )
}

export default Dashboard