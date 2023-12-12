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
        setSelectedValue(event.target.value);
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
            <>
            <Breadcrumbs separator="›" aria-label="breadcrumbs">
                    <Link color="primary" href="/Products">
                        <PublicIcon sx={{ mr: 0.5 }} />
                            Products
                        </Link>
                    <Link  color="success" href="#">Get-Products</Link>

                    <Typography>ID: {params.id}</Typography>
            </Breadcrumbs>
            {product?.map((row:any,index:number)=>(
                <Card
                color="primary"
                invertedColors={false}
                orientation="horizontal"
                size="lg"
                variant="soft"
                sx={{ maxWidth: 700 ,display:'flex',position:'relative',margin:'auto'}}
                key={index}
                >
                <div style={{maxWidth:500}}>
                    <img src={image} defaultValue={row.imageUrl[0]} width={300} height={200} alt='select-image-product'  style={{margin:5,borderRadius:10}}/>
                    <div style={{display:'flex',maxWidth:500,flexWrap:'wrap'}}>
                        {row['imageUrl']?.map((_image: any, index:number)=>(
                            <img src={_image} onClick={()=> setImage(_image)} width={50} height={50} key={index} style={{margin:5,borderRadius:10}}/>
                        ))}
                    </div>
                </div>
                <div >
                    <Typography level="h1">{row.title}</Typography>
                    <Typography level="body-sm">{row.description}</Typography>
                    <Typography sx={{display:'flex'}}> Price : <p style={{textDecoration:'line-through', marginRight:5,marginLeft:5}}>{(parseInt(row.price) + parseInt(row.price)*10/100)*1000}{'đ'} </p><b style={{color:'green'}}>{parseInt(row.price)*1000}{'đ'}</b></Typography>
                    <div>
                    <div style={{display:'flex'}}>
                        <p style={{paddingTop:7 ,display:'flex'}}>{"("}{row['rating']?.['count']}{")"}{row['rating']?.['rate']}<StarIcon fontSize='small'style={{color:'rgb(187, 149, 26)'}}/></p>
                        <StarRating initialRating={row['rating']?.['rate']}/> 
                    </div>
                    <Box sx={{ resize: 'horizontal', overflow: 'auto', px: 2 }}>
                        <FormLabel
                            id="product-size-attribute"
                            sx={{
                            mb: 1.5,
                            fontWeight: 'xl',
                            textTransform: 'uppercase',
                            fontSize: 'xs',
                            letterSpacing: '0.1em',
                            }}
                        >
                            Size
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="product-size-attribute"
                            defaultValue="0"
                            sx={{ gap: 2, mb: 2, flexWrap: 'wrap', flexDirection: 'row' }}
                        >
                            { (row.options.size.split(' ').map((size: string) => size.trim()))?.map((item:any) => (
                            <Sheet
                                key={item}
                                sx={{
                                position: 'relative',
                                fontSize:'small',
                                width: 20,
                                height: 20,
                                flexShrink: 0,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '--joy-focus-outlineOffset': '4px',
                                '--joy-palette-focusVisible': (theme) =>
                                    theme.vars.palette.neutral.outlinedBorder,
                                [`& .${radioClasses.checked}`]: {
                                    [`& .${radioClasses.label}`]: {
                                    fontWeight: 'small',
                                    },
                                    [`& .${radioClasses.action}`]: {
                                    '--variant-borderWidth': '2px',
                                    borderColor: 'text.secondary',
                                    },
                                },
                                [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                                    outlineWidth: '2px',
                                },
                                }}
                            >
                                <Radio color="danger" overlay disableIcon value={item} label={item} onChange={handleChange}/>
                            </Sheet>
                            ))}
                            </RadioGroup>
                            <br/>
                            <RadioGroup 
                                aria-labelledby="product-size-attribute"
                                defaultValue="0"
                                sx={{ gap: 2, mb: 2, flexWrap: 'wrap', flexDirection: 'row' }}>
                                <FormLabel
                                id="product-size-attribute"
                                    sx={{
                                    mb: 1.5,
                                    fontWeight: 'xl',
                                    textTransform: 'uppercase',
                                    fontSize: 'xs',
                                    letterSpacing: '0.1em',
                                    display:'flex'
                                    }}
                                >
                                    Color
                                </FormLabel>
                            { (row.options.color.split(' ').map((size: string) => size.trim()))?.map((item:any) => (
                            <Sheet
                                key={item}
                                sx={{
                                    position: 'relative',
                                    width: 20,
                                    height: 20,
                                    flexShrink: 0,
                                    bgcolor: `${item}.solidBg`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Radio
                                    overlay
                                    variant="solid"
                                    value={item}
                                    sx={{marginRight:3,
                                        '&$checked':{
                                            color: `${item}`,
                                            backgroundColor:`${item}`
                                        },
                                        checked:{
                                            
                                        }
                                    }}
                                    label={item}
                                    onChange={handleChangeColor}
                                />
                            </Sheet>
                            ))}
                        </RadioGroup>
                        </Box>
                    </div>
                    <div style={{position:'absolute',bottom:20,right:1,width:'50%',display:'flex',alignItems:'center'}}>
                        <MyButton variant="outlined" style={{width:'40%',marginLeft:15,marginTop:10}} onClick={()=>handleAdd( row) }>Add To Cart</MyButton>
                    </div>
                </div>
            </Card>
            ))}
            <div style={{marginLeft:'3rem'}}>
                <h1>Some Review about of product</h1>
            </div>
            </>
        )
        
    )
}

export default ProductDetail;
const MyButton = styled(Button)`
    &:hover{
        width: 70%;
        background-color: #13ad1a;
        color: white;
        font-weight: bold;
        border: 0px;
    }
`