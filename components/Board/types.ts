export default interface Board {
  pieces: number[];
  selectedPiece: number;
  playerTurn: number;
  roll: number;
  phase: string;
  validMoves: number[];
  score: number[];
  winner: number;
}
