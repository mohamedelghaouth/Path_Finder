import { recursiveDivisionMaze } from "./recursive-division.js";
import { deptFirstSearchMaze } from "./depth-first-search.js";
import { randomMaze } from "./random-maze.js";
import { clearFromWalls } from "../mapHelper.js";

export function visualizeMaze() {
  clearFromWalls();
  let selectValue = document.getElementById("maze-algo").value;

  if (selectValue === "recursive-division") {
    recursiveDivisionMaze();
  }
  if (selectValue === "depth-first-search") {
    deptFirstSearchMaze();
  }
  if (selectValue === "random-maze") {
    randomMaze();
  }
}
