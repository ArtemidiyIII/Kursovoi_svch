import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const FAQPage = () => {
  const [show, setShow] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const faqs = [
    {
      question: "What is our return policy?",
      answer: "You can return any product within 30 days of purchase for a full refund, as long as it is in its original condition."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order has shipped, you will receive an email with a tracking number to follow your package's journey."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to a variety of countries. Please check our shipping policy for more details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, and bank transfers."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support via email, phone, or live chat. Our contact details can be found on the Contact Us page."
    }
  ];

  const handleClose = () => {
    setShow(false);
    setSelectedFAQ(null);
  };

  const handleShow = (faq) => {
    setSelectedFAQ(faq);
    setShow(true);
  };

  return (
    <div className="ms-3 mt-3">
      <h1>Frequently Asked Questions</h1>
      <ul>
        {faqs.map((faq, index) => (
          
          <li key={index}>
            <Badge bg="secondary" className='mt-2'>
            <Button variant="link" style={{color:'skyblue'}} onClick={() => handleShow(faq)}>
              {faq.question}
            </Button>
            </Badge>
          </li>
        ))}
      </ul>      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFAQ?.question}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFAQ?.answer}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FAQPage;