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

const Controller = (function () {
  let playerOne = null;
  let playerTwo = null;
  let player1Turn = true;
  const domIndexToArrayIndex = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
  };
  const WINNING_COMBOS = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ], //top row
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ], //middle row
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ], // bottom row
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ], //left column
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ], //middle column
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ], //right column
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ], //right diagonal
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ], //left diagonal
  ];

  //Methods

  const changeTurn = () => (player1Turn = !player1Turn);

  const _checkDraw = (status) => {
    const gameboard = Gameboard.getGameboard();
    //mirar si alguna fila contiene n (el juego sigue) o si no (el juego ha terminado)
    let isDraw = true;

    for (const fila of gameboard) {
      if (fila.includes("N")) {
        isDraw = false;
        break; //nos salimos y no valoramos más ya que sabemos que el juego sigue
      }
    }

    status.gameStatus = isDraw
      ? "Draw"
      : status.winnerSymbol !== "N"
      ? "End"
      : "Continue";

    return status;
  };

  const _checkWinner = (status) => {
    const gameboard = Gameboard.getGameboard();
    //mirar dentro de los patrones en winning combos
    for (const combo of WINNING_COMBOS) {
      //deestructurar las coordenadas
      const [c1, c2, c3] = combo;

      //para que la combinacion sea ganadora los tres tienen que tener el mismo simbolo obviando que
      //alguno de estos (y por tanto todos; ya que todos tienen que tener el mismo symbolo) no tenga N

      const symbol1 = gameboard[c1[0]][c1[1]];
      const symbol2 = gameboard[c2[0]][c2[1]];
      const symbol3 = gameboard[c3[0]][c3[1]];

      if (symbol1 != "N" && symbol1 === symbol2 && symbol2 === symbol3) {
        //simbolo del ganador
        status.winnerSymbol = symbol1;
      }
    }

    return status;
  };

  const checkGameStatus = () => {
    let status = {
      winnerSymbol: "N", //X for player1 or O for player two
      gameStatus: "Continue", //End if a player already won or Draw if there is a draw
    };

    status = _checkWinner(status);

    status = _checkDraw(status);

    return status;
  };

  const cellClicked = (index) => {
    //posiciones a partir de la relacion entre el indice del div del dom y el gameboard
    const [x, y] = domIndexToArrayIndex[index];

    //usuario hace ese movimiento
    if (player1Turn) {
      playerX.makeMove(x, y);
    } else {
      playerO.makeMove(x, y);
    }

    //mirar estado y renderizar mensaje en funcion a ello
    const { winnerSymbol, gameStatus } = checkGameStatus();

    if (gameStatus === "Draw") {
      DOM.renderGameMessage("Its a draw !!!!");
    }

    if (gameStatus === "End") {
      winnerSymbol === playerX.getMarker()
        ? playerX.increasePoints()
        : playerO.increasePoints();
      DOM.renderGameMessage(`${winnerSymbol} winssssss!`);
    }

    //cambiar turno
    changeTurn();
  };

  const createHumanPlayer = (key) => {
    key === "playerOne"
      ? (playerOne = HumanPlayer("X"))
      : (playerTwo = HumanPlayer("O"));
  };

  const createAIPlayer = () => {};

  const createPlayers = (playersObj) => {
    for (const [key, value] of Object.entries(playersObj)) {
      value === "human" ? createHumanPlayer(key) : createAIPlayer(key);
    }
  };

  const getPlayerMarker = () => {
    return player1Turn === true ? playerOne.getMarker() : playerTwo.getMarker();
  };

  const playerMove = (domIndex) => {
    const gameboard = Gameboard.getGameboard();
    const [xCoordinate, yCoordinate] = domIndexToArrayIndex[domIndex];
    player1Turn === true
      ? playerOne.makeMove(xCoordinate, yCoordinate)
      : playerTwo.makeMove(xCoordinate, yCoordinate);

    changeTurn();
  };

  return {
    checkGameStatus,
    cellClicked,
    createPlayers,
    getPlayerMarker,
    playerMove,
  };
})();

const DOM = (function () {
  //player one and two btns nodelist insto an array
  const playerBtns = [...document.querySelectorAll("button.player")];

  //start game btn
  const startGameBtn = document.getElementById("startGameBtn");

  //Const gameboard container
  const gameboardContainer = document.querySelector("div.container");

  //select player one and two buttons
  const removeSelectedClassFromBtnGroup = (classname) => {
    playerBtns
      .filter((el) => el.classList.contains(classname))
      .forEach((el) => el.classList.remove("selected"));
  };

  const playerBtnClicked = (e) => {
    const btn = e.target;
    removeSelectedClassFromBtnGroup([...btn.classList][1]);
    btn.classList.add("selected");
  };

  //once startgame is clicked get the selected elements
  const startGameBtnClicked = () => {
    const selectedBtns = playerBtns.filter((btn) =>
      btn.classList.contains("selected")
    );

    if (selectedBtns.length !== 0) {
      const playerOneBtn = selectedBtns[0];
      const playerOneType = [...playerOneBtn.classList][2]; //3rd class human or ai
      const playerTwoBtn = selectedBtns[1];
      const playerTwoType = [...playerTwoBtn.classList][2]; //3rd class human or ai

      const players = {
        playerOne: playerOneType,
        playerTwo: playerTwoType,
      };

      Controller.createPlayers(players);
    }
  };

  const hideMenuContainer = () => {
    document.querySelector("div.menu").classList.add("hidden");
  };

  const renderGameboard = () => {
    gameboardContainer.replaceChildren();

    for (let i = 0; i < Gameboard.getGameboard().length; i++) {
      const fila = Gameboard.getGameboard()[i];
      for (let celda = 0; celda < fila.length; celda++) {
        const celdaDiv = document.createElement("div");
        celdaDiv.setAttribute("class", "cell");
        gameboardContainer.append(celdaDiv);
      }
    }
    gameboardContainer.classList.remove("hidden");
  };

  const cellClicked = (e) => {
    const btn = e.target;
    //add class X or O accoding to players turn
    btn.classList.add(Controller.getPlayerMarker());
    //player makes a click on a cell (it has an index)
    Controller.playerMove(
      [...document.querySelectorAll("div.cell")].indexOf(btn)
    );
  };

  const registerEvents = () => {
    playerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => playerBtnClicked(e));
    });

    startGameBtn.addEventListener("click", () => {
      startGameBtnClicked();
      hideMenuContainer();
      renderGameboard();

      //Gameboard cells
      const cells = [...document.querySelectorAll("div.cell")];
      cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          cellClicked(e);
        });
      });
    });
  };

  return {
    registerEvents,
  };
})();

window.addEventListener("DOMContentLoaded", () => {
  DOM.registerEvents();
});
