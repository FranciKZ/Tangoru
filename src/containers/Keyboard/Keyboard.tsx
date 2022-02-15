/* eslint-disable no-debugger */
import React, { useCallback, useState } from 'react';
import KeyboardRow from '../../components/KeyboardRow/KeyboardRow';
import IKeyboardButton from '../../models/IKeyboardButton';

interface IKeyboardProps {
  keyboardData: IKeyboardButton[][];
}

function Keyboard({ keyboardData }: IKeyboardProps) {
  const [modifiers, setModifiers] = useState({
    useLittle: false,
    useModifier: false,
  });

  const handleButtonClick = useCallback((char: string) => {
    switch (char) {
      case 'enter':
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
        console.log({ char });
    }
  }, []);

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

export default Keyboard;
