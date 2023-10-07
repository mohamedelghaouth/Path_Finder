import {
  drawShorterPath,
  drawShorterPathOnDragOverStart,
  drawShorterPathOnDragOverTarget,
  setStartNode,
  setStartNodeFromId,
  hasNext,
  countVisited
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

  let visitedNodes = 0;
  while (hasNext(dijkstraUnvisitedNodeSet)) {
    tmpNode = getNextNode();
    tmpNode.setVisited();
    countVisited(visitedNodes++);

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
  let visitedNodes = 0;

  while (hasNext(dijkstraUnvisitedNodeSet)) {
    tmpNode = getNextNode();
    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++);

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
  let visitedNodes = 0;

  while (hasNext()) {
    tmpNode = getNextNode();
    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++);

    if (tmpNode.id === newTargetId) {
      drawShorterPathOnDragOverTarget(newTargetId);
      return;
    }

    tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeSet);
  }
}
