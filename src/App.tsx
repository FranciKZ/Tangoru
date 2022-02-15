import React from 'react';
import './App.css';
import Board from './containers/Board/Board';
import Keyboard from './containers/Keyboard/Keyboard';
import GameProvider from './context/GameState';
import keyboard from './assets/keyboard';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Board />
      </GameProvider>
      <Keyboard keyboardData={keyboard} />
    </div>
  );
}

export default App;
