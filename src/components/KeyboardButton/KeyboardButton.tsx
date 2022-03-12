import React from 'react';
import EvaluationMap from '../../models/EvaluationMap';
import EvaluationTypes from '../../models/EvaluationTypes';
import IKeyboardButton from '../../models/IKeyboardButton';

interface IKeyboardButtonProps {
  buttonData: IKeyboardButton;
  useLittle: boolean;
  useModifier: boolean;
  onClick: (char: string) => void;
  evaluationMap: EvaluationMap;
}

function KeyboardButton({
  buttonData,
  useLittle,
  useModifier,
  onClick,
  evaluationMap,
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

  const colorBackground = () => {
    const text = getText();
    const evaluation = evaluationMap[text];
    let result = '';
    if (!evaluation || evaluation === EvaluationTypes.UNEVALUATED) {
      result = 'grey';
    } else if (evaluation === EvaluationTypes.INCORRECT) {
      result = 'black';
    } else if (evaluation === EvaluationTypes.CORRECT) {
      result = 'green';
    } else if (evaluation === EvaluationTypes.MISPLACED) {
      result = 'yellow';
    }

    return result;
  };

  const handleClick = () => {
    onClick(getText());
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      style={{
        minWidth: '30px',
        minHeight: '30px',
        margin: '2px',
        background: colorBackground(),
        visibility: getText() === '' ? 'hidden' : 'initial',
      }}
    >
      {getText()}
    </button>
  );
}

KeyboardButton.whyDidYouRender = true;
export default KeyboardButton;
