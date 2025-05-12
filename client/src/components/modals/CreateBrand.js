import React,{ useState,useEffect }from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { Form } from 'react-bootstrap';
import { createBrand,updateBrand } from '../../http/goodAPI';

const CreateBrand= ({show,onHide, editingItem}) => {
  const [value,setValue] = useState('')
  useEffect(() => {
    if (editingItem) {
      setValue(editingItem.name);
    } else {
      setValue(''); 
    }
  }, [editingItem]);
  const handleSubmit = () => {
    if (editingItem) {
      updateBrand(editingItem.id, { name: value }).then(() => {
        setValue('');
        onHide();
      });
    } else {
      createBrand({ name: value }).then(() => {
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
          {editingItem ? 'Edit Brand' : 'Add New Brand'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
            value = {value}
            onChange={e=>setValue(e.target.value)}
                placeholder={"name of brand"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={handleSubmit}>
          {editingItem ? 'Update' : 'Add'}
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            setValue('');
            onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBrand;