import { TicTacToe } from "@/components/tic-tac-toe";

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.92_0.04_220),transparent_55%),linear-gradient(160deg,oklch(0.96_0.02_250),oklch(0.93_0.03_200))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(oklch(0.7_0.02_250/0.15)_1px,transparent_1px),linear-gradient(90deg,oklch(0.7_0.02_250/0.15)_1px,transparent_1px)] bg-size-[28px_28px]"
      />
      <div className="relative z-10 w-full max-w-md">
        <TicTacToe />
      </div>
    </main>
  );
}
