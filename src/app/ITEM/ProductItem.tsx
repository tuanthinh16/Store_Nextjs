
import * as React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import StarRating from './Rating';
import StarIcon from '@mui/icons-material/Star';

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
    return (
        <>
        {product?.map((row:any,index:number)=>(
            <Card
            color="primary"
            invertedColors={false}
            size="lg"
            variant="soft"
            sx={{ width: 300 , margin: 2}}
            key={index}
            >
            <Typography level="title-lg">{row.title}</Typography>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img src={row && row.imageUrl && row.imageUrl[0] ? row.imageUrl[0] : 'fallback_image_url'} width={300}height={300} alt='img'/>
            </AspectRatio>
            <div>
                
                <Typography level="body-sm">{row.description}</Typography>
                <div style={{display:'flex'}}>
                    <p style={{paddingTop:7 ,display:'flex'}}>{"("}{row['rating']?.['count']}{")"}{row['rating']?.['rate']}<StarIcon fontSize='small'style={{color:'rgb(187, 149, 26)'}}/></p>
                    <StarRating initialRating={row['rating']?.['rate']}/> 
                </div>
                <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                >
                love
                </IconButton>
            </div>
            <CardContent orientation="horizontal">
                <div>
                <Typography level="body-xs">Price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                    {row.price}{".000đ"}
                </Typography>
                
                </div>
                <MyButton
                variant="soft"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600,width:'45%' }}
                onClick={()=>route.push("/Products/"+row['_id'])}
                >
                See
                </MyButton>
            </CardContent>
            </Card>
        ))}
        </>
    )
}

export default ProductItem