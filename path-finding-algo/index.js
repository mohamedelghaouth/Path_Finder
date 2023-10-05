import { dijkstra, dijkstraOnDragOverStart, dijkstraOnDragOverTarget } from "./dijkstra.js";
import { aSearch, aSearchOnDragOverStart, aSearchOnDragOverTarget } from "./a-search.js";

export async function visualizePathFinding() {
    visualizingPathFinding = true
  clearNodes();
  disableAll();
  let selectValue = document.getElementById("algo").value;

  if (selectValue === "dijkstra") {
    await dijkstra();
  }
  if (selectValue === "a-search") {
    await aSearch();
  }
  enableAll();
}

function clearNodes() {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach((block) => {
    let node = map.get(block.id);
    node.initForPathFinding();
  });
}


export function visualizePathFindingOnDragOver(dragged, elementId) {
    clearNodes();
    let selectValue = document.getElementById("algo").value;
  
    if (selectValue === "dijkstra") {
        if (dragged === "start") {
            dijkstraOnDragOverStart(elementId);
        } else {
            dijkstraOnDragOverTarget(elementId)
        }
    }

    if (selectValue === "a-search") {
        if (dragged === "start") {

            aSearchOnDragOverStart(elementId);

        } else {
            aSearchOnDragOverTarget(elementId)
        }
    }
  }

  export function visualizePathFindingOnDragEnd(dragged) {
    clearNodes();
    let selectValue = document.getElementById("algo").value;
  
    if (selectValue === "dijkstra") {
        if (dragged === "start") {
            dijkstraOnDragOverStart(`${startLine}-${startColumn}`);
        } else {
            dijkstraOnDragOverTarget(`${targetLine}-${targetColumn}`)
        }
    }
    if (selectValue === "a-search") {
        if (dragged === "start") {
            aSearchOnDragOverStart(`${startLine}-${startColumn}`);
        } else {
            aSearchOnDragOverTarget(`${targetLine}-${targetColumn}`)
        }
    }
  }