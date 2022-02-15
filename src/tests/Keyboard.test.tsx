import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Keyboard from '../containers/Keyboard/Keyboard';

const testKeyboardData = [
  [
    {
      id: '762991ad',
      main: 'ワ',
      modified: 'ー',
    },
    {
      id: 'fff5b342',
      main: 'ラ',
    },
    {
      id: '22d1a18a',
      main: 'ヤ',
      little: 'ベ',
    },
  ],
  [
    {
      id: '0fb8',
      main: 'little',
      little: 'little',
      modified: 'little',
    },
    {
      id: 'dbba',
      main: 'modify',
      little: 'modify',
      modified: 'modify',
    },
  ],
];

test('keyboard should render buttons', () => {
  render(<Keyboard keyboardData={testKeyboardData} />);

  expect(
    screen.getByText('modify', { selector: 'button' })
  ).toBeInTheDocument();
  expect(screen.getByText('ワ', { selector: 'button' })).toBeInTheDocument();
  expect(screen.getByText('ヤ', { selector: 'button' })).toBeInTheDocument();
});

test('clicking modifier button should change keys', () => {
  const { rerender } = render(<Keyboard keyboardData={testKeyboardData} />);

  fireEvent.click(screen.getByText('modify', { selector: 'button' }));

  rerender(<Keyboard keyboardData={testKeyboardData} />);
  expect(screen.getByText('ー', { selector: 'button' })).toBeInTheDocument();

  fireEvent.click(screen.getByText('little', { selector: 'button' }));
  rerender(<Keyboard keyboardData={testKeyboardData} />);
  expect(screen.getByText('ベ', { selector: 'button' })).toBeInTheDocument();
});
