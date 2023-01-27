const PIECES = [
    1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ]; // 1 and 2 represents each players respective marbles
const MAX_ROLL = 4; // max number of jumps: 1,4,5 will result in rolling again
const DEFAULT_ROLL = 5; // when 0 is rolled which means all pieces are face down which means piece can move 5 squares
const WIN_CONDITION_SCORE = 5; // score needed to win game
const BOARD_LENGTH = 30; // number of grids on the board

const PLAYER_ID = 1
const AI_ID = 1

const game = {
  PIECES: PIECES,
  MAX_ROLL: MAX_ROLL,
  DEFAULT_ROLL: DEFAULT_ROLL,
  WIN_CONDITION_SCORE: WIN_CONDITION_SCORE,
  BOARD_LENGTH: BOARD_LENGTH,
  PLAYER_ID: PLAYER_ID,
  AI_ID: AI_ID
}

export default game;
