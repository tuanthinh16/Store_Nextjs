'use client'
import axios from 'axios';
import React from 'react'
import { Button, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import ListProduct from './item/item.listProduct';
import Category from './item/Category';
import { signOut } from 'next-auth/react';
import Products from './item/Products';
import UserAccount from './item/UserAccount';

const Menu = () => {
    const [product,setProduct] = React.useState<any[]>([]);
    React.useEffect(()=>{
        fetchData();
    },[]);
    const fetchData =()=>{
        const url="/api/product";
        axios.get(url)
        .then(response =>{
            setProduct(response.data['data']);
            console.log("data lay duoc: ",response.data['data'])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
    }     
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard" >
            <Row>
            <Col sm={2} style={{backgroundColor:' rgb(49 49 68)',padding:'2rem 1rem 2rem 3rem',borderRadius:'20px',position:'fixed',left:'3rem',top:'2rem',minWidth:'175px'}}>
                <Nav variant="pills" className="flex-column">
                <Nav.Item >
                    <Nav.Link style={{height:'3rem',color:'white',fontWeight:'bold'}} eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="products" style={{height:'3rem',color:'white',fontWeight:'bold'}}>Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="categories" style={{height:'3rem',color:'white',fontWeight:'bold'}}>Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="user" style={{height:'3rem',color:'white',fontWeight:'bold'}}>User Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="wallet" style={{height:'3rem',color:'white',fontWeight:'bold'}}>Wallet</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="oder" style={{height:'3rem',color:'white',fontWeight:'bold'}}>The Oder</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="staff" style={{height:'3rem',color:'white',fontWeight:'bold'}}>Staff</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="seller" style={{height:'3rem',color:'white',fontWeight:'bold'}}>Seller</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="revenue" style={{height:'3rem',color:'white',fontWeight:'bold'}}>Revenue</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{margin:'1rem'}}>
                    <Button variant='danger' onClick={()=> signOut()}>Logout</Button>
                </Nav.Item>
                </Nav>
            </Col>
            <Col sm={9} style={{backgroundColor:'#86868616',borderRadius:'10px',marginLeft:'1rem',position:'absolute',right:0,top:'10rem'}}>
                <Tab.Content>
                <Tab.Pane eventKey="dashboard">First tab content</Tab.Pane>
                <Tab.Pane eventKey="products" style={{paddingTop:'3rem'}}>
                    <Products/>
                </Tab.Pane>
                <Tab.Pane eventKey="categories">
                    <Category/>
                </Tab.Pane>
                <Tab.Pane eventKey="user"><UserAccount/></Tab.Pane>
                </Tab.Content>
            </Col>
            </Row>
        </Tab.Container>
    )
}

export default Menu