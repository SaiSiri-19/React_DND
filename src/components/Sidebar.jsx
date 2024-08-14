import React, { useState } from 'react';

const Sidebar = ({ setConnections, setCards, addCard, cards }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [fromCardId, setFromCardId] = useState(null);
  const [toCardId, setToCardId] = useState(null);

  const handleConnect = () => {
    if (isConnecting) {
      if (fromCardId && toCardId) {
        setConnections(prev => [...prev, { from: fromCardId, to: toCardId }]);
        setFromCardId(null);
        setToCardId(null);
        setIsConnecting(false);
      } else {
        alert('Please provide both card IDs.');
      }
    } else {
      setIsConnecting(true);
    }
  };

  const clearCanvas = () => {
    setCards([]);
    setConnections([]);
  };

  return (
    <div className="lg:w-1/4 sm:w-53% p-4 bg-custom-bg flex flex-col justify-between min-h-screen  ">
      <div>
        <button
          onClick={addCard}
          className="bg-green-700 text-white text-[20px] p-3 rounded mb-4 w-full"
        >
          Add Card
        </button>
        <button
          onClick={handleConnect}
          className="bg-blue-700 text-white text-[20px] p-3 rounded w-full"
        >
          {isConnecting ? 'Finish Connection' : 'Connect'}
        </button>
        {isConnecting && (
          <div className="mt-4">
            <input
              type="number"
              placeholder="From Card ID"
              value={fromCardId || ''}
              onChange={(e) => setFromCardId(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              placeholder="To Card ID"
              value={toCardId || ''}
              onChange={(e) => setToCardId(parseInt(e.target.value))}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>
        )}

        <hr className="my-4 border-gray-700" />

        <div>
          <h3 className="text-lg font-semibold mb-2">Tools</h3>
          <button className="bg-gray-500 text-white p-2 rounded mb-2 w-full text-left">
            Select Tool
          </button>
          <button className="bg-gray-500 text-white p-2 rounded mb-2 w-full text-left">
            Move Tool
          </button>
          <button className="bg-gray-500 text-white p-2 rounded mb-2 w-full text-left">
            Zoom Tool
          </button>
        </div>

        <hr className="my-4 border-gray-700" />

        <div>
          <h3 className="text-lg font-semibold mb-2">Layers</h3>
          <ul className="list-disc pl-5">
            {cards.map((card, index) => (
              <li key={index} className="mb-1">
                Layer {index + 1} - Card {card.id}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <hr className="my-4 border-gray-700" />
        <button
          onClick={clearCanvas}
          className="bg-red-700 text-white text-[18px] p-2 rounded w-full"
        >
          Clear Canvas
        </button>
        <button className="bg-gray-800 text-white text-[18px] p-2 rounded w-full mt-2">
          Save Canvas
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
