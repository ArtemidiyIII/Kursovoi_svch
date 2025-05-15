import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateRentItem from '../components/modals/CreateRentItem';
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import { fetchTypes, fetchBrands, fetchRentedItems, deleteType, deleteBrand, deleteRentedItem } from '../http/rentItemAPI';
import { Dropdown, Row, Col, ListGroup } from 'react-bootstrap';

const RentManagement = observer(() => {
    const { rented_items } = useContext(Context);
    const [brandVisiable, setBrandVisiable] = useState(false);
    const [typeVisiable, setTypeVisiable] = useState(false);
    const [rentedItemVisiable, setRentedItemsVisiable] = useState(false);
    const [editingType, setEditingType] = useState(null);
    const [editingBrand, setEditingBrand] = useState(null);
    const [editingRentedItem, setEditingRentedItems] = useState(null);
    useEffect(() => {
        fetchTypes().then(data => rented_items.setTypes(data));
        fetchBrands().then(data =>{rented_items.setBrands((data))});
        fetchRentedItems().then(data => {
        rented_items.setRentedItems(data.rows); 
        });
    }, [rented_items]);

    const handleDeleteType = async (id) => {
        try {
        await deleteType(id);
        alert('Тип дополнительного снаряжения успешно удален!');
        fetchTypes().then(data => rented_items.setTypes(data));
        } catch (error) {
        alert('Не удалось удалить тип: ' + error.response?.data?.message || error.message);
        }
    };

    const handleDeleteBrand = async (id) => {
        try {
        await deleteBrand(id);
        alert('Бренд дополнительного снаряжения успешно удален!');
        fetchBrands().then(data => rented_items.setBrands(data));
        } catch (error) {
        alert('Не удалось удалить бренд: ' + error.response?.data?.message || error.message);
        }
    };

    const handleDeleteRentedItems = async (id) => {
        try {
        await deleteRentedItem(id);
        alert('Дополнительное снаряжение успешно удалено!');
        fetchRentedItems().then(data => rented_items.setRentedItems(data));
        } catch (error) {
        alert('Не удалось удалить дополнительное снаряжение: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <Container className='d-flex flex-column'>
        <Row md={5}>
            <Col>
            <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingType(null); setTypeVisiable(true); }}>
                Добавить тип дополнительного снаряжения
            </Button>
            </Col>
            <Col>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{rented_items.selectedType?.name || "Выберите тип снаряжения для изменения"}</Dropdown.Toggle>
                <Dropdown.Menu>
                {rented_items.types.map(type =>
                    <Dropdown.Item
                    key={type.id}
                    onClick={() => {
                        rented_items.setSelectedType(type);
                        setEditingType(type); 
                        setTypeVisiable(true);
                    }}
                    >
                    {type.name}
                    <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteType(type.id);
                        }}
                    >
                        Удалить
                    </Button>
                    </Dropdown.Item>
                )}
                </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>

        <Row md={5}>
            <Col>
            <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingBrand(null); setBrandVisiable(true); }}>
                Добавить бренд дополнительного снаряжения
            </Button>
            </Col>
            <Col>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{rented_items.selectedBrand?.name || "Выберите бренд снаряжения для изменения"}</Dropdown.Toggle>
                <Dropdown.Menu>
                {rented_items.brands.map(brand =>
                    <Dropdown.Item
                    key={brand.id}
                    onClick={() => {
                        rented_items.setSelectedBrand(brand);
                        setEditingBrand(brand); 
                        setBrandVisiable(true);
                    }}
                    >
                    {brand.name}
                    <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBrand(brand.id);
                        }}
                    >
                        Удалить
                    </Button>
                    </Dropdown.Item>
                )}
                </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>

        <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingRentedItems(null); setRentedItemsVisiable(true); }}>
            Добавить дополнительное снаряжение 
        </Button>

        <h4 className='mt-4'>Дополнительное снаряжение, которое вы можете удалить</h4>
        
        <ListGroup>
            {Array.isArray(rented_items.rented_items) && rented_items.rented_items.map(rented_item => (
                <ListGroup.Item key={rented_item.id} className="d-flex justify-content-between align-items-center">
                    {rented_item.name}
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteRentedItems(rented_item.id)}
                    >
                        Удалить
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>

        <CreateType
            show={typeVisiable}
            onHide={() => { setEditingType(null); setTypeVisiable(false); }}
            editingItem={editingType}
        />
        <CreateBrand
            show={brandVisiable}
            onHide={() => { setEditingBrand(null); setBrandVisiable(false); }}
            editingItem={editingBrand}
        />
        <CreateRentItem
            show={rentedItemVisiable}
            onHide={() => { setEditingRentedItems(null); setRentedItemsVisiable(false); }}
            editingItem={editingRentedItem}
        />      <hr style={{opacity: 0}}></hr><hr style={{opacity: 0}}></hr><hr></hr>
        <div style={{opacity: 0}}>
        <hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr></div>
        
        </Container>
    );
});

export default RentManagement;