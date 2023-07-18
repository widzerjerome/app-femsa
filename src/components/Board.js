import React, { useState, useEffect } from 'react';
import Card from './Card';

const images = [
  '/images/image-1.jpg',
  '/images/image-2.jpg',
  '/images/image-3.jpg',
  '/images/image-4.jpg',
  '/images/image-5.jpg',
  '/images/image-6.jpg',
  '/images/image-7.jpg',
  '/images/image-8.jpg',
];

const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeCards();
  }, []);

  // Inicializa las cartas en el tablero
  const initializeCards = () => {
    const shuffledImages = shuffle([...images, ...images]);

    const newCards = shuffledImages.map((image, index) => ({
      id: index,
      image: image,
      flipped: false,
      matched: false,
    }));

    setCards(newCards);
  };

  // Baraja el array de imágenes
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Maneja el evento de clic en una carta
  const handleCardClick = (cardId) => {
    if (flippedCards.length < 2) {
      const updatedCards = cards.map((card) => {
        if (card.id === cardId && !card.flipped && !card.matched) {
          return { ...card, flipped: true };
        }
        return card;
      });

      const flippedCard = updatedCards.find((card) => card.id === cardId);
      setCards(updatedCards);
      setFlippedCards([...flippedCards, flippedCard]);

      if (flippedCards.length === 0) {
        setTimeout(() => {
          checkMatch();
        }, 1000);
      }
    }
  };

  // Verifica si las cartas volteadas coinciden
  const checkMatch = () => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const updatedCards = cards.map((card) => {
        if (card.id === card1.id || card.id === card2.id) {
          return { ...card, matched: true };
        }
        return card;
      });

      if (card1.image === card2.image) {
        setMatchedCards([...matchedCards, card1, card2]);
        setScore(score + 1);
      } else {
        setTimeout(() => {
          const flippedCardIds = flippedCards.map((card) => card.id);
          const updatedCards = cards.map((card) => {
            if (flippedCardIds.includes(card.id)) {
              return { ...card, flipped: false };
            }
            return card;
          });
          setCards(updatedCards);
        }, 1000);
        setScore(score + 1);
      }

      setFlippedCards([]);
    }
  };

  // Reinicia el juego
  const restartGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    initializeCards();
  };

  return (
    <div className="board">
      <div className="score">Intentos: {score}</div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            flipped={card.flipped}
            matched={card.matched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Reiniciar
      </button>
    </div>
  );
};

export default Board;
