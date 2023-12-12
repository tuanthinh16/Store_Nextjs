
import { Product } from '@/app/models/interface';
import { FavoriteBorder } from '@mui/icons-material';
import { AspectRatio, Avatar, Box, Button, Card, CardActions, CardContent, CardOverflow, CircularProgress, Container, Divider, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, LinearProgress, Sheet, Typography, styled } from '@mui/joy';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { makeUploadRequest } from './uploadImage';
import { useRouter } from 'next/navigation';
import { FloatingLabel, Form } from 'react-bootstrap';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
}));


const Category = () => {
    const [cate,setCate] = React.useState<any[]>([]);
    React.useEffect(()=>{
        fetchData();
    },[]);
    const fetchData =()=>{
        const url="/api/category";
        axios.get(url)
        .then(response =>{
            setCate(response.data['data']);
            console.log("data lay duoc: ",response.data['data'])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
    }     
    return (
        <>
        <Typography fontSize='large' sx={{padding:3,fontWeight:'bold',color:'rgb(123,123,123)'}}>Manage Category</Typography>
        <LinearProgress color="success" variant="soft" size="lg" />
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={6} md={4}>
                <Item>
                    <AddProduct/>
                </Item>
            </Grid>
            <Grid xs={6} md={8}>
                <Item style={{display:'flex',flexWrap:'wrap'}}><BottomActionsCard cate ={cate}/></Item>
            </Grid>
        </Grid>
        </>
    )
}

export default Category;
const  BottomActionsCard = ({cate}:any)=> {
    return (
        <>
        {cate?.map((item:any,index:number)=>(
            <Card orientation="horizontal" variant="outlined" sx={{ width: 300 ,margin:'0 1rem 1rem 0'}} key={index}>
                <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 90,height:100 }}>
                    <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_J0DZEocNDdWw5-juWbLS9qAdODTV3nxSMg&usqp=CAU"
                    loading="lazy"
                    alt=""
                    />
                </AspectRatio>
                </CardOverflow>
                <CardContent>
                <Typography fontWeight="md" textColor="success.plainColor">
                    {item.name}
                </Typography>
                <Typography level="body-sm">
                    Category adder buy shop
                </Typography>
                </CardContent>
                <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    textAlign: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                }}
                >
                Category
                </CardOverflow>
            </Card>
        ))}
        </>
    );
}
const AddProduct = ()=>{
    const {enqueueSnackbar} = useSnackbar();
    
    return(
        <Container>
            <FormControl>
                <FormLabel>Name Cate</FormLabel>
                <Input placeholder="Type in here…" variant="outlined" color="warning" />
                <FormHelperText>Enter your category name for create a new.</FormHelperText>
            </FormControl>
            <Button variant='soft' color='success' sx={{width:'30%'}}>ADD</Button>
            
        </Container>
    )
}