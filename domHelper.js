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


function setSelectedAlgoMessage() {
 
  let selectValue = document.getElementById("algo").value;

  if (selectValue === "dijkstra") {
    setMessage(`<span><b>Dijkstra</b> give the most optimal and shortest path</span>`)
  }
  if (selectValue === "a-search") {
    setMessage(`<span><b>A* algorithm</b> give the most optimal and shortest path</span>`)

  }
  if (selectValue === "best-first-search") {
    setMessage(`<span><b>Best first search</b> does not give the most optimal path</span>`)

  }
  if (selectValue === "breadth-first-search") {
    setMessage(`<span><b>Breadth first search</b> does not give the most optimal path</span>`)

  }
}
function setMessage(message) {
  let rest = `<span class="pad-left">Visited nodes: <span id="visited-node-number">?</span></span><span class="pad-left">Short path length: <span id="short-path-node-number">?</span></span>`
  document.getElementById("message").innerHTML = message + rest;
}