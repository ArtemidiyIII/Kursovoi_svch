import React, {useEffect, useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import { Context } from '../../index';
import { fetchTypes, fetchBrands, createRentedItem} from '../../http/rentItemAPI';
import { observer } from 'mobx-react-lite';

    
const СreateRentedItem = observer( ({show,onHide}) => {
    const {rented_items} = useContext(Context)
    const [name, setName]=useState('')
    const [price, setPrice]=useState(0)
    const [file, setFile]=useState(null)    
    const [info , setInfo]=useState([])

useEffect(() => {
    fetchTypes().then(data=>rented_items.setTypes(data))
    fetchBrands().then(data=>rented_items.setBrands(data))
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
    const addRentItem = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', rented_items.selectedBrand.id);
        formData.append('typeId', rented_items.selectedType.id);
    
        
        const updatedInfo = info.map(i => ({
            ...i,
            rented_itemId: null 
        }));
    
        formData.append('info', JSON.stringify(updatedInfo));
    
        createRentedItem(formData).then(data => {
           
            const rented_itemId = data.id; 
            const updatedInfoWithRentItemId = updatedInfo.map(i => ({
                ...i,
                rented_itemId: rented_itemId
            }));
            setInfo(updatedInfoWithRentItemId);  
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
                    Добавить новое снаряжение
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2'>
                        <Dropdown.Toggle>{rented_items.selectedType.name || "Выбрать тип снаряжения"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {rented_items.types.map(type=>
                                <Dropdown.Item onClick={()=>rented_items.setSelectedType(type)} key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2'>
                        <Dropdown.Toggle>{rented_items.selectedBrand.name || "Выбрать бренд снаряжения"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {rented_items.brands.map(brand=>
                                <Dropdown.Item onClick={()=>rented_items.setSelectedBrand(brand)} key={brand.id}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className='mt-2'
                        placeholder='название снаряжения'/>
                    <Form.Control
                        value={price}
                        onChange={e=>setPrice(Number(e.target.value))}
                        className='mt-2'
                        placeholder='цена проката снаряжения'
                        type="number"/>
                    <Form.Control
                        className='mt-2'
                        placeholder='фото снаряжения'
                        onChange={selectFile}
                        type="file"/>
                    <hr></hr>
                    <Button variant='ouline-dark'
                    onClick={addInfo}>Добавить дополнительную информацию</Button>
                    {info.map(i=>
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e)=>changeInfo('title', e.target.value, i.number)}
                                placeholder='заголовок'
                            />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e)=>changeInfo('description', e.target.value, i.number)}
                                    placeholder='описание'
                                />
                            </Col>
                            <Col md={4}>
                                <Button variant='outline-danger' onClick={()=>removeInfo(i.number)}>Удалить</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={addRentItem}>Добавить</Button>
            <Button variant='outline-success' onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
        </Modal>
    );
})

export default СreateRentedItem;