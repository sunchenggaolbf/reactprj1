import React, { useState, useEffect } from 'react';
import { GameEngine } from 'react-game-engine';
import Matter from 'matter-js';
import carImage from './lianxi/resource/pictures/car.png';

const App = () => {
  const [positions, setPositions] = useState([{ x: 50, y: 50 }]);
  const [carPosition, setCarPosition] = useState({ x: 50, y: 50 });
  const [carIndex, setCarIndex] = useState(0);
  const [mouseUpFlg, setMouseUpFlg] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Create Matter.js engine
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Create a car body
    const carBody = Matter.Bodies.rectangle(carPosition.x, carPosition.y, 60, 60, {
      friction: 0.8,
      restitution: 0.1,
    });

    // Add the car body to the world
    Matter.World.add(world, [carBody]);

    // Update Matter.js engine in each frame
    const updatePhysics = () => {
      Matter.Engine.update(engine);
    };

    // Start the engine
    const intervalId = setInterval(updatePhysics, 1000 / 60);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [carPosition]);

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
        transform: `rotate(${rotation}deg)`, // 添加旋转样式
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
    const nextCarPosition = positions[carIndex];
    const compareIndex = carIndex + 10;

    if (nextCarPosition && mouseUpFlg) {
      // 更新小车位置
      setCarPosition({ x: nextCarPosition.x, y: nextCarPosition.y - 45 });

      // 计算小车的旋转角度
      if (compareIndex < positions.length) {
        const comparePosition = positions[compareIndex];
        const deltaX = comparePosition.x - carPosition.x;
        const deltaY = comparePosition.y - carPosition.y;
        const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;
        setRotation(rotation);
      }

      setCarIndex(carIndex + 1);
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
      setPositions([...positions, newPosition]);
    }
  };

  const handleMouseDown = (e) => {
    setMouseUpFlg(false);
    setCarIndex(0);
    setPositions([]);
  }

  const handleMouseUp = (e) => {
    setMouseUpFlg(true);
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[systemRunPath]}
        entities={{
          Car: {
            position: carPosition,
            renderer: <Car />
          },
          Path: { positions, renderer: <Path/> },
        }}
      />
    </div>
  );
};

export default App;
