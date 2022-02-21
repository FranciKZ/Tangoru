import React from 'react';
import { useGame } from '../../context/GameState';
import LetterSquare from '../LetterSquare/LetterSquare';

type WordRowsProps = {
  rowIndex: number;
};

function WordRow({ rowIndex }: WordRowsProps) {
  const { gameState } = useGame();

  const renderLetterSquares = () => {
    const result = [];

    for (let i = 0; i < 4; i += 1) {
      const gameStateRow = gameState.board[rowIndex];
      result.push(
        <LetterSquare
          key={`square_${rowIndex}${i}`}
          character={gameStateRow.word.charAt(i)}
          evaluation={gameStateRow.evaluation[i]}
        />
      );
    }

    return result;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {renderLetterSquares()}
    </div>
  );
}

export default WordRow;
