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
