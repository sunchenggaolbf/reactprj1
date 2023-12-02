import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';

const App = () => {
  const [positions, setPositions] = useState([{ x: 50, y: 50 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [carIndex, setCarIndex] = useState(0);

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
    let carPath = entities.line.positions;
    let carPathIndex = entities.block.moveIndex;
    let nextCarPosition = carPath[carPathIndex];
  
    if (nextCarPosition) {
      //entity.position.x = nextPosition.x;
      //entity.position.y = nextPosition.y;

      // 每次移动时更新 moveIndex
      setCarIndex(++carIndex);

      // 设置新的当前位置
      setCurrentPosition({ x: nextCarPosition.x, y: nextCarPosition.y });
    }

    return {
      block: { position: currentPosition, moveIndex: carPathIndex, renderer: <BlockRenderer position={currentPosition} /> },
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

  const handleMouseDown = (e) => {
    setPositions([]);
  }

  const handleMouseUp = (e) => {
    //alert(123);
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[updateGame]}
        entities={{
          block: { position: currentPosition, moveIndex: carIndex, renderer: <BlockRenderer position={currentPosition} /> },
          line: { positions, renderer: <LineRenderer positions={positions} /> },
        }}
      />
    </div>
  );
};

export default App;
