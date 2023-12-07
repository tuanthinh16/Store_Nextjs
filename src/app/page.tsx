'use client'
import Image from 'next/image'
import Header from './components/Header'
import ColorInversionMarketing from './components/New'
import { Container } from '@mui/material'
import ProductItem from './ITEM/ProductItem'
import * as React from 'react';
import axios from 'axios'
import Loading from './loading';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, extendTheme } from '@mui/joy'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session }: any = useSession();
  const [product,setProduct] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const range = 10;
  React.useEffect(()=>{
    fetchData();
  },[]);
  const fetchData =()=>{
      setLoading(true)
      const url="/api/product?limit="+range;
      axios.get(url)
      .then(response =>{
          setProduct(response.data['data'])
      })
      .catch(error=>{
          console.error("Err: "+error)
      })
      .finally(() => {
        setLoading(false);
      });
  }     

  return (

    <Container style={{maxWidth:'100%'}}>
      <ColorInversionMarketing/>
      <div style={{display:'flex',flexWrap:'wrap',marginTop:50}}>
      {loading?(
        <LoadingCard />
      ):(
        <ProductItem product={product} fallback={<Loading />}/>
      )}
      </div>
    </Container>
  )
}
const theme = extendTheme({
  components: {
    JoySkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
  },
});
const LoadingCard = ()=>{
  return (
    <CssVarsProvider theme={theme}>
    <Card variant="outlined" sx={{ width: 343, display: 'flex', gap: 2 }} >
      <AspectRatio ratio="21/9">
        <Skeleton variant="overlay">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </Skeleton>
      </AspectRatio>
      <Typography>
        <Skeleton>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and
          publishing industries.
        </Skeleton>
      </Typography>
    </Card>
    </CssVarsProvider>
  )
}
