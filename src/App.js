import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';
import carImage from './lianxi/resource/pictures/car.png';

const App = () => {
  const [positions, setPositions] = useState([{ x: 50, y: 50 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [carIndex, setCarIndex] = useState(0);
  const [mouseUpFlg, setMouseUpFlg] = useState(false);
  const [rotation, setRotation] = useState(0);

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

  const CarRenderer = ({ position, rotation }) => {
    return (
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
    )
  };

  const LineRenderer = ({ positions }) => (
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

  const updateGame = (entities) => {
    const carPath = positions;
    const nextCarPosition = carPath[carIndex];
    const compareIndex = carIndex + 10;

    if (nextCarPosition && mouseUpFlg) {
      // 更新小车位置
      setCurrentPosition({ x: nextCarPosition.x, y: nextCarPosition.y - 45 });

      // 计算小车的旋转角度
      if (compareIndex < carPath.length) {
        const comparePosition = carPath[compareIndex];
        const deltaX = comparePosition.x - currentPosition.x;
        const deltaY = comparePosition.y - currentPosition.y;
        const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;
        setRotation(rotation);
      }

      // 每次移动时更新 carIndex 和 rotation
      setCarIndex(carIndex + 1);

    }

    return {
      block: {
        position: currentPosition,
        carIndex: carIndex,
        rotation: rotation, // 传递旋转角度
        renderer: <CarRenderer position={currentPosition} rotation={rotation} />,
      },
      line: { positions, renderer: <LineRenderer positions={positions} /> },
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      const newPosition = { x: e.clientX, y: e.clientY };
  
      // 使用线性插值添加更多的点
      if (positions.length > 0) {
        const lastPosition = positions[positions.length - 1];
        const distance = Math.sqrt(
          Math.pow(newPosition.x - lastPosition.x, 2) +
          Math.pow(newPosition.y - lastPosition.y, 2)
        );
  
        const threshold = 20; // 距离阈值，可以根据需要调整
  
        if (distance > threshold) {
          console.log(distance);
          const interpolatedPositions = interpolatePoints(lastPosition, newPosition, 10);
          setPositions([...positions, ...interpolatedPositions]);
        } else {
          setPositions([...positions, newPosition]);
        }
      } else {
        setPositions([...positions, newPosition]);
      }
    }
  };

  const interpolatePoints = (start, end, count) => {

    const deltaX = (end.x - start.x) / count;
    const deltaY = (end.y - start.y) / count;

    const interpolatedPoints = [];
    for (let i = 1; i <= count; i++) {
      const x = start.x + i * deltaX;
      const y = start.y + i * deltaY;
      interpolatedPoints.push({ x, y });
    }

    return interpolatedPoints;
  };

  const handleMouseDown = (e) => {
    setMouseUpFlg(false);
    setCarIndex(0);
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
          block: { position: currentPosition, carIndex: carIndex, renderer: <CarRenderer position={currentPosition} /> },
          line: { positions, renderer: <LineRenderer positions={positions} /> },
        }}
      />
    </div>
  );
};

export default App;
