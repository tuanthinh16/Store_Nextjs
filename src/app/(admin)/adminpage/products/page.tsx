'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { Table } from '@mui/joy';
import Products from '../../components/item/Products';

const ListProduct = ({product}:any) => {
    const route = useRouter();
    const [showadd,setShowadd] = useState(false);
    const [showDel,setShowDel] = useState(false);
    const [confirm,setConfirm] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    console.log("Data product: ",product)
    let count = 1;
    const onClickAdd =()=>{
        setShowadd(true);
    }
    const [showToast, setShowToast] = useState(false);
    const onDelete = (_id:string)=>{
        const url="/api/product?id="+_id;
        axios.delete(url)
        .then(response =>{
            route.replace('/adminpage');
            enqueueSnackbar('Delete product success',{variant:'success'})
        })
        .catch(error=>{
            enqueueSnackbar('Delete product not complete',{variant:'error'})
            console.error("Err: "+error)
        });
        
    }
    return (
        <div className=''>
            <Products/>
            
        </div>
    )
}

export default ListProduct;