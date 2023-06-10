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

  const setPlayerOneTurn = (turn) => {
    player1Turn = turn;
  };
  const changeTurn = () => {
    player1Turn = !player1Turn;
  };

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

  const resetPlayerPoints = () => {
    if (playerOne !== null && playerTwo !== null) {
      playerOne.setPoints(0);
      playerTwo.setPoints(0);
    }
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
    if (domIndex != -1) {
      //once a cell is clicked it cannot be clicked (pointer events to none so the index if the user clicks will be -1)
      const [xCoordinate, yCoordinate] = domIndexToArrayIndex[domIndex];
      player1Turn === true
        ? playerOne.makeMove(xCoordinate, yCoordinate)
        : playerTwo.makeMove(xCoordinate, yCoordinate);

      //mirar estado y renderizar mensaje en funcion a ello
      const { winnerSymbol, gameStatus } = checkGameStatus();

      if (gameStatus === "Draw" || gameStatus === "End") {
        if (gameStatus === "End") {
          winnerSymbol === playerOne.getMarker()
            ? playerOne.increasePoints()
            : playerTwo.increasePoints();
        }

        DOM.newMatch();
        DOM.renderGameStatus({
          playerOne: playerOne.getPoints(),
          playerTwo: playerTwo.getPoints(),
        });
      }

      //cambiar turno
      changeTurn();
    }
  };

  return {
    checkGameStatus,
    createPlayers,
    getPlayerMarker,
    playerMove,
    setPlayerOneTurn,
    resetPlayerPoints,
  };
})();

const DOM = (function () {
  //player one and two btns nodelist insto an array
  const playerBtns = [...document.querySelectorAll("button.player")];

  //start game btn
  const startGameBtn = document.getElementById("startGameBtn");

  //Const gameboard container
  const gameboardContainer = document.querySelector("div.container");

  //Player Points article
  const playerPointsArticle = document.querySelector("article.playerPoints");

  //Back to menu btn
  const backToMenuBtn = document.getElementById("backToMenu");

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
        const divChild = document.createElement("div");
        celdaDiv.append(divChild);
        gameboardContainer.append(celdaDiv);
      }
    }
    gameboardContainer.classList.remove("hidden");
  };

  const renderPlayerPointsArticle = () => {
    playerPointsArticle.classList.remove("hidden");
    //if rendered a new game has begun so pointers to zero
    renderGameStatus({
      playerOne: 0,
      playerTwo: 0,
    });
  };

  const cellClicked = (target) => {
    //add class X or O accoding to players turn
    target.classList.add(Controller.getPlayerMarker(), "clicked");
    //player makes a click on a cell (take the index of the parent div which is the one forming the container)
    Controller.playerMove(
      [...document.querySelectorAll("div.cell")].indexOf(target.parentElement)
    );
  };

  const gameboardCellEvents = () => {
    //Gameboard cells
    const cells = [...document.querySelectorAll("div.cell")];
    cells.forEach((cell) => {
      cell.addEventListener("mouseover", (e) => {
        const target = e.target;
        target.classList.add(Controller.getPlayerMarker(), "opaque");

        cell.addEventListener("mouseout", (e) => {
          const target = e.target;
          target.classList.remove(Controller.getPlayerMarker(), "opaque");
        });
      });

      cell.addEventListener("click", (e) => {
        const target = e.target;
        cellClicked(target);
      });
    });
  };

  const registerEvents = () => {
    playerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => playerBtnClicked(e));
    });

    startGameBtn.addEventListener("click", () => {
      startGameBtnClicked();
      hideMenuContainer();
      renderGameboard();
      renderPlayerPointsArticle();
      gameboardCellEvents();
      //render back to the menu btn
      backToMenuBtn.classList.remove("hidden");
    });

    backToMenuBtn.addEventListener("click", renderMenu);
  };

  const renderGameStatus = (status) => {
    const playerOnePointsSpan = document.querySelector("span.playerOnePoints");
    playerOnePointsSpan.textContent = status.playerOne;
    const playerTwoPointsSpan = document.querySelector("span.playerTwoPoints");
    playerTwoPointsSpan.textContent = status.playerTwo;
  };

  const newMatch = () => {
    const cells = [...document.querySelectorAll("div.cell")];
    for (const cell of cells) {
      const childDiv = [...cell.children][0];
      childDiv.removeAttribute("class");
    }
    Gameboard.resetGameboard();
    renderGameboard();
    gameboardCellEvents();
  };

  const renderMenu = () => {
    //set article visible
    const menu = document.querySelector("div.menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    }

    //remove the selected classes from the btns
    const selectedMenuBtns = [...menu.children]
      .filter((el) => el.classList.contains("selected"))
      .forEach((btn) => btn.classList.remove("selected"));

    //set container hidden
    const gameboardContainer = document.querySelector("div.container");
    if (!gameboardContainer.classList.contains("hidden")) {
      gameboardContainer.classList.add("hidden");
      //hide player points section it will work in concordance with gameboardContainer and back to the menu btn
      playerPointsArticle.classList.add("hidden");
      backToMenuBtn.classList.add("hidden");
    }

    //set playerone turn true
    Controller.setPlayerOneTurn(true);

    //reset player points
    Controller.resetPlayerPoints();

    registerEvents();
  };

  return {
    renderMenu,
    renderGameStatus,
    newMatch,
  };
})();

window.addEventListener("DOMContentLoaded", () => {
  DOM.renderMenu();
});
