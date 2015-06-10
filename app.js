// Variables for player win logic
var PLAYER_X = "X";
var PLAYER_O = "O";
var EMPTY = "";

// All posible win combo's
// These correspond to the IDs
var WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
  ];

// Start blank game board
var gameBoard = [EMPTY, EMPTY, EMPTY,
				 EMPTY, EMPTY, EMPTY,
				 EMPTY, EMPTY, EMPTY];

// State to refresh to
var freshGame = gameBoard;

var computerMoveCounter = computerMoveCounter || 0;

var newGame = function () {
	var boxes = getBoxes();
  		// reset game styles
  		for (var i = 0; i < boxes.length; i++) {
  			boxes[i].className = "box";
  		};
  		// refresh game state
  		currentPlayer = PLAYER_X;
  		gameBoard = freshGame;
  	};

// Sets X as Starting player
var currentPlayer = PLAYER_X;


var getBoxes = function () {
	return document.getElementsByClassName("box");
};

var getBox = function (num) {
	return document.getElementById(num);
};

var togglePlayer = function (player) {
	if (player == PLAYER_X) {
		return PLAYER_O;
	} else {
		return PLAYER_X;
	}
};

// move function that takes the current game board, the payer moving and the posistion they are moving to
// and returns an updated board
var move = function (board, player, position) {
	var new_board = board.concat();
	new_board[position] = player;
	return new_board;
};


var isWin = function (board) {
	for (var i = 0; i < WIN_COMBOS.length; i++) {
    var combo = WIN_COMBOS[i]; // combo to check against
    var one = board[combo[0]]; // first posistion to check against
    if (one != EMPTY && one == board[combo[1]] && one == board[combo[2]]) {
    	return true;
    }
}
return false;
};

var isTie = function (board) {
	for (var i = 0; i < board.length; i++) {
		if (board[i] == EMPTY) {
			return false
		}
	};
		return true	
};


// Stupid "AI" based of Math.random - recursive will call it self until it can move
// Will call up to 250 times and then stop
var stupid_computer_move = function () {
	var computerMoveCounter = computerMoveCounter || 0;

	var random_pc_move = Math.round(Math.random() * 10);;
	if (gameBoard[random_pc_move] == EMPTY) {
		var computerMoveCounter = 0;
		setTimeout(function () {
			getBox(random_pc_move).click();
			}, 250);

	} else if (gameBoard[random_pc_move] !== EMPTY  && computerMoveCounter < 250) {
		computerMoveCounter +=1;
		stupid_computer_move();
	} else {
		newGame();
	}
};


var boxClickHandler = function (event) {
  // Grab the box that was clicked.
  var box = event.target;
  var id = parseInt(event.target.getAttribute("id"));
	if (gameBoard[id] == EMPTY) {
		box.classList.add(currentPlayer);
		gameBoard = move(gameBoard, currentPlayer, id);

				if (isWin(gameBoard)){ // if thsiis return true show winner and ask for a new game
					if (confirm("Player " + currentPlayer + " Wins! Play a new game?")){ 
						newGame(); 
					}
				} else // end of is_win check
				if (isTie(gameBoard)){ 
					alert("It's a tie game!");
					newGame();
				} else // end of isTie check

				currentPlayer = togglePlayer(currentPlayer);
				
				if (currentPlayer == PLAYER_O) {
					stupid_computer_move();
				};
			};
		};


	window.addEventListener("load", function () {
		var boxes = getBoxes();
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].onclick = boxClickHandler;
	};
});


