import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

const App = () => {
  const [cards, setCards] = useState([]);
  const [connections, setConnections] = useState([]);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      text: '',
      position: { x: 50, y: 50 },
    };
    setCards([...cards, newCard]);
  };

  const openModal = (text) => {
    alert(text);
  };

  return (
    <div className="flex">
      <Sidebar
        addCard={addCard}
        setCards={setCards}
        setConnections={setConnections}
        cards={cards}
      />
      <Canvas
        cards={cards}
        setCards={setCards}
        connections={connections}
        openModal={openModal}
      />
    </div>
  );
};

export default App;

