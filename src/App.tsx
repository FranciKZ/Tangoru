import React from 'react';
import './App.css';
import Board from './containers/Board/Board';
import Keyboard from './containers/Keyboard/Keyboard';
import GameProvider from './context/GameState';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Board />
      </GameProvider>
      <Keyboard />
    </div>
  );
}

export default App;
