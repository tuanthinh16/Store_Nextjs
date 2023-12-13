import { Button } from '@mui/joy';
import Link from 'next/link';
import React from 'react'

const tag = [
    {
        title:'Products',
        nav:'/adminpage/Products'
    },
    {
        title:'Categories',
        nav:'/adminpage/Categories'
    },
    {
        title:'Accounts',
        nav:'/adminpage/Accounts'
    },

]
const MenuItem = () => {
    return (
        <div className='text-md bg-gray-500 max-w-xs left-6 top-16 rounded-lg p-4 pl-2 md:'>
            <h1 className='text-white'>Dashboard</h1>
            <div className='mb-2 w-full grid'>
                {tag.map((row:any,index:number)=>(
                    <Link href={row.nav} key={index} className='no-underline text-xl  m-3 p-2 rounded-lg font-bold text-white hover:bg-slate-300'>{row.title}</Link>
                ))}
            </div>
            <div className='items-center'>
                <Button variant='outlined' color='danger' className='text-white p-2 w-30 font-bold hover:bg-red-600 hover:w-40 hover:rounded-none ml-10' >Logout</Button>
            </div>
        </div>
    )
}

export default MenuItem;