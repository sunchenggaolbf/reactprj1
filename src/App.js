import React, { useState, useEffect } from 'react';
import { GameEngine } from 'react-game-engine';
import Matter from "matter-js";

const App = () => {
  const [entities, setEntities] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    const ball = Matter.Bodies.circle(250, 100, 5, { restitution: 1 });
    const person = Matter.Bodies.rectangle(200, 400, 300, 100, { restitution: 1, isStatic: true, key: "abc" });

    Matter.World.add(world, [ball, person]);

    // 将 Matter 对象添加到 react-game-engine 中。
    setEntities({
      physics: { engine, world },
      ball: { body: ball, renderer: <Ball /> },
      person: { body: person, renderer: <Person /> },
    });

    // 开始物理引擎更新循环
    const update = () => {
      Matter.Engine.update(engine, 1000 / 60); // 60 FPS 更新
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

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

  const Person = (props) => {
    const { body } = props;
    const { x, y } = body.position;
    const key = body.key;

    return (
      <div
        key={key}
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          width: '300px',
          height: '100px',
          backgroundColor: "green",
        }}
      />
    );
  };

  const Path = ({ points }) => (
    <>
      {points.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: 'green',
            borderRadius: '50%',
            left: `${pos.position.x}px`,
            top: `${pos.position.y}px`,
          }}
        />
      ))}
    </>
  );

  // 碰撞等处理
  const Systemphysics = (entitiesx, { time }) => {
    if (!entities || !entities.physics) {
      return entities;
    }

    // let { engine } = entities.physics;

    return entities;
  };

  // 路径生成等处理，包括鼠标各种操作
  const SystemPath = (entitiesx, { time }) => {
    if (!entities || !entities.physics) {
      return entities;
    }

    return {
      ...entities,
      path: { points, renderer: <Path /> },
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      const pathPointBody = Matter.Bodies.circle(e.clientX, e.clientY, 20, { restitution: 1, isStatic: true });
      let { world } = entities.physics;
      Matter.World.add(world, pathPointBody);
      setPoints([...points, pathPointBody]);
    }
  };

  const handleMouseDown = (e) => {

  };

  const handleMouseUp = (e) => {

  };

  return (
    <div onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <GameEngine
        style={{ width: '100vw', height: '100vh' }}
        systems={[Systemphysics, SystemPath]}
        entities={entities}
      />
    </div>
  );
};

export default App;
