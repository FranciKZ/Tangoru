import EvaluationTypes from '../models/EvaluationTypes';
import GameStateTypes from '../models/GameStateTypes';
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

  let gameState = GameStateTypes.IN_PROGRESS;

  if (currentGuess === solution) {
    gameState = GameStateTypes.WON;
  } else if (currentState.currentRow + 1 > 6) {
    gameState = GameStateTypes.LOST;
  }

  return {
    ...currentState,
    currentRow:
      gameState === GameStateTypes.IN_PROGRESS
        ? currentState.currentRow + 1
        : currentState.currentRow,
    board,
  };
};

export const createUpdatedGameState = (prevState: IGameState, char: string) => {
  const result = { ...prevState };
  const { word } = result.board[result.currentRow];
  if (char === 'backspace') {
    result.board[result.currentRow].word = word.slice(0, word.length - 1);
  } else if (word.length < 4) {
    result.board[result.currentRow].word = word + char;
  }
  return result;
};

export default evaluateState;
