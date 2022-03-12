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
          isInCurrentRow={rowIndex === gameState.currentRow}
        />
      );
    }

    return result;
  };

  return (
    <div style={{ display: 'block' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: '5px',
          height: '100%',
        }}
      >
        {renderLetterSquares()}
      </div>
    </div>
  );
}

export default WordRow;
