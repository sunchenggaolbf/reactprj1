import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';

const App = () => {
  const [positions, setPositions] = useState([{ x: 50, y: 50 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });

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
    />
  );

  const LineRenderer = ({ positions }) => (
    <>
      {positions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
          }}
        />
      ))}
    </>
  );

  const updateGame = (entities) => {
    return {
      block: { position: currentPosition, renderer: <BlockRenderer position={currentPosition} /> },
      line: { positions, renderer: <LineRenderer positions={positions} /> },
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPositions([...positions, newPosition]);
      setCurrentPosition(newPosition);
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[updateGame]}
        entities={{
          block: { position: currentPosition, renderer: <BlockRenderer position={currentPosition} /> },
          line: { positions, renderer: <LineRenderer positions={positions} /> },
        }}
      />
    </div>
  );
};

export default App;
