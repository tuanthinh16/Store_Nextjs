import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Container, Divider, Paper } from '@mui/material';
import { Box, Button, IconButton } from '@mui/joy';
import { Add, Remove } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/store';
import { TotalPriceSelector, decrement, increment } from '../store/features/cartSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const CartItem = ({cartItem}:any) => {

    const totalPrice = useAppSelector(TotalPriceSelector);
    const dispatch = useAppDispatch();
    const [count, setCount] = React.useState(1);
    const [total,setTotal] = React.useState(0);
    console.log('Data geted ',cartItem);
    return (
        <>
        <div className="max-h-[70%]  overflow-auto ">
        {cartItem?.map((row:any,index:number)=>(
            <Card
            variant="soft"
            orientation="horizontal"
            key={index}
            sx={{
                width: '90%',
                '&:hover': { boxShadow: 'md', borderColor: 'rgb(124,124,124)' },
                margin:2,
                marginLeft:1,
                padding:2,
                borderBottom:'1px solid',
                overflowY:'auto',
                maxHeight:'70%'
            
            }}
            >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                src={row.product.imageUrl[0]}
                loading="lazy"
                alt=""
                />
            </AspectRatio>
            <CardContent>
                <Typography level="title-lg" id="card-description">
                {row.product.title}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                <Link
                    overlay
                    underline="none"
                    href={"Products/"+row.product._id}
                    sx={{ color: 'text.tertiary' }}
                >
                    {row.product.options?.color}{"/"}{row.product.options?.size}
                </Link>
                </Typography>
                <div style={{display:'flex'}}>
                    <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                    >
                    {row.product.price}{".000đ"}
                    </Chip>
                    <Box
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderRadius:'20px',
                        padding:0.2,
                        marginLeft:1
                        }}
                    >
                        <IconButton
                        size="sm"
                        variant="plain"
                        style={{borderRadius:'20px'}}
                        onClick={()=> dispatch(decrement(row.product)) }
                        >
                            <Remove />
                            </IconButton>
                            <Typography fontWeight="md" textColor="text.secondary">
                                {row.qty}
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="plain"
                                style={{borderRadius:'20px'}}
                                onClick={()=> dispatch(increment(row.product)) }
                                >
                            <Add />
                        </IconButton>
                    </Box>
                </div>
            </CardContent>
            
            </Card>
            
        ))}
        </div>
        {!totalPrice&&(
            <Container style={{margin:'auto'}}>
                <ShoppingCartOutlinedIcon fontSize='large'/>
                <Typography fontWeight="lg">
                    Your Cart Empty
                </Typography>
            </Container>
        )}
        {totalPrice?(
            <Container className='shadow-xl bg-slate-300 p-2 rounded-lg absolute bottom-10 x-10' >
                <div className="flex flex-wrap justify-between mb-3" >
                    <Typography fontWeight="md" fontSize="xl" >Taxes</Typography>
                    <Typography fontWeight="md" style={{right:0,fontWeight:'bold'}}>0%</Typography>
                </div>
                <div className="flex flex-wrap justify-between mb-3">
                    <Typography fontWeight="md">Shipping</Typography>
                    <Typography  fontWeight="md" style={{right:0,fontWeight:'bold'}}>Checkout</Typography>
                </div>
                <div className="flex flex-wrap justify-between ">
                    <Typography fontWeight="md">Total</Typography>
                    <Typography fontWeight="md" style={{right:0,fontWeight:'bold'}}>{totalPrice}{'.000đ'}</Typography>
                </div>
                <Button  variant='outlined' sx={{
                    '&:hover':{backgroundColor:'green',color:'white'},
                    margin:3,
                    maxWidth:'50%',
                    align:'center'
                }}>Check Out</Button>
            </Container>
        ):""}
        </>
    )
}

export default CartItem;