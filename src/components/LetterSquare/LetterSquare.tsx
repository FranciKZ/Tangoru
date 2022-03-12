/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import EvaluationTypes from '../../models/EvaluationTypes';

export type LetterSquareProps = {
  character: string;
  evaluation: EvaluationTypes;
  isInCurrentRow: boolean;
};

function LetterSquare({ character, evaluation, isInCurrentRow }: LetterSquareProps) {
  const getColor = () => {
    let result = 'black';
    if (!isInCurrentRow) {
      if (evaluation === EvaluationTypes.MISPLACED) {
        result = 'yellow';
      } else if (evaluation === EvaluationTypes.CORRECT) {
        result = 'green';
      }
    }

    return result;
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <div
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'middle',
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          border: '1px solid black',
          fontSize: '2em',
          color: getColor(),
        }}
      >
        {character}
      </div>
    </div>
  );
}

export default React.memo(LetterSquare);
