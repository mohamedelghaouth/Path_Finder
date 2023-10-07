/** @format */

import { visualizeMaze } from "./maze/index.js";
import { visualizePathFinding } from "./path-finding-algo/index.js";
import { createMap, clearMap } from "./mapHelper.js";

createMap();
setSelectedAlgoMessage()

let mazeGenerationButton = document.getElementById("maze-generation-button");
mazeGenerationButton.onclick = visualizeMaze;

let algoVisualizationButton = document.getElementById("path-finding-button");
algoVisualizationButton.onclick = visualizePathFinding;

document.getElementById("clear-button").addEventListener("click", clearMap);


let algoSelect = document.getElementById("algo");

algoSelect.onchange =  setSelectedAlgoMessage
