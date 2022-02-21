import React from 'react';
import IKeyboardButton from '../../models/IKeyboardButton';
import KeyboardButton from '../KeyboardButton/KeyboardButton';

interface IKeyboardRowProps {
  rowData: IKeyboardButton[];
  useLittle: boolean;
  useModifier: boolean;
  handleButtonClick: (char: string) => void;
}

function KeyboardRow({
  rowData,
  useLittle,
  useModifier,
  handleButtonClick,
}: IKeyboardRowProps) {
  const renderKeys = () => {
    return rowData.map((value: IKeyboardButton) => {
      return (
        <KeyboardButton
          key={`key_${value.id}`}
          buttonData={value}
          useLittle={useLittle}
          useModifier={useModifier}
          onClick={handleButtonClick}
        />
      );
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {renderKeys()}
    </div>
  );
}

KeyboardRow.whyDidYouRender = true;
export default React.memo(KeyboardRow);
