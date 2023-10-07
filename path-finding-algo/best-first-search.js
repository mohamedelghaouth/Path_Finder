import {
  drawShorterPath,
  drawShorterPathOnDragOverStart,
  drawShorterPathOnDragOverTarget,
  setStartNode,
  setStartNodeFromId,
  hasNext,
  countVisited
} from "./utils.js";

var bestFirstSearchUnvisitedNodeSet = null;

function getNextNode() {
  let closestNode = null;
  let minDistance = Infinity;
  for (const tmpNode of bestFirstSearchUnvisitedNodeSet) {
    if (tmpNode.distanceFromTarget <= minDistance) {
      closestNode = tmpNode;
      minDistance = tmpNode.distanceFromTarget;
    }
  }

  bestFirstSearchUnvisitedNodeSet.delete(closestNode);

  return closestNode;
}

export async function bestFirstSearch() {
  bestFirstSearchUnvisitedNodeSet = new Set();
  setStartNode(bestFirstSearchUnvisitedNodeSet);
  let tmpNode = null;
  let target = getTargetNode()
  let visitedNodes = 0;

  while (hasNext(bestFirstSearchUnvisitedNodeSet)) {
    tmpNode = getNextNode();

    tmpNode.setVisited();
    countVisited(visitedNodes++);

    await sleep(10);

    if (tmpNode.isTarget) {
      await drawShorterPath();
      return;
    }

    tmpNode.setNeighborsBestFirstSearch(
      bestFirstSearchUnvisitedNodeSet,
      target
    );
  }
}

export function bestFirstSearchOnDragOverStart(newStartId) {

  bestFirstSearchUnvisitedNodeSet = new Set();
  setStartNodeFromId(bestFirstSearchUnvisitedNodeSet, newStartId);
  let tmpNode = null;
  let target = getTargetNode();
  let visitedNodes = 0;

  while (hasNext(bestFirstSearchUnvisitedNodeSet)) {
    tmpNode = getNextNode();

    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++);

    if (tmpNode.isTarget) {
      drawShorterPathOnDragOverStart(newStartId);
      return;
    }

    tmpNode.setNeighborsBestFirstSearch(
      bestFirstSearchUnvisitedNodeSet,
      target
    );
  }
}

export function bestFirstSearchOnDragOverTarget(newTargetId) {

  bestFirstSearchUnvisitedNodeSet = new Set();
  setStartNode(bestFirstSearchUnvisitedNodeSet);
  let tmpNode = null;
  let target = getNode(newTargetId);
  let visitedNodes = 0;

  while (hasNext(bestFirstSearchUnvisitedNodeSet)) {
    tmpNode = getNextNode();

    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++);

    if (tmpNode.id === newTargetId) {
      drawShorterPathOnDragOverTarget(newTargetId);
      return;
    }


    tmpNode.setNeighborsBestFirstSearch(
      bestFirstSearchUnvisitedNodeSet,
      target
    );
  }
}
