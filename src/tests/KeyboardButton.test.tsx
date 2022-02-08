import React from 'react';
import { render, screen } from '@testing-library/react';
import KeyboardButton from '../components/KeyboardButton/KeyboardButton';
import IKeyboardButton from '../models/IKeyboardButton';

const testButtonData: IKeyboardButton = {
  main: 'DA',
  little: 'da',
  modified: 'ta',
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
