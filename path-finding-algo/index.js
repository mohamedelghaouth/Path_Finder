import { dijkstra, dijkstraOnDragOverStart, dijkstraOnDragOverTarget } from "./dijkstra.js";

export async function visualizePathFinding() {
    visualizingPathFinding = true
  clearNodes();
  disableAll();
  let selectValue = document.getElementById("algo").value;

  if (selectValue === "dijkstra") {
    await dijkstra();
  }
  enableAll();
}

function clearNodes() {
  const blocks = document.querySelectorAll(".visited, .short-path-node, .visited-non-animation");

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
  }