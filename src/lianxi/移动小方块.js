import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';

const App = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const BlockRenderer = ({ position }) => (
    <div
      style={{
        position: 'absolute',
        width: '30px',
        height: '30px',
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    / >
   );

  const updateGame = (entities) => {
    return {
      block: { position, renderer: <BlockRenderer position={position} /> },
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      console.log(e.clientX, e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[updateGame]}
        entities={{
          block: { position, renderer: <BlockRenderer position = {position} /> },

        }}
      />
    </div>
  );
};

const blockStyle = {
  position: 'absolute',
  width: '30px',
  height: '30px',
  backgroundColor: 'red',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default App;
