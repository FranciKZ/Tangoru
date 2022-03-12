import React, { useCallback, useMemo, useState } from 'react';
import KeyboardButton from '../../components/KeyboardButton/KeyboardButton';
import KeyboardRow from '../../components/KeyboardRow/KeyboardRow';
import { useGame } from '../../context/GameState';
import EvaluationMap from '../../models/EvaluationMap';
import EvaluationTypes from '../../models/EvaluationTypes';
import GameStateTypes from '../../models/GameStateTypes';
import IBoardState from '../../models/IBoardState';
import IKeyboardButton from '../../models/IKeyboardButton';
import { createUpdatedGameState } from '../../utils/GameStateUtils';

interface IKeyboardProps {
  keyboardData: IKeyboardButton[][];
}

function Keyboard({ keyboardData }: IKeyboardProps) {
  const { gameState, submitGuess, setGameState } = useGame();
  const [modifiers, setModifiers] = useState({
    useLittle: false,
    useModifier: false,
  });

  // TODO: fix this so that if a row already has a positive evaluation (e.g. misplaced, correct)
  // that guessing it in a subsequent row does not override
  const keyResults = useMemo(() => {
    const { board } = gameState;
    const letterMap: EvaluationMap = {};
    board.forEach((boardRow: IBoardState) => {
      boardRow.evaluation.forEach(
        (charEval: EvaluationTypes, index: number) => {
          if (boardRow.word.charAt(index) !== '') {
            letterMap[boardRow.word.charAt(index)] = charEval;
          }
        }
      );
    });
    return letterMap;
  }, [gameState]);

  const handleButtonClick = useCallback(
    (char: string) => {
      if (gameState.gameStatus === GameStateTypes.IN_PROGRESS) {
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
      }
    },
    [setGameState, gameState, submitGuess]
  );

  const renderRows = () => {
    return keyboardData.map((outerArray: IKeyboardButton[]) => {
      return (
        <KeyboardRow key={`row_${outerArray[0].id}`}>
          {outerArray.map((value: IKeyboardButton) => {
            return (
              <KeyboardButton
                key={`key_${value.id}`}
                buttonData={value}
                useLittle={modifiers.useLittle}
                useModifier={modifiers.useModifier}
                evaluationMap={keyResults}
                onClick={handleButtonClick}
              />
            );
          })}
        </KeyboardRow>
      );
    });
  };

  return <div>{renderRows()}</div>;
}

Keyboard.whyDidYouRender = true;
export default Keyboard;
