import React, { useState, useEffect } from 'react';
import { GameEngine } from 'react-game-engine';
import Matter from "matter-js";

const App = () => {
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    const ball = Matter.Bodies.circle(100, 100, 30, { restitution: 0.5 });

    Matter.World.add(world, [ball]);

    //把matter对象加入到react-game-engine中去。
    setEntities({
      physics: { engine, world },
      ball: { body: ball, renderer: <Ball /> },
    });

  }, []);

  const Ball = (props) => {
    const { body } = props;
    const { x, y } = body.position;
    return (
      <div
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          width: '30px',
          height: '30px',
          backgroundColor: "red",
          borderRadius: 30 / 2,
        }}
      />
    );
  };

  const SystemPath = (entitiesNotUse, {time}) => {

    if (!entities || !entities.physics) {
      return entities;
    }

    let { engine } = entities.physics;

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

  return (
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[SystemPath]}
        entities={entities}
      />
  );
};

export default App;
