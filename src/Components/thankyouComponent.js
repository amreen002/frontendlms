import React from 'react';
import { Button, Card } from 'react-bootstrap';
const ThankYouCard = ({ handleNext }) => {
  return (
    <div className="container mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Title className="mb-4">Thank You!</Card.Title>
          <Card.Text className="mb-4">
            Your verification is complete. Please proceed to the next step.
          </Card.Text>
          <img 
            src="../../public/assets/img/stock-vector-vector-lettering-set-for-invitation-and-greeting-card-prints-and-posters-hand-drawn-inscription-424180954.jpg" 
            alt="Thank You" 
            className="img-fluid mb-4" 
            style={{ maxWidth: '300px' }} 
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ThankYouCard;
