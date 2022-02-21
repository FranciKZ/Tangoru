import React, { useCallback, useState } from 'react';
import KeyboardRow from '../../components/KeyboardRow/KeyboardRow';
import { useGame } from '../../context/GameState';
import IGameState from '../../models/IGameState';
import IKeyboardButton from '../../models/IKeyboardButton';

interface IKeyboardProps {
  keyboardData: IKeyboardButton[][];
}

const createUpdatedGameState = (prevState: IGameState, char: string) => {
  const result = { ...prevState };
  const { word } = result.board[result.currentRow];
  if (char === 'backspace') {
    result.board[result.currentRow].word = word.slice(0, word.length - 1);
  } else if (word.length < 4) {
    result.board[result.currentRow].word = word + char;
  }
  return result;
};

function Keyboard({ keyboardData }: IKeyboardProps) {
  const { gameState, submitGuess, setGameState } = useGame();
  const [modifiers, setModifiers] = useState({
    useLittle: false,
    useModifier: false,
  });

  const handleButtonClick = useCallback(
    (char: string) => {
      console.log(char);
      switch (char) {
        case 'enter':
          submitGuess();
          break;
        case 'little':
          setModifiers((prev) => ({
            useLittle: !prev.useLittle,
            useModifier: false,
          }));
          break;
        case 'modify':
          setModifiers((prev) => ({
            useLittle: false,
            useModifier: !prev.useModifier,
          }));
          break;
        default:
          setGameState(createUpdatedGameState(gameState, char));
      }
    },
    [setGameState, gameState, submitGuess]
  );

  const renderRows = () => {
    return keyboardData.map((outerArray: IKeyboardButton[]) => {
      return (
        <KeyboardRow
          key={`row_${outerArray[0].id}`}
          rowData={outerArray}
          useLittle={modifiers.useLittle}
          useModifier={modifiers.useModifier}
          handleButtonClick={handleButtonClick}
        />
      );
    });
  };

  return <div>{renderRows()}</div>;
}

Keyboard.whyDidYouRender = true;
export default Keyboard;
