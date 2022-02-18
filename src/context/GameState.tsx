import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';
import messages from '../assets/messages';
import wordList from '../assets/wordList';
import useLocalStorageState from '../hooks/useLocalStorageState';
import IGameState, { initialGameState } from '../models/IGameState';
import evaluateState from '../utils/GameStateUtils';

type VoidFunction = () => void;
type GameContextValue = [
  IGameState,
  Dispatch<SetStateAction<IGameState>>,
  VoidFunction
];

const GameContext = createContext<GameContextValue>([
  initialGameState,
  () => {},
  () => {},
]);

function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useLocalStorageState(
    'gameState',
    initialGameState
  );

  const submitGuess = useCallback(() => {
    if (
      gameState.board[gameState.currentRow].word.length !==
      gameState.solution.length
    ) {
      toast(messages.toastNotLongEnough.english);
    }

    if (!wordList.includes(gameState.board[gameState.currentRow].word)) {
      toast(messages.toastNotLongEnough.english);
    }

    const newGameState = evaluateState(gameState);
    setGameState(newGameState);
  }, [gameState, setGameState]);

  useEffect(() => {
    const origDate = new Date(2022, 1, 4, 0, 0, 0, 0).setHours(0, 0, 0, 0);
    const d = new Date(2022, 1, 9, 0, 0, 0, 0).setHours(0, 0, 0, 0);

    const dif = Math.round((d - origDate) / 86400000) % wordList.length;
    const solution = wordList[dif];

    setGameState((prev: IGameState) => ({
      ...prev,
      solution,
    }));
  }, [setGameState]);

  const gameValue = useMemo(
    (): GameContextValue => [gameState, setGameState, submitGuess],
    [gameState, setGameState, submitGuess]
  );
  return (
    <GameContext.Provider value={gameValue}>{children}</GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used inside a GameProvider');
  }
  return context;
};

export default GameProvider;
