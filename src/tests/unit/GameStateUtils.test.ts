import EvaluationTypes from '../../models/EvaluationTypes';
import GameStateTypes from '../../models/GameStateTypes';
import IGameState from '../../models/IGameState';
import evaluateState from '../../utils/GameStateUtils';

const baseTestState: IGameState = {
  board: [
    {
      word: 'lair',
      evaluation: [],
    },
  ],
  solution: 'lair',
  currentRow: 0,
  gameStatus: GameStateTypes.IN_PROGRESS,
};

test('evaluateState should return correct evaluations for correct guess', () => {
  const testState: IGameState = { ...baseTestState };

  const result = evaluateState(testState);

  expect(result).toEqual({
    ...testState,
    currentRow: 0,
    board: [
      {
        word: 'lair',
        evaluation: [
          EvaluationTypes.CORRECT,
          EvaluationTypes.CORRECT,
          EvaluationTypes.CORRECT,
          EvaluationTypes.CORRECT,
        ],
      },
    ],
  });
});

test('evaluateState should return correct evaluations for partially exact correct guess', () => {
  const testState: IGameState = { ...baseTestState };
  testState.board[0].word = 'pair';

  const result = evaluateState(testState);

  expect(result).toEqual({
    ...testState,
    currentRow: 1,
    board: [
      {
        word: 'pair',
        evaluation: [
          EvaluationTypes.INCORRECT,
          EvaluationTypes.CORRECT,
          EvaluationTypes.CORRECT,
          EvaluationTypes.CORRECT,
        ],
      },
    ],
  });
});

test('evaluateState should return correct evaluations for guess with misplaced letters', () => {
  const testState: IGameState = { ...baseTestState };
  testState.board[0].word = 'dare';

  const result = evaluateState(testState);

  expect(result).toEqual({
    ...testState,
    currentRow: 1,
    board: [
      {
        word: 'dare',
        evaluation: [
          EvaluationTypes.INCORRECT,
          EvaluationTypes.CORRECT,
          EvaluationTypes.MISPLACED,
          EvaluationTypes.INCORRECT,
        ],
      },
    ],
  });
});

test('evaluateState should return correct evaluations for 100% wrong guess', () => {
  const testState: IGameState = { ...baseTestState };
  testState.board[0].word = 'poop';

  const result = evaluateState(testState);

  expect(result).toEqual({
    ...testState,
    currentRow: 1,
    board: [
      {
        word: 'poop',
        evaluation: [
          EvaluationTypes.INCORRECT,
          EvaluationTypes.INCORRECT,
          EvaluationTypes.INCORRECT,
          EvaluationTypes.INCORRECT,
        ],
      },
    ],
  });
});

test('evaluateState dupe letters should be ignored if one is correct', () => {
  const testState: IGameState = { ...baseTestState };
  testState.board[0].word = 'rawr';

  const result = evaluateState(testState);

  expect(result).toEqual({
    ...testState,
    currentRow: 1,
    board: [
      {
        word: 'rawr',
        evaluation: [
          EvaluationTypes.INCORRECT,
          EvaluationTypes.CORRECT,
          EvaluationTypes.INCORRECT,
          EvaluationTypes.CORRECT,
        ],
      },
    ],
  });
});

test('evaluateState dupe letters shouldnt be ignore if multiple same chars are in result', () => {
  const testState: IGameState = { ...baseTestState, solution: 'arar' };
  testState.board[0].word = 'rawr';

  const result = evaluateState(testState);

  expect(result).toEqual({
    ...testState,
    currentRow: 1,
    board: [
      {
        word: 'rawr',
        evaluation: [
          EvaluationTypes.MISPLACED,
          EvaluationTypes.MISPLACED,
          EvaluationTypes.INCORRECT,
          EvaluationTypes.CORRECT,
        ],
      },
    ],
  });
});
