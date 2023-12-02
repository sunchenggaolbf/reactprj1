import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';

const App = () => {
  const [positions, setPositions] = useState([{ x: 50, y: 50 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [carIndex, setCarIndex] = useState(0);
  const [mouseUpFlg, setMouseUpFlg] = useState(false);

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
    // 获取小车路径和当前位置
    const carPath = positions;
    const nextCarPosition = carPath[carIndex];

    if (nextCarPosition && mouseUpFlg) {
      // 更新小车位置
      setCurrentPosition({ x: nextCarPosition.x, y: nextCarPosition.y-30 });

      // 每次移动时更新 carIndex
      setCarIndex(carIndex + 1);
      console.log(carIndex);

    }

    return {
      block: { position: currentPosition, carIndex:carIndex, renderer: <BlockRenderer position={currentPosition} /> },
      line: { positions, renderer: <LineRenderer positions={positions} /> },
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPositions([...positions, newPosition]);
      //setCurrentPosition(newPosition);
    }
  };

  const handleMouseDown = (e) => {
    setMouseUpFlg(false);
    setPositions([]);
  }

  const handleMouseUp = (e) => {
    // 在鼠标抬起时可能进行一些操作
    setMouseUpFlg(true);
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[updateGame]}
        entities={{
          block: { position: currentPosition, carIndex:carIndex, renderer: <BlockRenderer position={currentPosition} /> },
          line: { positions, renderer: <LineRenderer positions={positions} /> },
        }}
      />
    </div>
  );
};

export default App;
