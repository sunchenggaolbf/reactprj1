import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';
import carImage from './lianxi/resource/pictures/car.png';

const App = () => {
  const [gameState, setGameState] = useState({
    positions: [{ x: 50, y: 50 }],
    carPosition: { x: 50, y: 50 },
    carIndex: 0,
    mouseUpFlg: false,
    rotation: 0,
  });

  const Car = ({ position, rotation }) => (
    <img
      src={carImage}
      alt="Car"
      style={{
        position: 'absolute',
        width: '60px',
        height: '60px',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );

  const Path = ({ positions }) => (
    <>
      {positions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: 'green',
            borderRadius: '50%',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
          }}
        />
      ))}
    </>
  );

  const systemRunPath = (entities) => {
    const { positions, carIndex, mouseUpFlg, rotation, carPosition } = gameState;
    const nextCarPosition = positions[carIndex];
    const compareIndex = carIndex + 10;

    if (nextCarPosition && mouseUpFlg) {
      setGameState((prevState) => ({
        ...prevState,
        carPosition: { x: nextCarPosition.x, y: nextCarPosition.y - 45 },
      }));

      if (compareIndex < positions.length) {
        const comparePosition = positions[compareIndex];
        const deltaX = comparePosition.x - carPosition.x;
        const deltaY = comparePosition.y - carPosition.y;
        const newRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;

        setGameState((prevState) => ({
          ...prevState,
          rotation: newRotation,
        }));
      }

      setGameState((prevState) => ({
        ...prevState,
        carIndex: carIndex + 1,
      }));
    }

    return {
      Car: {
        position: carPosition,
        rotation: rotation,
        renderer: <Car />,
      },
      Path: { positions, renderer: <Path /> },
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      const newPosition = { x: e.clientX, y: e.clientY };
      setGameState((prevState) => ({
        ...prevState,
        positions: [...prevState.positions, newPosition],
      }));
    }
  };

  const handleMouseDown = (e) => {
    setGameState({
      positions: [],
      carPosition: { x: 50, y: 50 },
      carIndex: 0,
      mouseUpFlg: false,
      rotation: 0,
    });
  };

  const handleMouseUp = (e) => {
    setGameState((prevState) => ({
      ...prevState,
      mouseUpFlg: true,
    }));
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[systemRunPath]}
        entities={{
          Car: {
            position: gameState.carPosition,
            renderer: <Car />,
          },
          Path: { positions: gameState.positions, renderer: <Path /> },
        }}
      />
    </div>
  );
};

export default App;
