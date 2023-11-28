import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';

const Game = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [path, setPath] = useState([]);

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      setPath([...path, { x: e.clientX, y: e.clientY }]);
    }
  };

  const updateGame = (entities) => {
    if (path.length > 1) {
      const [start, ...rest] = path;
      const dx = start.x - position.x;
      const dy = start.y - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 2;

      if (distance > 1) {
        const angle = Math.atan2(dy, dx);
        const newX = position.x + Math.cos(angle) * speed;
        const newY = position.y + Math.sin(angle) * speed;
        setPosition({ x: newX, y: newY });
      } else {
        setPath(rest);
      }
    }

    return entities;
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[updateGame]}
        entities={{
          block: { position, renderer: <div style={blockStyle}>🟥</div> },
          path: { path, renderer: <div style={pathStyle} /> },
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

const pathStyle = {
  position: 'absolute',
  backgroundColor: 'blue',
  width: '3px',
  height: '3px',
};

export default Game;