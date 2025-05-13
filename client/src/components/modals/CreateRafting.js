import React, {useEffect, useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import { Context } from '../../index';
import { fetchRivers, fetchWeekdays, createRafting} from '../../http/raftingAPI';
import { observer } from 'mobx-react-lite';

    
const CreateRafting = observer( ({show,onHide}) => {
    const {raftings} = useContext(Context)
    const [name, setName]=useState('')
    const [price, setPrice]=useState(0)
    const [discount_price, setDiscountPrice] = useState(0)
    const [file, setFile]=useState(null)    
    const [info , setInfo]=useState([])

useEffect(() => {
    fetchRivers().then(data=>raftings.setRivers(data))
    fetchWeekdays().then(data=>raftings.setWeekdays(data))
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
    const addRafting = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('discount_price', `${discount_price}`);
        formData.append('img', file);
        formData.append('weekdayId', raftings.selectedWeekday.id);
        formData.append('riverId', raftings.selectedRiver.id);
    
        
        const updatedInfo = info.map(i => ({
            ...i,
            raftingId: null 
        }));
    
        formData.append('info', JSON.stringify(updatedInfo));
    
        createRafting(formData).then(data => {
           
            const raftingId = data.id; 
            const updatedInfoWithRaftingId = updatedInfo.map(i => ({
                ...i,
                raftingId: raftingId
            }));
            setInfo(updatedInfoWithRaftingId);  
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
                Добавить новый сплав на байдарке
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className='mt-2'>
                    <Dropdown.Toggle>{raftings.selectedRiver.name || "Выбрать реку"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {raftings.rivers.map(river=>
                            <Dropdown.Item onClick={()=>raftings.setSelectedRiver(river)} key={river.id}>
                                {river.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{raftings.selectedWeekday.name || "Выбрать день"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {raftings.weekdays.map(weekday=>
                        <Dropdown.Item onClick={()=>raftings.setSelectedWeekday(weekday)} key={weekday.id}>
                            {weekday.name}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                value={name}
                onChange={e=>setName(e.target.value)}
                className='mt-2'
                placeholder='название сплава'/>
            <Form.Control
                value={price}
                onChange={e=>setPrice(Number(e.target.value))}
                className='mt-2'
                placeholder='цена сплава'
                type="number"/>
            <Form.Control
                value={discount_price}
                onChange={e=>setDiscountPrice(Number(e.target.value))}
                className='mt-2'
                placeholder='цена по скидке'
                type="number"/>
            <Form.Control
                className='mt-2'
                placeholder='фотография сплава'
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
            <Button variant='outline-danger' onClick={addRafting}>Добавить</Button>
            <Button variant='outline-success' onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
  );
})

export default CreateRafting;