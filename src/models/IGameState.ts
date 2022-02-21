import EvaluationTypes from './EvaluationTypes';
import GameStateTypes from './GameStateTypes';
import IBoardState from './IBoardState';

interface IGameState {
  board: IBoardState[];
  solution: string;
  currentRow: number;
  gameStatus: GameStateTypes;
}

export const initialGameState: IGameState = {
  board: [
    { word: '', evaluation: new Array(4).fill(EvaluationTypes.UNEVALUATED) },
    { word: '', evaluation: new Array(4).fill(EvaluationTypes.UNEVALUATED) },
    { word: '', evaluation: new Array(4).fill(EvaluationTypes.UNEVALUATED) },
    { word: '', evaluation: new Array(4).fill(EvaluationTypes.UNEVALUATED) },
    { word: '', evaluation: new Array(4).fill(EvaluationTypes.UNEVALUATED) },
    { word: '', evaluation: new Array(4).fill(EvaluationTypes.UNEVALUATED) },
  ],
  solution: '',
  currentRow: 0,
  gameStatus: GameStateTypes.IN_PROGRESS,
};

export default IGameState;
