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

// Sets X as Starting player
var current_player = PLAYER_X;


var getBoxes = function () {
  return document.getElementsByClassName("box");
};

var getBox = function (num) {
	return document.getElementById(num);
}

var togglePlayer = function (player) {
  if (player == PLAYER_X) {
    return PLAYER_O;
  } else {
    return PLAYER_X;
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
  box.classList.add(current_player);
	current_player = togglePlayer(current_player);
};


window.addEventListener("load", function () {
  var boxes = getBoxes();
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = boxClickHandler;
  }
  console.log(boxes);
});


