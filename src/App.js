import React, { useState, useEffect } from 'react';
import { GameEngine } from 'react-game-engine';
import Matter from "matter-js";

const App = () => {
  const [entities, setEntities] = useState(null);
  const [path, setPath] = useState([]);

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

  const PathPoint = (props) => {
    const { body,key } = props;
    const { x, y } = body.position;
    return (
      <div
        key={key}
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

  // 碰撞等处理
  const Systemphysics = (entitiesx, {time}) => {

    if (!entities || !entities.physics) {
      return entities;
    }

    let { engine } = entities.physics;

    Matter.Engine.update(engine, time.delta);

    return entities;
  };

    // 路径生成等处理,包括鼠标各种操作
    const SystemPath = (entitiesx, {time}) => {

      if (!entities || !entities.physics) {
        return entities;
      }

      const pathPoint = Matter.Bodies.circle(100, 100, 30, { restitution: 0.5 });
      setPath([...path, { body: pathPoint, key: path.length.toString(), renderer: <PathPoint /> }]);
      const updatedEntities = {
        ...entities,
        path: path,
      };

      setEntities(updatedEntities);
  
      return entities;
    };

  return (
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[Systemphysics, SystemPath]}
        entities={entities}
      />
  );
};

export default App;
