import { recursiveDivisionMaze } from "./recursive-division.js";
import { deptFirstSearchMaze } from "./depth-first-search.js";
import { randomMaze } from "./random-maze.js";
import { clearMap } from "../mapHelper.js";

export async function visualizeMaze() {
  clearMap();
  disableAll()
  let selectValue = document.getElementById("maze-algo").value;

  if (selectValue === "recursive-division") {
    await recursiveDivisionMaze();
  }
  if (selectValue === "depth-first-search") {
    await deptFirstSearchMaze();
  }
  if (selectValue === "random-maze") {
    randomMaze();
  }
  enableAll()
}
