import React, { useState } from 'react';
import './Card.css';

const Card = ({ image, onClick, flipped, matched }) => {
  const [isFlipped, setIsFlipped] = useState(flipped);

  const handleClick = () => {
    if (!matched) {
      setIsFlipped(true);
      onClick();
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src="\images\image-1.jpg" alt="Reverso de la carta" />
          {/* Contenido del reverso de la carta */}
        </div>
        <div className="card-back">
          <img src={image} alt="Carta" />
          {/* Contenido de la imagen específica de la carta */}
        </div>
      </div>
    </div>
  );
};

export default Card;
