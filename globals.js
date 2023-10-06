
const V_Orientation = 1;
const H_Orientation = 2;

var visualizingPathFinding = false

var map = new Map();
var isMouseDown = false;
var blockHeight = 25;
var blockWidth = 25;
var mapHeight = getMapHeight();
var mapWidth = getMapWidth();
var targetLine = blockHeight * Math.floor(mapHeight / (2 * blockHeight));
var targetColumn = blockWidth * Math.floor(mapWidth / (3 * blockWidth)) * 2;
var startLine = blockHeight * Math.floor(mapHeight / (2 * blockHeight));
var startColumn = blockWidth * Math.floor(mapWidth / (4 * blockWidth));
var domElement = initializeDomElement();

function getMapHeight() {
  let navHeight = document.getElementById("nav").offsetHeight;
  let optionsHeight = document.getElementById("options").offsetHeight;
  let messageHeight = document.getElementById("message").offsetHeight;
  let contHeight = document.getElementById("container").offsetHeight;

  let height = contHeight - navHeight - optionsHeight - messageHeight ;
  let numberOfLine = Math.trunc(height / blockHeight) - 6;

  return blockHeight * numberOfLine;
}

function getMapWidth() {
  let contWidth = document.getElementById("container").offsetWidth;

  let numberOfColumn = Math.trunc(contWidth / blockWidth);

  return blockWidth * numberOfColumn;
}

