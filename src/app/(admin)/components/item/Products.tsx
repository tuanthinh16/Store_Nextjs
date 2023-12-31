'use client'
import { Product } from '@/app/models/interface';
import { FavoriteBorder } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Divider, Grid, IconButton, LinearProgress, Sheet, Typography, styled } from '@mui/joy';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { makeUploadRequest } from './uploadImage';
import { useRouter } from 'next/navigation';
import { FloatingLabel, Form } from 'react-bootstrap';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
}));


const Products = () => {
    const [product,setProduct] = React.useState<any[]>([]);
    React.useEffect(()=>{
        fetchData();
    },[]);
    const fetchData =()=>{
        const url="/api/product";
        axios.get(url)
        .then(response =>{
            setProduct(response.data['data']);
            console.log("data lay duoc: ",response.data['data'])
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
    }     
    return (
        <>
        <Typography fontSize='large' sx={{padding:3,fontWeight:'bold',color:'rgb(123,123,123)'}}>Manage Products</Typography>
        <LinearProgress color="success" variant="soft" />
        <div className='grid md:grid-cols-3 grid-cols-1 p-2 mr-5'>
            <div className='md:col-span-1 ml-5 shadow-lg'>
                <AddProduct/>
            </div>
            <div className='flex flex-wrap col-span-2'>
                <BottomActionsCard products ={product}/>    
            </div>
        </div>
        </>
    )
}

export default Products;
const  BottomActionsCard = ({products}:any)=> {
    const route = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const onDelete = (_id:string)=>{
        const url="/api/product?id="+_id;
        axios.delete(url)
        .then(response =>{
            
            enqueueSnackbar('Delete product success',{variant:'success'});
            window.location.reload();
        })
        .catch(error=>{
            enqueueSnackbar('Delete product not complete',{variant:'error'})
            console.error("Err: "+error)
        });
        
    }
    return (
        <div className='flex flex-wrap ml-5 '>
        {products?.map((item:any,index:number)=>(
            <Card
                variant="outlined"
                sx={{
                    width: 200,
                    // to make the card resizable
                    display:'flex',
                    overflow: 'auto',
                    resize: 'horizontal',
                    margin:2,
                    backgroundColor:'rgba(136, 132, 132, 0.575)'
                    // backgroundImage:`url(${item.imageUrl[0]})`,
                    
                }}
                key={index}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar src="/static/images/avatar/1.jpg" size="lg" />
                    <Typography sx={{color:'green'}}>{item.category}</Typography>
                </Box>
                <CardContent sx={{maxHeight:150,overflow:'auto'}}>
                    <Typography level="title-lg">{item.title}</Typography>
                    <Typography level="body-sm">
                        {item.description}
                    </Typography>
                    
                </CardContent>
                
                <CardActions buttonFlex="0 1 120px">
                <Divider orientation="horizontal" inset="context"/>
                    
                    <Button variant="soft" color="warning">
                        Edit
                    </Button>
                    <Button variant="soft" color="danger" onClick={()=> onDelete(item._id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        ))}
        </div>
    );
}
const AddProduct = ()=>{
    const {enqueueSnackbar} = useSnackbar();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [cate,setCate] = React.useState<any[]>([]);
    React.useEffect(()=>{
        fetchData();
        
    },[]);
    const fetchData =()=>{
        const url="/api/category";
        axios.get(url)
        .then(response =>{
            setCate(response.data['data']);
        })
        .catch(error=>{
            console.error("Err: "+error)
        });
    } ;
    const handleFileChange = async (event:any) => {
        const files = event.target.files;
        for(let i =0; i<files.length; i++) {
            const file = files[i];
            try {
                await makeUploadRequest({
                file,
                fieldName: file['name'], // You can customize this if needed
                progressCallback: (isComputable, loaded, total) => {
                  // Handle progress if needed
                },
                successCallback: (res:any) => {
                    console.log("add file success")
                    const fileUrls: string[] = Array.isArray(res.url) ? res.url : [res.url];
                    setFileName((prevFileNames) => [...prevFileNames, ...fileUrls]);
                    //
                },
                errorCallback: (error) => {
                  // Handle error if needed
                    console.error('Error uploading file:', error);
                },
            });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        if(selectedFiles.length == fileName.length){
            setUploaded(true);
        }
    };
    const [fileName,setFileName] = useState <string[]>([]);
    const [product,setProduct] = useState({title:'',description:'',category:'',price:'',rating:{rate:5,count:1},options:{size:'',color:''}});
    const onValueChange =(_key:any)=>(e:any)=>{
        setProduct((prev)=>({...prev,[_key]:e.target.value}));
    }
    const [uploaded,setUploaded] = useState(false);
    const route = useRouter();
    const handleChangeOptions = (_key:string) =>(e: React.ChangeEvent<HTMLInputElement>)=> {
        setProduct((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                [_key]: e.target.value
            }
            }));
    };
    console.log("options",product.options);
    const onAdd = async () => {
            // console.log('image: ',JSON.stringify(fileName));
            
            const formData = {
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                imageUrl:JSON.stringify(fileName),
                rating:JSON.stringify(product.rating),
                options:JSON.stringify(product.options)
            }
            console.log("formData",formData);
            const url="/api/product";
            axios({
                method:"post",
                url: url,
                data:formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response =>{
                if(response.status===200){
                    enqueueSnackbar('Add product success',{variant:'success'});
                    console.log("add thanh cong",response.data);
                    route.refresh();
                }
            })
            .catch(error=>{
                console.error("Err: "+error)
            }); 
    };
    
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        setProduct((prevProduct) => ({
            ...prevProduct,
            category: selectedCategory,
        }));
    };
    
    return(
        <div className='shadow-lg dark:bg-slate-500 dark:text-white p-5'>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{marginLeft:1,float:'left',fontWeight:'bold',fontSize:'medium'}}>Name </Form.Label>
                <Form.Control type="text" required onChange={onValueChange('title')} />
            </Form.Group>
            <FloatingLabel controlId="floatingSelect" label="Category">
                <Form.Select aria-label="Default select example "onChange={handleCategoryChange}>
                    {cate?.map((row:any, index:number)=>(
                        <option key={index}value={row['name']}>{row['name']}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{marginLeft:1,float:'left',fontWeight:'bold',fontSize:'medium'}}>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={onValueChange('description')}/>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label style={{marginLeft:1,float:'left',fontWeight:'bold',fontSize:'medium'}}>Image Product</Form.Label>
                <Form.Control type="file" multiple  onChange={handleFileChange}/>
                {selectedFiles.length > 0 && (
                    <Container>
                    <strong>Selected Files:</strong>
                    <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                        <li key={index}>{file['name']}</li>
                        ))}
                    </ul>
                    </Container>
                )}
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                <Form.Label style={{marginLeft:1,float:'left',fontWeight:'bold',fontSize:'medium'}}>Price </Form.Label>
                <Form.Control type="text" required onChange={onValueChange('price')}/>
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                <Form.Label style={{marginLeft:1,float:'left',fontWeight:'bold',fontSize:'medium'}}>Size </Form.Label>
                <Form.Control type="text" required onChange={handleChangeOptions('size')}/>
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                <Form.Label style={{marginLeft:1,float:'left',fontWeight:'bold',fontSize:'medium'}}>Color </Form.Label>
                <Form.Control type="text" required onChange={handleChangeOptions('color')}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{alignContent:'center'}}>
                {uploaded?(
                    <Button variant='soft' style={{width:'30%',margin:'auto'}} onClick={onAdd}>ADD</Button>
                ):(
                    <>
                        {/* <Button variant='soft' style={{width:'30%',margin:'auto'}} onClick={onAdd}>ADD</Button> */}
                        <CircularProgress variant='solid' color="success" /><p>{'Uploading Image'}</p>
                    </>
                )}
            </Form.Group>
            </Form>
        </div>
    )
}