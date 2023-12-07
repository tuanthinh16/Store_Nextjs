'use client'
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { useRouter } from 'next/navigation';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { signOut, useSession } from "next-auth/react";



export default function ColorInversionMarketing() {
    const route = useRouter();
    const [color, setColor] = React.useState<ColorPaletteProp>('primary');
    const token = getCookie('token')||'';
    const { data: session }: any = useSession();
    // console.log("session",session);
    return (
        <Sheet
        variant="solid"
        color={color}
        invertedColors
        sx={{
            flexGrow: 1,
            display: 'flex',
            bgcolor: color === 'primary' ? '#042449' : undefined,
            p: { xs: '36px', md: '70px' },
            pt: { xs: '24px', md: '60px' },
            borderRadius: 'lg',
            overflow: 'hidden',
            '& button': { borderRadius: 'xl' },
        }}
        >
        <Box sx={{ zIndex: 1, position: 'relative' }}>
            <Typography sx={{ mt: 0.5, mb: 2 ,fontWeight:'bold'}}>Hi {session?.user?.name['firstname']}{" "}{session?.user?.name['lastname']}</Typography>
            <Typography sx={{ mt: 0.5, mb: 2 }}>
                {'Make your life become more beautiful'}
                {"Khám phá thế giới thời trang tại cửa hàng của chúng tôi, nơi bạn sẽ bắt gặp sự đa dạng với những mẫu giày và đồ áo đi hàng đầu. Từ phong cách đơn giản đến năng động, chúng tôi cam kết mang đến cho bạn những trải nghiệm mua sắm không giới hạn với chất lượng và phong cách độc đáo."}
            </Typography>
            <Box
            sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                maxWidth: 'max-content',
                '& > *': { flexGrow: 1, fontWeight: 'lg' },
            }}
            >
            {!session &&(
                <Button sx={{ minWidth: 120 }} onClick={()=>route.push('/user/Login')}>Login</Button>
            )}
            <Button
                variant="plain"
                endDecorator={<ArrowForwardIcon />}
                sx={{
                '&:hover': { '--Button-gap': '0.625rem' },
                '& span': { transition: '0.15s' },
                }}
                onClick={()=>route.push('/Products')}
            >
                Shopping Now
            </Button>
            </Box>
        </Box>
        <Box
            component="img"
            alt=""
            src="https://storage.googleapis.com/cms-storage-bucket/72521e62275b24d3c37d.png"
            sx={{ position: 'absolute', height: '100%', top: 0, right: 0 }}
        />
        <IconButton
            sx={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            borderRadius: '50%',
            }}
            onClick={() => {
            const colors: ColorPaletteProp[] = [
                'primary',
                'neutral',
                'danger',
                'success',
                'warning',
            ];
            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
            }}
        >
            <ColorLensRoundedIcon fontSize="small" />
        </IconButton>
        </Sheet>
    );
}