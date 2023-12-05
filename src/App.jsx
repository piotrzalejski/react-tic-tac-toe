import "./App.css";
import Block from "./Block";
import Board from "./Board";
import { useState, useEffect } from "react";

const defBlocks = () => new Array(9).fill(null);

const lines = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [blocks, setBlocks] = useState(defBlocks());
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  function handleBlockClick(index) {
    const isPlayerTurn =
      blocks.filter((block) => block !== null).length % 2 === 0;
    if (isPlayerTurn && !gameOver) {
      setBlocks((prevBlocks) => {
        const newBlocks = [...prevBlocks];
        newBlocks[index] = "x";
        return newBlocks;
      });
    }
  }

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const linesThatAre = (a, b, c) => {
      return lines.filter((blockIndexes) => {
        const blockValues = blockIndexes.map((index) => blocks[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(blockValues.sort())
        );
      });
    };

    const playerWins = linesThatAre("x", "x", "x").length > 0;
    const compWins = linesThatAre("o", "o", "o").length > 0;

    const isDraw =
      blocks.every((block) => block !== null) && !playerWins && !compWins;

    if (playerWins) {
      setWinner("x");
      setGameOver(true);
    }

    if (compWins) {
      setWinner("o");
      setGameOver(true);
    }

    if (isDraw) {
      setWinner("Draw");
      setGameOver(true);
    }

    const emptyIndexes = blocks
      .map((block, index) => (block === null ? index : null))
      .filter((val) => val !== null);

    const isCompTurn =
      blocks.filter((block) => block !== null).length % 2 === 1;

    const compMove = (index) => {
      setTimeout(() => {
        setBlocks((prevBlocks) => {
          const newBlocks = [...prevBlocks];
          newBlocks[index] = "o";
          return newBlocks;
        });
      }, 500);
    };

    if (!gameOver && isCompTurn) {
      if (!playerWins && !compWins) {
        const winningLines = linesThatAre("o", "o", null);
        if (winningLines.length > 0) {
          const winPos = winningLines[0].filter(
            (index) => blocks[index] === null
          )[0];
          compMove(winPos);
          return;
        }

        const linesToBlock = linesThatAre("x", "x", null);
        if (linesToBlock.length > 0) {
          const blockPos = linesToBlock[0].filter(
            (index) => blocks[index] === null
          )[0];
          compMove(blockPos);
          return;
        }

        const linePath = linesThatAre("o", null, null);
        if (linePath.length > 0) {
          const compPlace = linePath[0].filter(
            (index) => blocks[index] === null
          )[0];
          compMove(compPlace);
          return;
        }

        const randIndex =
          emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
        compMove(randIndex);
      }
    }
  }, [blocks, gameOver]);

  function resetGame() {
    setBlocks(defBlocks());
    setGameOver(false);
    setWinner(null);
  }

  return (
    <main>
      <Board>
        {blocks.map((block, index) => (
          <Block
            key={index}
            x={block === "x" ? 1 : 0}
            o={block === "o" ? 1 : 0}
            onClick={() => handleBlockClick(index)}
          />
        ))}
      </Board>
      {!!winner && winner == "x" && (
        <div className="result green">You Won!</div>
      )}
      {!!winner && winner == "o" && <div className="result red">You Lost!</div>}
      {!!winner && winner == "Draw" && <div className="result">Draw!</div>}
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </main>
  );
}
