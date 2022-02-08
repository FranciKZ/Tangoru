import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import wordList from '../assets/wordList';
import useLocalStorageState from '../hooks/useLocalStorageState';
import IGameState, { initialGameState } from '../models/IGameState';

const GameContext = createContext<
  [IGameState, React.Dispatch<React.SetStateAction<IGameState>>]
>([initialGameState, () => {}]);

function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useLocalStorageState(
    'gameState',
    initialGameState
  );

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
    (): [IGameState, Dispatch<SetStateAction<IGameState>>] => [
      gameState,
      setGameState,
    ],
    [gameState, setGameState]
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
