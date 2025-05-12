import React, {useEffect, useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import { Context } from '../..';
import { fetchTypes, fetchBrands, createGood} from '../../http/goodAPI';
import { observer } from 'mobx-react-lite';

    
const CreateGood= observer( ({show,onHide}) => {
    const {goods} = useContext(Context)
    const [name, setName]=useState('')
    const [price, setPrice]=useState(0)
    const [file, setFile]=useState(null)    
    const [info , setInfo]=useState([])

useEffect(() => {
    fetchTypes().then(data=>goods.setTypes(data))
    fetchBrands().then(data=>goods.setBrands(data))
    }, [])

    const selectFile=e=>{
        setFile(e.target.files[0])
    }

    const addInfo=()=>{
        setInfo([...info, {title: '',description: '', number: Date.now()}])
    }
    const changeInfo=(key,value,number)=>{
        setInfo(info.map(i=>i.number === number ? {...i, [key]: value} : i))
    }
    const removeInfo=(number)=>{
        setInfo(info.filter(i=> i.number!== number))
    }
    const addGood = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', goods.selectedBrand.id);
        formData.append('typeId', goods.selectedType.id);
    
        
        const updatedInfo = info.map(i => ({
            ...i,
            goodId: null 
        }));
    
        formData.append('info', JSON.stringify(updatedInfo));
    
        createGood(formData).then(data => {
           
            const goodId = data.id; 
            const updatedInfoWithGoodId = updatedInfo.map(i => ({
                ...i,
                goodId: goodId
            }));
            setInfo(updatedInfoWithGoodId);  
              onHide();
        });
    };
    
        

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{goods.selectedType.name || "Choose type"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {goods.types.map(type=>
                        <Dropdown.Item onClick={()=>goods.setSelectedType(type)} key={type.id}>
                            {type.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{goods.selectedBrand.name || "Choose brand"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {goods.brands.map(brand=>
                        <Dropdown.Item onClick={()=>goods.setSelectedBrand(brand)} key={brand.id}>
                            {brand.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
            value={name}
                    onChange={e=>setName(e.target.value)}
            className='mt-2'
            placeholder='name of product'/>
            <Form.Control
             value={price}
                    onChange={e=>setPrice(Number(e.target.value))}
            className='mt-2'
            placeholder='price of product'
            type="number"/>
            <Form.Control
            className='mt-2'
            placeholder='image of product'
            onChange={selectFile}
            type="file"/>
            <hr></hr>
            <Button variant='ouline-dark'
            onClick={addInfo}>Add new property</Button>
            {info.map(i=>
                <Row className='mt-2' key={i.number}>
                    <Col md={4}>
                    <Form.Control
                    value={i.title}
                    onChange={(e)=>changeInfo('title', e.target.value, i.number)}
                        placeholder='title'
                    />
                    </Col>
                    <Col md={4}>
                    <Form.Control
                     value={i.description}
                     onChange={(e)=>changeInfo('description', e.target.value, i.number)}
                        placeholder='description'
                    />
                    </Col>
                    <Col md={4}>
                        <Button variant='outline-danger' onClick={()=>removeInfo(i.number)}>Delete</Button>
                    </Col>
                </Row>
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={addGood}>Add</Button>
        <Button variant='outline-success' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateGood;