'use client'
import React from 'react'
import ProductItem from '../ITEM/ProductItem'
import axios from 'axios';
import { Breadcrumbs, Link, Typography } from '@mui/joy';
import PublicIcon from '@mui/icons-material/Public';
import { useSession } from 'next-auth/react';

const Product = () => {
    const { data: session,status: sessionStatus }: any = useSession();
    const [product,setProduct] = React.useState<any[]>([]);
    React.useEffect(()=>{
        document.title = "Bunney | Product";
        fetchData();
    },[]);
    const fetchData =()=>{
        const url="/api/product";
        axios.get(url)
        .then(response =>{
            setProduct(response.data['data'])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
    }     
    return (
        sessionStatus == "authenticated" ? (
            <>
                <div style={{margin:'auto',marginLeft:30}}>
                <Breadcrumbs separator="›" aria-label="breadcrumbs">
                    <Link color="primary" href="/Products">
                        <PublicIcon sx={{ mr: 0.5 }} />
                            Products
                        </Link>
                    <Link  color="success" href="#">List-Product</Link>

                    <Typography>Get All</Typography>
                </Breadcrumbs>
                <div style={{display:'flex',flexWrap:'wrap',marginTop:50}}>
                    <ProductItem product={product}/>
                </div>
            </div>
        </>
        ):(
            <div>
                <Link href={'/user/Login'}>Login</Link>
            </div>
        )
    )
}

export default Product