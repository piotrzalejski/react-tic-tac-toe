import "./App.css";
import Block from "./Block";
import Board from "./Board";
import { useState, useEffect } from "react";

const defBlocks = () => new Array(9).fill(null);

const lines = [
  [0, 1, 2], // horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal
  [2, 4, 6],
];

export default function App() {
  const [blocks, setBlocks] = useState(defBlocks());

  useEffect(() => {
    const isCompTurn =
      blocks.filter((block) => block !== null).length % 2 === 1;
    const compMove = (index) => {
      let newBlocks = blocks;
      newBlocks[index] = "o";
      setBlocks([...newBlocks]);
    };
    if (isCompTurn) {
      const emptyIndexes = blocks
        .map((block, index) => (block === null ? index : null))
        .filter((val) => val !== null);

      const randIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      compMove(randIndex);
    }
  }, [blocks]);

  function handleBlockClick(index) {
    const isPlayerTurn =
      blocks.filter((block) => block !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newBlocks = blocks;
      newBlocks[index] = "x";
      setBlocks([...newBlocks]);
    }
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
    </main>
  );
}
