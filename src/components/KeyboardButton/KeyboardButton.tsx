import React from 'react';
import IKeyboardButton from '../../models/IKeyboardButton';

interface IKeyboardButtonProps {
  buttonData: IKeyboardButton;
  useLittle: boolean;
  useModifier: boolean;
  onClick: (char: string) => void;
}

function KeyboardButton({
  buttonData,
  useLittle,
  useModifier,
  onClick,
}: IKeyboardButtonProps) {
  const getText = () => {
    let text = buttonData.main;
    if (useLittle) {
      text = buttonData.little || '';
    } else if (useModifier) {
      text = buttonData.modified || '';
    }
    return text;
  };

  const handleClick = () => {
    onClick(getText());
  };

  return (
    <button
      onClick={() => handleClick()}
      type="button"
      style={{
        minWidth: '30px',
        minHeight: '30px',
        margin: '2px',
        visibility: getText() === '' ? 'hidden' : 'initial',
      }}
    >
      {getText()}
    </button>
  );
}

export default KeyboardButton;
