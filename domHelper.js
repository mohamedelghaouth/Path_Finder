var mazeAlgo = document.getElementById("maze-algo");
var pathFindingAlgo = document.getElementById("algo");
var mazeGenerationButton = document.getElementById("maze-generation-button");
var pathFindingButton = document.getElementById("path-finding-button");
var clearButton = document.getElementById("clear-button");

function disableAll() {
  mazeGenerationButton.disabled = true;
  pathFindingButton.disabled = true;
  clearButton.disabled = true;
  mazeAlgo.disabled = true;
  pathFindingAlgo.disabled = true;
}

function enableAll() {
  mazeGenerationButton.disabled = false;
  pathFindingButton.disabled = false;
  clearButton.disabled = false;
  mazeAlgo.disabled = false;
  pathFindingAlgo.disabled = false;
}
