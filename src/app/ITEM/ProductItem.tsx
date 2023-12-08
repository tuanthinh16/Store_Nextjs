'use client'
import * as React from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import StarRating from './Rating';

const MyButton = styled(Button)`
    &&:hover{
        width: 50%;
        background-color: #107919a2;
        font-weight: bold;
        color: white;
    }
`
const ProductItem = ({product}:any) => {
    const [quantity,setQuantity]= React.useState(1);
    const handleQuantityChange = (newQuantity: any) => {
        setQuantity(newQuantity);
    };
    const route = useRouter();
    console.log(product)
    return (
        <>
        {product?.map((row:any,index:number)=>(
            <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg',marginLeft:5 }} key={index}>
                <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                    <img
                    src={row.imageUrl[0]}
                    loading="lazy"
                    alt=""
                    />
                </AspectRatio>
                </CardOverflow>
                <CardContent>
                <Typography level="body-xs">{row.category}</Typography>
                <Link
                    href={'/Products/' + row._id}
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                    endDecorator={<ArrowOutwardIcon />}
                >
                    {row.title}
                </Link>
        
                <Typography
                    level="title-lg"
                    sx={{ mt: 1, fontWeight: 'xl' }}
                    endDecorator={
                    <Chip component="span" size="sm" variant="soft" color="success">
                        Lowest price
                    </Chip>
                    }
                >
                    {row.price}{'.000đ'}
                </Typography>
                <Typography level="body-sm">
                    (Only <b>7</b> left in stock!)
                    <StarRating initialRating={row['rating']?.['rate']}/>
                </Typography>
                </CardContent>
                <CardOverflow>
                <Button variant="soft" color="danger" size="lg">
                    Add to cart
                </Button>
                </CardOverflow>
            </Card>
        ))}
        </>
    )
}

export default ProductItem