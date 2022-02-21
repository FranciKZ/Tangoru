import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Board from './containers/Board/Board';
import Keyboard from './containers/Keyboard/Keyboard';
import GameProvider from './context/GameState';
import keyboard from './assets/keyboard';

function App() {
  return (
    <div className="App">
      <Toaster />
      <GameProvider>
        <Board />
        <Keyboard keyboardData={keyboard} />
      </GameProvider>
    </div>
  );
}

export default App;
