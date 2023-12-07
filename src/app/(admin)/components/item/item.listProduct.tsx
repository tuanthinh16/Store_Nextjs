import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form, Modal, Table } from 'react-bootstrap'
import { makeUploadRequest } from './uploadImage';
import Spinner from 'react-bootstrap/Spinner';

const ListProduct = ({product}:any) => {
    const [showadd,setShowadd] = useState(false);
    console.log("Data product: ",product)
    let count = 1;
    const onClickAdd =()=>{
        setShowadd(true);
    }
    return (
        <Container>
            <div style={{display:'flex',position:'relative'}}>
                <h3>Product List</h3>
                <div style={{position:'absolute',right:'3rem'}}>
                    <Button variant='success' onClick={onClickAdd}>ADD</Button>
                </div>
            </div>
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {product?.map(async (row:any,index:number)=>(
                        <tr key={index}>
                            <td>{count++}</td>
                            <td style={{color:'green',fontSize:'small'}}>{row['_id']}</td>
                            <td>{row['title']}</td>
                            <td>{row['category']}</td>
                            <td style={{maxHeight:'100px',overflowY:'auto'}}>{row['description']}</td>
                            <td style={{}}>
                                {row['imageUrl']?.map((imageUrl:string,index:number)=>(
                                    <Link href={imageUrl} style={{textDecoration:'none',marginLeft:5}} key={index}>{'Image'}{index}</Link>
                                ))}
                            </td>
                            <td>{row['price']}</td>
                            <td>{row['rating']?.['rate']}</td>
                            <td colSpan={2}>
                                <Button variant='outlined'>Edit</Button>
                                <Button variant='outlined'>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal
                    size="lg"
                    show={showadd}
                    onHide={() => setShowadd(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {'Add Product'}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body><AddProduct/></Modal.Body>
                </Modal>
        </Container>
    )
}

export default ListProduct;

const AddProduct = ()=>{
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
    const [product,setProduct] = useState({title:'',description:'',category:'',price:'',rating:{rate:5,count:1}});
    const onValueChange =(_key:any)=>(e:any)=>{
        setProduct((prev)=>({...prev,[_key]:e.target.value}));
    }
    const [uploaded,setUploaded] = useState(false);

    const onAdd = async () => {
            const Fdata = new FormData();
            Fdata.append('title',product.title);
            Fdata.append('description',product.description);
            Fdata.append('price',product.price);
            Fdata.append('cate',product.category);
            Fdata.append('imageUrl',JSON.stringify(fileName));
            Fdata.append('rating',JSON.stringify(product.rating))
            
            console.log('image: ',JSON.stringify(fileName));
            const url="/api/product";
            axios({
                method:"post",
                url: url,
                data:Fdata,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response =>{
                if(response.status===200){
                    console.log("add thanh cong",response.data);
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
        <Container>
            
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name </Form.Label>
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
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={onValueChange('description')}/>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Image Product</Form.Label>
                <Form.Control type="file" multiple  onChange={handleFileChange}/>
                {selectedFiles.length > 0 && (
                    <div>
                    <strong>Selected Files:</strong>
                    <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                        <li key={index}>{file['name']}</li>
                        ))}
                    </ul>
                    </div>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Price </Form.Label>
                <Form.Control type="text" required onChange={onValueChange('price')}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{alignContent:'center'}}>
                {uploaded?(
                    <Button variant='success' style={{width:'30%',margin:'auto'}} onClick={onAdd}>ADD</Button>
                ):(
                    <Spinner animation="border" variant="warning" />
                )}
            </Form.Group>
            </Form>
        </Container>
    )
}