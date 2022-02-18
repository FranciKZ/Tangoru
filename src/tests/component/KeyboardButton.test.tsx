import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import KeyboardButton from '../../components/KeyboardButton/KeyboardButton';
import IKeyboardButton from '../../models/IKeyboardButton';

const testButtonData: IKeyboardButton = {
  id: 'b337_43',
  main: 'DA',
  little: 'da',
  modified: 'ta',
};

const testModifierData: IKeyboardButton = {
  id: 'b337',
  main: 'Modify',
  little: 'modify',
  modified: 'modified',
};

test('loads button with main', () => {
  render(
    <KeyboardButton
      buttonData={testButtonData}
      useLittle={false}
      useModifier={false}
      onClick={(e: string) => {
        console.log(e);
      }}
    />
  );

  expect(screen.getByText('DA', { selector: 'button' })).toBeInTheDocument();
});

test('loads button with little', () => {
  render(
    <KeyboardButton
      buttonData={testButtonData}
      useLittle
      useModifier={false}
      onClick={(e: string) => {
        console.log(e);
      }}
    />
  );

  expect(screen.getByText('da', { selector: 'button' })).toBeInTheDocument();
});

test('loads button with modifier', () => {
  render(
    <KeyboardButton
      buttonData={testButtonData}
      useLittle={false}
      useModifier
      onClick={(e: string) => {
        console.log(e);
      }}
    />
  );

  expect(screen.getByText('ta', { selector: 'button' })).toBeInTheDocument();
});

test('clicking modifier button changes', async () => {
  let useModifier = false;
  const handleModifierClick = (e: string) => {
    if (e === 'Modify') {
      useModifier = true;
    }
  };
  const { rerender } = render(
    <>
      <KeyboardButton
        buttonData={testButtonData}
        useLittle={false}
        useModifier={useModifier}
        onClick={handleModifierClick}
      />
      <KeyboardButton
        buttonData={testModifierData}
        useLittle={false}
        useModifier={useModifier}
        onClick={handleModifierClick}
      />
    </>
  );
  expect(screen.getByText('DA', { selector: 'button' })).toBeInTheDocument();

  fireEvent.click(screen.getByText('Modify', { selector: 'button' }));

  rerender(
    <KeyboardButton
      buttonData={testButtonData}
      useLittle={false}
      useModifier={useModifier}
      onClick={handleModifierClick}
    />
  );
  const result = screen.getByText('ta', { selector: 'button' });
  expect(result).toBeInTheDocument();
});
