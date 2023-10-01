/** @format */

import { visualizeMaze } from "./maze/index.js";
import { createMap, clearMap } from "./mapHelper.js";

createMap();

//let pathFindingButton = document.getElementById("path-finding-button");

let mazeGenerationButton = document.getElementById("maze-generation-button");
mazeGenerationButton.onclick = visualizeMaze;

document.getElementById("clear-button").addEventListener("click", clearMap);
