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
    { word: '', evaluation: [] },
    { word: '', evaluation: [] },
    { word: '', evaluation: [] },
    { word: '', evaluation: [] },
    { word: '', evaluation: [] },
    { word: '', evaluation: [] },
  ],
  solution: '',
  currentRow: 1,
  gameStatus: GameStateTypes.IN_PROGRESS,
};

export default IGameState;
