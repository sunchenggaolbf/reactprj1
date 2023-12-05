import React, { useState } from 'react';
import { GameEngine } from 'react-game-engine';
import carImage from './resource/pictures/car.png';

const App = () => {
  const [positions, setPositions] = useState([{ x: 50, y: 50 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [mouseUpFlg, setMouseUpFlg] = useState(false);
  const [carIndex, setCarIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const Car = ({ position, rotation }) => (
    <img
      src={carImage}
      alt="Car"
      style={{
        position: 'absolute',
        width: '60px',
        height: '60px',
        left: `${position.x}px`,
        top: `${positioin.y}px`,
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
    const carPath = positions;
    const nextCarPosition = carPath[carIndex];
    const compareIndex = carIndex + 10;

    if (nextCarPosition && mouseUpFlg) {
      setCurrentPosition({ x: nextCarPosition.x, y: nextCarPosition.y - 45 });

      if (compareIndex < carPath.length) {
        const comparePosition = carPath[compareIndex];
        const deltaX = comparePosition.x - currentPosition.x;
        const deltay = comparePosition.y - currentPosition.y;
        const rotation = Math.atan2(deltay, deltax) * (180 / Math.PI) - 90;
        setRotation(rotation);
      }
      setCarIndex(carIndex + 1);
    }

    return {
      block:{
        position:currentPosition,
        carIndex:carIndex,
        rotation:rotation,
        renderer:<Car position={currentPosition} rotation = {rotation} />
      },
      line:{positions,renderer:<Path positions={positioins} /> },
    };


  };



};

export default App;