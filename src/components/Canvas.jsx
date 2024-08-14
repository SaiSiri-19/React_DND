import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

const Canvas = ({ cards, openModal, setCards, connections }) => {
  const canvasRef = useRef(null);

  const handleDrag = (e, data, id) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, position: { x: data.x, y: data.y } } : card
    );
    setCards(updatedCards);
  };

  const getCardEdgePosition = (card, isStart) => {
    const cardWidth = 200; 
    const cardHeight = 100;

    const centerX = card.position.x + cardWidth / 2;
    const centerY = card.position.y + cardHeight / 2;

    let x, y;

    if (isStart) {
      x = card.position.x + cardWidth;
      y = centerY;
    } else {
      x = card.position.x;
      y = centerY;
    }

    return { x, y };
  };

  return (
    <div className="w-full bg-custom-bg1 p-4 overflow-auto relative" ref={canvasRef}>
      {cards.map((card) => (
        <Draggable
          key={card.id}
          position={card.position}
          onStop={(e, data) => handleDrag(e, data, card.id)}
        >
          <Resizable
            defaultSize={{ width: 200, height: 100 }}
            className="bg-white shadow-lg p-4 rounded border border-gray-300"
          >
            <div>
              <textarea
                value={card.text}
                onChange={(e) => {
                  const updatedCards = cards.map(c =>
                    c.id === card.id ? { ...c, text: e.target.value } : c
                  );
                  setCards(updatedCards);
                }}
                className="w-full h-full resize-none border border-gray-300 rounded"
              />
              <button
                onClick={() => openModal(card.text)}
                className="text-pink-700 mt-2"
              >
                Show More
              </button>
            </div>
          </Resizable>
        </Draggable>
      ))}
      {connections.map((connection, index) => {
        const fromCard = cards.find(card => card.id === connection.from);
        const toCard = cards.find(card => card.id === connection.to);

        if (!fromCard || !toCard) return null;

        const fromPosition = getCardEdgePosition(fromCard, true);  
        const toPosition = getCardEdgePosition(toCard, false);  

        return (
          <svg
            key={index}
            className="absolute top-16 left-8 w-full h-full pointer-events-none"
          >
            <defs>
              <marker
                id={`arrowhead-${index}`}
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
            <line
              x1={fromPosition.x}
              y1={fromPosition.y}
              x2={toPosition.x}
              y2={toPosition.y}
              stroke="black"
              strokeWidth="2"
              markerEnd={`url(#arrowhead-${index})`}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default Canvas;
