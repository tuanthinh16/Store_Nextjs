'use client'
import { SetStateAction, useState } from "react";
import { items } from "./item.json";
import { Carousel } from "react-bootstrap";
import React from "react";
import Image from "next/image";
export default function BootstrapCarousel() {
    const { bootstrap } = items;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };
    const [size,setStize] = React.useState(true);
    const [mobile,setMobile] = React.useState(false);
    React.useEffect(() => {
        const handleResize = () => {
            setStize(window.innerWidth > 1000);
            setMobile(window.innerWidth < 400);
            
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
        <Carousel activeIndex={index} onSelect={handleSelect}  className="rounded-md py-3">
        {bootstrap.map((item) => (
            <Carousel.Item key={item.id}  interval={4000}>
                <img src={item.imageUrl} alt="slides" width='100%' className="h-[300px] md:h-[500px] lg:h-[700px]"/>
            <Carousel.Caption >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                
                <button className="py-1 px-4 mt-2 rounded-2xl bg-red-500">Connect</button>
            </Carousel.Caption>
            </Carousel.Item>
        ))}
        </Carousel> 
        </>
    );
}