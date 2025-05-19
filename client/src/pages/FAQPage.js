import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const FAQPage = () => {
  const [show, setShow] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const faqs = [
    {
      question: "А можно перевернуться?",
      answer: "Если вы будете соблюдать правила техники безопасности, то шанс перевернуться минимален. Так же на инструктаже вы получите подробную информацию от профессионалов своего дела."
    },
    {
      question: "А если будет плохая погода/дождь, будет ли сплав?",
      answer: "Мы проводим сплавы при любой погоде. Если будет дождь, то вы сможете воспользоваться дождевиком. Оказать влияние на прогноз погоды мы не можем, но мы можем влиять на наше настроение и отношение к осадкам ))"
    },
    {
      question: "Что нужно взять с собой на сплав?",
      answer: "После подтверждения бронирования сплава, вы получите подробную памятку с рекомендациями, что с собой взять и в какой одежде сплавляться."
    },
    {
      question: "Если сломал что-то из снаряжения?",
      answer: "В случае утраты снаряжения или приведения его в непригодное для дальнейшей эксплуатации состояние, заказчик обязан возместить стоимость утерянного (испорченного) снаряжения или стоимость его ремонта."
    },
    {
      question: "Я никогда не сплавлялся, это сложно?",
      answer: "Все маршруты подходят как для новичков, так и для любителей и даже профессионалов. Для начала можете попробовать наш 4х часовой сплав, который отлично подойдет для знакомства с этим видом отдыха."
    },
    {
      question: "В какой одежде лучше сплавляться?",
      answer: "После подтверждения бронирования сплава, вы получите подробную памятку с рекомендациями, что с собой взять и в какой одежде сплавляться."
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
      <h1>Часто задаваемые вопросы</h1>
      <ul>
        {faqs.map((faq, index) => (
          
          <li key={index}>
            <Badge bg="secondary" style={{color:'white'}} className='mt-2'>
            <Button variant="link" style={{color:'black'}} onClick={() => handleShow(faq)}>
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