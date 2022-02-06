/* eslint-disable no-debugger */
import React, { useState } from 'react';
import keyboard from '../../assets/keyboard';
import KeyboardRow from '../../components/KeyboardRow/KeyboardRow';
import IKeyboardButton from '../../interfaces/IKeyboardButton';

function Keyboard() {
  const [modifiers, setModifiers] = useState({
    useLittle: false,
    useModifier: false,
  });

  const handleButtonClick = (char: string) => {
    switch (char) {
      case 'enter':
        console.log({ char });
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
  };

  const renderRows = () => {
    return keyboard.map((outerArray: IKeyboardButton[]) => {
      const key = outerArray.reduce((row, val) => {
        return row + val.main;
      }, '');
      return (
        <KeyboardRow
          key={key}
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
