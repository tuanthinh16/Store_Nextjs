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
import useLocalStorageState from 'use-local-storage-state';
import { useAppDispatch } from '../store/store';
import { increment } from '../store/features/cartSlice';
import { Product } from '../models/interface';
import { useSnackbar } from 'notistack';
import { Box, FormLabel, Radio, RadioGroup, Sheet, radioClasses } from '@mui/joy';
import { Done } from '@mui/icons-material';


const ProductItem = ({product}:any) => {
    const dispatch = useAppDispatch();
    const [quantity,setQuantity]= React.useState(1);
    const [cart,setCart] = useLocalStorageState('cart',{});
    const [size,setSize] = React.useState(0);
    const {enqueueSnackbar} = useSnackbar();
    const handleQuantityChange = (newQuantity: any) => {
        setQuantity(newQuantity);
    };
    const route = useRouter();
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    const [selectedColor, setSelectedColor] = React.useState('');

    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
    };

    console.log(product);
    const handleAddCart = (data:Product)=>{
        data.options.size = selectedValue;
        data.options.color = selectedColor;
        dispatch(increment(data));
        enqueueSnackbar('Add to cart successful', {variant:'success'})
    }
    return (
        <>
        {product?.map((row:any,index:number)=>(
            <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg',marginLeft:5,marginBottom:5 }} key={index}>
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
                                    width: 40,
                                    height: 40,
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
                                    sx={{}}
                                    label={item}
                                    onChange={handleChangeColor}
                                />
                            </Sheet>
                            ))}
                        </RadioGroup>
                        </Box>
                </CardContent>
                <CardOverflow>
                <Button variant="soft" color="danger" size="lg" onClick={()=> handleAddCart(row)}>
                    Add to cart
                </Button>
                </CardOverflow>
            </Card>
        ))}
        </>
    )
}

export default ProductItem