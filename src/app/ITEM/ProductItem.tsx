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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Image from 'next/image';

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

    const handleAddCart = (data:Product)=>{
        data.options.size = selectedValue;
        data.options.color = selectedColor;
        dispatch(increment(data));
        enqueueSnackbar('Add to cart successful', {variant:'success'})
    }
    return (
        <div className='flex flex-wrap ml-2'>
            {product?.map((item:any,index:number)=>(
                <div key={index} className='w-[300px] bg-slate-300 rounded-lg relative m-3 shadow-xl'>
                    <div className='h-[200px] text-center p-3 font-semibold text-2xl'>{item.title}</div>
                    <div>
                        <Image src={item.imageUrl[0]} alt="image" width={250} height={250} className=' mx-[25px] absolute top-[60px] rounded-3xl shadow-2xl'/>
                    </div>
                    <div className='bg-gradient-to-b from-slate-300 to-amber-400 pb-3 rounded-t-lg pt-[120px] text-lg pl-5 font-normal'>
                        <p className='cursor-pointer'>
                            <CategoryOutlinedIcon fontSize='medium' className='mr-2 '/>
                            {item.category}
                        </p>
                        <p>
                            <LocalShippingOutlinedIcon className='mr-2'/>
                            Delivery on 3 days
                        </p>
                        <p>
                            <MonetizationOnOutlinedIcon className='mr-2'/>
                            {parseInt(item.price)}{'K'}
                        </p>
                    </div>
                    <div className='grid grid-cols-2 p-3 items-center text-center font-medium bg-slate-200 rounded-b-lg'>
                        <div className=' rounded-lg hover:bg-gradient-to-br from-green-300 to-blue-600 p-2 mr-2'>
                            <button className='font-bold hover:text-white' onClick={()=> handleAddCart(item)}>ADD CART</button>
                        </div>
                        <div className='rounded-lg hover:bg-gradient-to-br from-orange-300 to-gray-600 p-2'>
                            <button className='font-bold hover:text-white' onClick={()=> route.push('/Products/' + item._id)}>VIEW</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductItem;
