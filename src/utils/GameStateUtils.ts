import EvaluationTypes from '../models/EvaluationTypes';
import IGameState from '../models/IGameState';

const evaluateState = (currentState: IGameState) => {
  const board = [...currentState.board];
  const currentGuess = board[currentState.currentRow].word;
  const { solution } = currentState;
  const evals: EvaluationTypes[] =
    currentGuess === solution
      ? new Array(4).fill(EvaluationTypes.CORRECT)
      : new Array(4).fill(EvaluationTypes.INCORRECT);

  if (evals[0] === EvaluationTypes.INCORRECT) {
    const currentGuessArr = currentGuess.split('');
    const filterIndices: number[] = [];

    currentGuessArr.forEach((val: string, index: number) => {
      if (val === solution.charAt(index)) {
        evals[index] = EvaluationTypes.CORRECT;
        filterIndices.push(index);
      }
    });

    const solutionArr = solution
      .split('')
      .filter((val: string, index: number) => !filterIndices.includes(index));

    currentGuessArr.forEach((val: string, index: number) => {
      if (
        solutionArr.includes(val) &&
        evals[index] === EvaluationTypes.INCORRECT
      ) {
        evals[index] = EvaluationTypes.MISPLACED;
      }
    });
  }

  board[currentState.currentRow].evaluation = evals;

  return { ...currentState, currentRow: currentState.currentRow + 1, board };
};

export default evaluateState;
