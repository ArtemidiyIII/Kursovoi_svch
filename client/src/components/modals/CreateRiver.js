import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Form } from 'react-bootstrap';
import { createRiver, updateRiver } from '../../http/raftingAPI'; 

const CreateRiver = ({ show, onHide, editingItem }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (editingItem) {
            setValue(editingItem.name);
        } else {
            setValue(''); 
        }
    }, [editingItem]);

    const handleSubmit = () => {
        if (editingItem) {
            updateRiver(editingItem.id, { name: value }).then(() => {
                setValue('');
                onHide();
            });
        } else {
            createRiver({ name: value }).then(() => {
                setValue('');
                onHide();
            });
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                setValue('');
                onHide();
            }}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {editingItem ? 'Изменить название реки' : 'Добавить новую реку'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Название реки"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleSubmit}>
                    {editingItem ? 'Изменить' : 'Добавить'}
                </Button>
                <Button
                    variant="outline-danger"
                    onClick={() => {
                        setValue('');
                        onHide();
                    }}
                >
                  Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateRiver;