import React from 'react';
import { useGame } from '../../context/GameState';

function Board() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameState, setGameState] = useGame();
  console.log({ gameState });
  return <div>{gameState.solution}</div>;
}

export default Board;
