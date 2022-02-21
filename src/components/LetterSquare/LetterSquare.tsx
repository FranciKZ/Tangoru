/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import EvaluationTypes from '../../models/EvaluationTypes';

export type LetterSquareProps = {
  character: string;
  evaluation: EvaluationTypes;
};

function LetterSquare({ character, evaluation }: LetterSquareProps) {
  return (
    <div
      style={{
        minHeight: '20px',
        minWidth: '20px',
        border: '1px solid black',
        color: evaluation === EvaluationTypes.CORRECT ? 'green' : 'black',
      }}
    >
      {character}
    </div>
  );
}

export default React.memo(LetterSquare);
