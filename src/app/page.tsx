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
import { SnackbarProvider } from 'notistack'
import BootstrapCarousel from './components/app.carousel'
import { Diversity2Outlined } from '@mui/icons-material'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


export default function Home() {
  const { data: session }: any = useSession();
  const [product,setProduct] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const range = 5;
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
    <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="light">
      <SnackbarProvider maxSnack={3}>
        <Container style={{maxWidth:'100%'}}>
          <div className='py-3'>
            <ColorInversionMarketing/>
            <BootstrapCarousel/>
          </div>
          <div>
          <p className='px-3 py-4 mt-10 text-3xl font-semibold'>Something options we choose for you</p> 
            {loading?(
              <LoadingCard />
            ):(
                <ProductItem product={product} fallback={<Loading />}/>
            )}
          
          </div>
        </Container>
      </SnackbarProvider>
    </NextThemesProvider>
    </NextUIProvider>
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
    <div className='flex flex-wrap gap-3'>
      <div>
        <CssVarsProvider theme={theme}>
          <Card variant="outlined" sx={{ width: 300, display: 'flex', gap: 2 }} >
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
      </div>
      <div>
        <CssVarsProvider theme={theme}>
          <Card variant="outlined" sx={{ width: 300, display: 'flex', gap: 2 }} >
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
      </div>
      <div>
        <CssVarsProvider theme={theme}>
          <Card variant="outlined" sx={{ width: 300, display: 'flex', gap: 2 }} >
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
      </div>
      <div>
        <CssVarsProvider theme={theme}>
          <Card variant="outlined" sx={{ width: 300, display: 'flex', gap: 2 }} >
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
      </div>
      <div>
        <CssVarsProvider theme={theme}>
          <Card variant="outlined" sx={{ width: 300, display: 'flex', gap: 2 }} >
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
      </div>
      
    </div>
  )
}
