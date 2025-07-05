import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const varFiltersCg = [
  [0,1,2], [3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function Square({value, onClick}) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}>
      {value}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function calculateWinner(varOcg) {
    for (let line of varFiltersCg) {
      const [a, b, c] = line;
      if (varOcg[a] && varOcg[a] === varOcg[b] && varOcg[a] === varOcg[c]) {
        return varOcg[a];
      } 
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O' ;
    setSquares(nextSquares);

    const gameWinner = calculateWinner(nextSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    }
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  const status = xIsNext ? 'X' : 'O';

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{status}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner ? winner : 'None'}</span></div>
      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardStyle}>
      {[0,1,2].map(row => (
        <div key={row} className="board-row" style={rowStyle}>
        {[0,1,2].map(col => {
          const index = row * 3 + col;
          return (
            <Square key = {index} value={squares[index]}
            onClick={() => handleClick(index)} /> 
          );
        })}
      </div>
      ))}

        // <div className="board-row" style={rowStyle}>
        //   <Square />
        //   <Square />
        //   <Square />
        // </div>
        // <div className="board-row" style={rowStyle}>
        //   <Square />
        //   <Square />
        //   <Square />
        // </div>
        // <div className="board-row" style={rowStyle}>
        //   <Square />
        //   <Square />
        //   <Square />
        // </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);