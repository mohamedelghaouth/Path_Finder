import {
  dijkstra,
  dijkstraOnDragOverStart,
  dijkstraOnDragOverTarget,
} from "./dijkstra.js";
import {
  aSearch,
  aSearchOnDragOverStart,
  aSearchOnDragOverTarget,
} from "./a-search.js";
import { bestFirstSearch } from "./best-first-search.js";

export async function visualizePathFinding() {
  clearNodes();
  disableAll();
  let selectValue = document.getElementById("algo").value;

  if (selectValue === "dijkstra") {
    setMessage(`<span><b>Dijkstra</b> give the most optimal and shortest path</span>`)
    await dijkstra();
  }
  if (selectValue === "a-search") {
    setMessage(`<span><b>A* algorithm</b> give the most optimal and shortest path</span>`)

    await aSearch();
  }
  if (selectValue === "best-first-search") {
    setMessage(`<span><b>Best first search</b> does not give the most optimal path</span>`)

    await bestFirstSearch();
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
      dijkstraOnDragOverTarget(elementId);
    }
  }

  if (selectValue === "a-search") {
    if (dragged === "start") {
      aSearchOnDragOverStart(elementId);
    } else {
      aSearchOnDragOverTarget(elementId);
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
      dijkstraOnDragOverTarget(`${targetLine}-${targetColumn}`);
    }
  }
  if (selectValue === "a-search") {
    if (dragged === "start") {
      aSearchOnDragOverStart(`${startLine}-${startColumn}`);
    } else {
      aSearchOnDragOverTarget(`${targetLine}-${targetColumn}`);
    }
  }
}

function setMessage(message) {
  document.getElementById("message").innerHTML = message;
}
