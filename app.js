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
var game_board = [EMPTY, EMPTY, EMPTY,
				 EMPTY, EMPTY, EMPTY,
				 EMPTY, EMPTY, EMPTY];

// State to refresh to
var fresh_game = game_board;

var computer_move_counter = computer_move_counter || 0;

var newGame = function () {
	var boxes = getBoxes();
  		// reset game styles
  		for (var i = 0; i < boxes.length; i++) {
    	boxes[i].className = "box";
  		};
  		// refresh game state
  		current_player = PLAYER_X;
  		game_board = fresh_game;
}

// Sets X as Starting player
var current_player = PLAYER_X;


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

// Stupid "AI" based of Math.random - recursive will call it self until it can move
// Will call up to 1000 times and then stop
var stupid_computer_move = function () {
	computer_move_counter = computer_move_counter || 0;

	var random_pc_move = Math.round(Math.random() * 10);;
		if (game_board[random_pc_move] == EMPTY) {
			var computer_move_counter = 0;
			setTimeout(function () {
          		getBox(random_pc_move).click();
          		console.log("Computer Moved!");
        	}, 250);
        	
		} else if (game_board[random_pc_move] !== EMPTY  && computer_move_counter < 1000) {
			console.log("Computer Thinking!");
			computer_move_counter +=1;
			console.log("The AI has tried " + computer_move_counter + " times to move.")
			stupid_computer_move();
	}
};


var boxClickHandler = function (event) {
  // Grab the box that was clicked.
  var box = event.target;
  var id = parseInt(event.target.getAttribute("id"));
// remove later //
  console.log(box);
  console.log(id);
  console.log(current_player)
// remove later //
	if (game_board[id] == EMPTY) {
		box.classList.add(current_player);

		game_board = move(game_board, current_player, id);
		
		if (isWin(game_board)){
			if (confirm("Player " + current_player + " Wins! Play a new game?")){
			newGame();}
		} else {
			current_player = togglePlayer(current_player);
			if (current_player == PLAYER_O) {
				stupid_computer_move();
			}
		};
		
		// current_player = togglePlayer(current_player);
		
		console.log(game_board); // remove later //

	}
};


window.addEventListener("load", function () {
  var boxes = getBoxes();
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = boxClickHandler;
  };
  console.log(boxes); // remove later //
});


