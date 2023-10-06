import {
  drawShorterPath,
  drawShorterPathOnDragOverStart,
  drawShorterPathOnDragOverTarget,
  setStartNode,
  setStartNodeFromId,
  hasNext,
} from "./utils.js";

var dijkstraUnvisitedNodeSet = null;

/***
 * get the closest unvisited node
 */
function getNextNode() {
  let closestNode = null;
  let minWeight = Infinity;
  for (const tmpNode of dijkstraUnvisitedNodeSet) {
    if (!tmpNode.isVisited && tmpNode.weight <= minWeight) {
      closestNode = tmpNode;
      minWeight = tmpNode.weight;
    }
  }

  dijkstraUnvisitedNodeSet.delete(closestNode);

  return closestNode;
}



export async function dijkstra() {
  dijkstraUnvisitedNodeSet = new Set();
  setStartNode(dijkstraUnvisitedNodeSet);
  let tmpNode = null;

  while (hasNext(dijkstraUnvisitedNodeSet)) {
    tmpNode = getNextNode();
    tmpNode.setVisited();

    await sleep(10);

    if (tmpNode.isTarget) {
      await drawShorterPath();
      return;
    }

    tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeSet);
  }
}

export function dijkstraOnDragOverStart(newStartId) {
  dijkstraUnvisitedNodeSet = new Set();
  setStartNodeFromId(dijkstraUnvisitedNodeSet, newStartId);
  let tmpNode = null;

  while (hasNext(dijkstraUnvisitedNodeSet)) {
    tmpNode = getNextNode();
    tmpNode.setVisitedWithoutAnimation();


    if (tmpNode.isTarget) {
        drawShorterPathOnDragOverStart(newStartId);
      return;
    }

    tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeSet);
  }
}

export function dijkstraOnDragOverTarget(newTargetId) {
    dijkstraUnvisitedNodeSet = new Set();
    setStartNode();
    let tmpNode = null;
  
    while (hasNext()) {
      tmpNode = getNextNode();
      tmpNode.setVisitedWithoutAnimation();
  
  
      if (tmpNode.id === newTargetId) {
          drawShorterPathOnDragOverTarget(newTargetId);
        return;
      }
  
      tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeSet);
    }
  }