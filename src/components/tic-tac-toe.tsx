"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Player = "X" | "O";
type Cell = Player | null;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function getWinner(board: Cell[]): { winner: Player; line: number[] } | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [...line] };
    }
  }
  return null;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = useMemo(() => getWinner(board), [board]);
  const isDraw = !result && board.every(Boolean);
  const gameOver = Boolean(result) || isDraw;

  const status = result
    ? `Player ${result.winner} wins`
    : isDraw
      ? "It's a draw"
      : `Player ${current}'s turn`;

  function handleClick(index: number) {
    if (board[index] || gameOver) return;

    const nextBoard = [...board];
    nextBoard[index] = current;
    setBoard(nextBoard);

    const nextResult = getWinner(nextBoard);
    const nextDraw = !nextResult && nextBoard.every(Boolean);

    if (nextResult) {
      setScores((prev) => ({
        ...prev,
        [nextResult.winner]: prev[nextResult.winner] + 1,
      }));
      return;
    }

    if (nextDraw) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setCurrent((prev) => (prev === "X" ? "O" : "X"));
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setCurrent("X");
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
    resetBoard();
  }

  return (
    <Card className="w-full max-w-md border-border/70 bg-card/90 shadow-lg backdrop-blur-sm">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="font-(family-name:--font-syne) text-3xl tracking-tight">
          Tic-Tac-Toe
        </CardTitle>
        <CardDescription className="text-base">{status}</CardDescription>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-lg bg-secondary/80 px-3 py-2">
            <p className="text-muted-foreground">X</p>
            <p className="text-lg font-semibold text-sky-700">{scores.X}</p>
          </div>
          <div className="rounded-lg bg-secondary/80 px-3 py-2">
            <p className="text-muted-foreground">Draws</p>
            <p className="text-lg font-semibold">{scores.draws}</p>
          </div>
          <div className="rounded-lg bg-secondary/80 px-3 py-2">
            <p className="text-muted-foreground">O</p>
            <p className="text-lg font-semibold text-amber-700">{scores.O}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className="mx-auto grid aspect-square w-full max-w-xs grid-cols-3 gap-2 rounded-2xl bg-secondary/60 p-2"
          role="grid"
          aria-label="Tic tac toe board"
        >
          {board.map((cell, index) => {
            const isWinning = result?.line.includes(index);
            return (
              <button
                key={index}
                type="button"
                role="gridcell"
                aria-label={
                  cell ? `Cell ${index + 1}, ${cell}` : `Empty cell ${index + 1}`
                }
                disabled={Boolean(cell) || gameOver}
                onClick={() => handleClick(index)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-xl border border-border/80 bg-background text-4xl font-bold transition",
                  "hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:cursor-default disabled:hover:bg-background",
                  isWinning && "animate-win-pulse bg-primary/10"
                )}
              >
                {cell ? (
                  <span
                    className={cn(
                      "animate-mark-in",
                      cell === "X" ? "text-sky-700" : "text-amber-700"
                    )}
                  >
                    {cell}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="justify-center gap-2">
        <Button type="button" onClick={resetBoard} className="gap-2">
          <RotateCcw />
          New game
        </Button>
        <Button type="button" variant="outline" onClick={resetScores}>
          Reset scores
        </Button>
      </CardFooter>
    </Card>
  );
}
