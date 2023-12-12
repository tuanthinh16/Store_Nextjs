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
        <>
            <Table hoverRow>
            <caption>List Products</caption>
            <thead>
                <tr>
                <th style={{ width: '40%' }}>Menu</th>
                <th>Calories</th>
                <th>Fat&nbsp;(g)</th>
                <th>Carbs&nbsp;(g)</th>
                <th>Protein&nbsp;(g)</th>
                </tr>
            </thead>
            <tbody>
                {product?.map((row:any) => (
                <tr key={row._id}>
                    <td>{row.name}</td>
                    <td>{row.calories}</td>
                    <td>{row.fat}</td>
                    <td>{row.carbs}</td>
                    <td>{row.protein}</td>
                </tr>
                ))}
            </tbody>
            </Table>
        </>
    )
}

export default ListProduct;