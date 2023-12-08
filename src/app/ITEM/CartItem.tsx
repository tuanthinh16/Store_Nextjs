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

const CartItem = ({cartItem}:any) => {
    const [count, setCount] = React.useState(1);
    const [total,setTotal] = React.useState(0);
    const [quanti,setQuanti] = React.useState(0);
    const [price,setPrice] = React.useState(0);
    React.useEffect(()=>{
        setTotal(quanti*price);
    },[])
    return (
        <>
        {cartItem?.map((row:any,index:number)=>(
            <>
            <Card
            variant="soft"
            orientation="horizontal"
            key={index}
            sx={{
                width: '100%',
                '&:hover': { boxShadow: 'md', borderColor: 'rgb(124,124,124)' },
                margin:2,
                marginLeft:0,
                paddingLeft:2,
                borderBottom:'1px solid',
                overflowY:'auto',
            
            }}
            >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                src={row.image_product}
                loading="lazy"
                alt=""
                />
            </AspectRatio>
            <CardContent>
                <Typography level="title-lg" id="card-description">
                {row.product_name}
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                <Link
                    overlay
                    underline="none"
                    href="#interactive-card"
                    sx={{ color: 'text.tertiary' }}
                >
                    {row.options?.color}{"/"}{row.options?.size}
                </Link>
                </Typography>
                <div style={{display:'flex'}}>
                    <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                    >
                    {row.price}{".000đ"}
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
                        onChange={()=> setQuanti(row.quanti)}
                        >
                            <Remove />
                            </IconButton>
                            <Typography fontWeight="md" textColor="text.secondary">
                                {row.quanti}
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="plain"
                                style={{borderRadius:'20px'}}
                                onClick={() => setCount(row.quanti++)}
                                >
                            <Add />
                        </IconButton>
                    </Box>
                </div>
            </CardContent>
            
            </Card>
            
            </>
        ))}
        <Container style={{maxWidth:'90%',marginLeft:10,position:'absolute',bottom:10,width:'90%',padding:2}}>
            <Paper className="taxes" style={{display:'flex',borderBottom:'1px solid',justifyContent:'space-between',padding:2,marginBottom:3}}>
                <Typography fontWeight="md" fontSize="xl" >Taxes</Typography>
                <Typography fontWeight="md" style={{right:0,fontWeight:'bold'}}>0% = 0đ</Typography>
            </Paper>
            <Paper className="taxes" style={{display:'flex',borderBottom:'1px solid',justifyContent:'space-between',padding:2,marginBottom:3}}>
                <Typography fontWeight="md">Shipping</Typography>
                <Typography  fontWeight="md" style={{right:0,fontWeight:'bold'}}>Calculate on checkout</Typography>
            </Paper>
            <Paper className="taxes" style={{display:'flex',borderBottom:'1px solid',justifyContent:'space-between',padding:2,marginBottom:3}}>
                <Typography fontWeight="md">Total</Typography>
                <Typography fontWeight="md" style={{right:0,fontWeight:'bold'}}>{total}</Typography>
            </Paper>
            <Button  variant='outlined' sx={{
                '&:hover':{backgroundColor:'green',color:'white'},
                margin:3,
                maxWidth:'50%',
                align:'center'
            }}>Check Out</Button>
        </Container>
        </>
    )
}

export default CartItem;