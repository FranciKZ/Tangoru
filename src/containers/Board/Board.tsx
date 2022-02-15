import React from 'react';
import { useGame } from '../../context/GameState';

function Board() {
  const [gameState] = useGame();
  return <div>{gameState.solution}</div>;
}

export default Board;
