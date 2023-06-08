const Gameboard = (function () {
  let gameboard = [
    ["N", "N", "N"],
    ["N", "N", "N"],
    ["N", "N", "N"],
  ];

  const getGameboard = () => gameboard;
  const resetGameboard = () => {
    gameboard = [
      ["N", "N", "N"],
      ["N", "N", "N"],
      ["N", "N", "N"],
    ];
  };

  return { getGameboard, resetGameboard };
})();

const HumanPlayer = (playerMark) => {
  const mark = playerMark;

  let points = 0;

  const makeMove = (row, col) => {
    const gameBoard = Gameboard.getGameboard();
    gameBoard[row][col] = playerMark;
  };

  const getMarker = () => mark;

  const increasePoints = () => {
    points = ++points;
  };

  const getPoints = () => points;

  const setPoints = (_points) => (points = _points);

  return {
    makeMove,
    getMarker,
    increasePoints,
    getPoints,
    setPoints,
  };
};
