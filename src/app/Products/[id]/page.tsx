'use client'
import StarRating from '@/app/ITEM/Rating'
import { Box, Breadcrumbs, Button, Card, FormLabel, IconButton, Link, Radio, RadioGroup, Sheet, Typography, radioClasses } from '@mui/joy'
import axios from 'axios';
import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import { Add, Remove } from '@mui/icons-material';
import { styled } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { increment } from '@/app/store/features/cartSlice';
import { Product } from '@/app/models/interface';
import { useSnackbar } from 'notistack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const ProductDetail = ({params}:{params:{id:string}}) => {
    const { data: session,status: sessionStatus }: any = useSession();
    const [product, setProduct] = React.useState<any[]>([]);
    const [count, setCount] = React.useState(0);
    const [image,setImage]= useState('');
    const {enqueueSnackbar} = useSnackbar();
    const fetchData =()=>{
        const url="/api/product?id="+params.id;
        axios.get(url)
        .then(response =>{
            setProduct([response.data['data']])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
        
    }
    React.useEffect(()=>{
        fetchData(); 
    },[])
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(selectedValue){
            setSelectedValue('');
        }
        else{
            setSelectedValue(event.target.value);
        }
        
    };
    const [selectedColor, setSelectedColor] = React.useState('');

    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
    };
    const dispatch = useDispatch();
    const handleAdd = (row: Product)=>{
        row.options.size = selectedValue;
        row.options.color = selectedColor;
        
        dispatch(increment(row));
        enqueueSnackbar('Add successfully',{variant:'success'})
    }
    return (
        sessionStatus =='authenticated'&&(
            <div className=' md:p-3 text-lg font-semibold'>
                <Breadcrumbs separator="›" aria-label="breadcrumbs">
                        <Link color="primary" href="/Products">
                            <PublicIcon sx={{ mr: 0.5 }} />
                                Products
                            </Link>
                        <Link  color="success" href="#">Get-Products</Link>

                        <p className='italic'>ID: {params.id}</p>
                </Breadcrumbs>
                <div className='md:grid md:grid-cols-2'>
                    {product?.map((row:any,index:number)=>(
                    <div key={index} className='md:flex bg-gradient-to-br from-slate-500 to-cyan-300 p-3 rounded-xl md:w-[900px] items-center content-center m-auto shadow-lg'>
                    <div className='max-w-sm flex md:block py-2 md:px-3'>
                        <Image src={image||row.imageUrl[0]} width={200} height={150} className='min-w-[200px] md:min-w-[300px]' alt='select-image-product'style={{margin:5,borderRadius:10}}/>
                        <div className='flex flex-col md:flex-row'>
                            {row['imageUrl']?.map((_image: any, index:number)=>(
                                <Image src={_image} onClick={()=> setImage(_image)} width={50} height={20} alt='image' className='' key={index} style={{margin:5,borderRadius:10}}/>
                            ))}
                        </div>
                    </div>
                    <div >
                        <div className='text-2xl'>
                            <StarRating initialRating={row.rating?.rate}/>
                        </div>
                        <div>
                            <Typography level="h1">{row.title}</Typography>
                            <Typography level="body-sm">{row.description}</Typography>
                        </div>
                        
                        <div>
                            <Box sx={{ resize: 'horizontal', overflow: 'auto', px: 2,mt:10 }}>
                                <div className='flex gap-2 md:items-center text-center'>
                                    <RadioGroup
                                        aria-labelledby="product-size-attribute"
                                        defaultValue='0'
                                        sx={{ gap: 1, flexWrap: 'wrap', flexDirection: 'row' ,alignItems: 'center'}}
                                    >
                                            {selectedValue ?(
                                                <Radio color="danger" disableIcon value={selectedValue} key={selectedValue} label={selectedValue} onChange={handleChange} className='p-1 focus:bg-red-400'/>
                                            ):(
                                                (row.options.size.split(' ').map((size: string) => size.trim()))?.map((item:any) => (
                                                    <Radio color="danger" disableIcon value={item.trim()} key={item} label={item} onChange={handleChange} className='p-1 mt-2 m-auto focus:bg-red-400'/>
                                                ))
                                            )}
                                        
                                    </RadioGroup>
                                </div>

                                <div className='flex gap-2 items-center text-center'>

                                    <RadioGroup 
                                    aria-labelledby="product-size-attribute"
                                    defaultValue="0"
                                    sx={{ gap: 2, mb: 2, flexWrap: 'wrap', flexDirection: 'row' }}>
                                    {selectedColor?(
                                        <Radio
                                        disableIcon
                                        variant="solid"
                                        value={selectedColor}
                                        label={selectedColor}
                                        onChange={handleChangeColor}
                                        key={selectedColor}
                                        className='p-1 m-auto mt-4 rounded-full w-10 h-7 text-xs'
                                        color={selectedColor=='red'?'danger':(selectedColor=='yellow'?'warning':(selectedColor=='green'?'success':'primary'))}
                                    />
                                    ):(
                                        (row.options.color.split(' ').map((size: string) => size.trim()))?.map((item:any) => (
                                            <Radio
                                                disableIcon
                                                variant="solid"
                                                value={item}
                                                label={item}
                                                onChange={handleChangeColor}
                                                key={item}
                                                className='p-1 m-auto mt-4 rounded-full  h-7 text-xs'
                                                color={item=='red'?'danger':(item=='yellow'?'warning':(item=='green'?'success':'primary'))}
                                            />
                                        ))
                                    )}
                                </RadioGroup>
                                </div>
                                
                            </Box>
                            <div className='ml-5 font-bold text-xl py-2'>
                                <p>{row.price}{'K'}</p>
                            </div>
                        </div>
                        <div >
                            <MyButton variant="outlined" color='primary' onClick={()=>handleAdd( row) }>Add To Cart</MyButton>
                        </div>
                    </div>
                </div>
                ))}
                    <div>
                        <div>
                            <Star product = {product[0]}/>
                        </div>
                        <div className='md:ml-20 m-6'>
                            <Review/>
                        </div>
                    </div>
                    
                </div>
            
            </div>
        )
        
    )
}

export default ProductDetail;
const MyButton = styled(Button)`
    border: 1px solid #419b45;
    margin:auto;
    &:hover{
        background-color: #419b45;
        color: white;
        font-weight: bold;
        border: 0px;
    }
`
const Star = ({product}:any)=>{
    console.log('data on star',typeof(product?.rating?.rate));
    const rate = product?.rating?.rate || 0;
    return (
        <div className='grid grid-cols-5 items-center my-4 md:w-[900px] m-auto'>
            <div className='border-r-2 col-span-2 m-auto p-3'>
                <p className='text-center font-bold text-2xl'>{product?.rating?.rate}</p>
                <div className='text-sm p-1 flex md:text-lg'>
                    <StarRating initialRating={rate}/>
                </div>
                <p className='text-center underline text-sm'>{product?.rating?.count}{' Reviewer'}</p>
            </div>
            <div className='col-span-3 grid grid-cols-2 text-sm items-center p-1 md:text-lg gap-3'>
                <div>
                    <p className='text-bold'>Perfect</p>
                    <div className=''>
                        <StarRating initialRating={5}/>
                    </div>
                </div>
                <div>
                    <p className='text-bold '>Comfortable</p>
                    <div className=''>
                        <StarRating initialRating={4}/>
                    </div>
                </div>
                <div>
                    <p className='text-bold '>Good</p>
                    <div className=''>
                        <StarRating initialRating={3}/>
                    </div>
                </div>
                <div>
                    <p className='text-bold'>Not Bad</p>
                    <div className=''>
                        <StarRating initialRating={2}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Review = ()=>{
    return (
        <div className=' shadow-md m-auto rounded-xl p-3'>
            <h1 className='font-bold font-xl py-5'>Review</h1>
            <div className='flex p-2 items-center'>
                <div className='items-center p-3'>
                    <AccountCircleIcon fontSize='large'/>
                    
                </div>
                <div>
                    <h1 className='font-bold text-red-400 '>Username</h1>
                    <small className='text-green-900 text-xs mt-0'>2023-12-12--23:20</small>
                    <p>hang rat dep

                    </p>
                </div>
            </div>
        </div>
    )
}