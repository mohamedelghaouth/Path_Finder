import {
  drawShorterPath,
  drawShorterPathOnDragOverStart,
  drawShorterPathOnDragOverTarget,
  setStartNode,
  setStartNodeFromId,
  hasNext,
  countVisited
} from "./utils.js";

var aSearchUnvisitedNodeSet = null;

function getNextNode() {
  let closestNode = null;
  let minCost = Infinity;
  for (const tmpNode of aSearchUnvisitedNodeSet) {
    if (tmpNode.aSearchCost <= minCost) {
      if (tmpNode.aSearchCost === minCost) {
        closestNode =
          tmpNode.weight < closestNode.weight ? tmpNode : closestNode;
        minCost =
          tmpNode.weight < closestNode.weight
            ? tmpNode.aSearchCost
            : closestNode.aSearchCost;
      } else {
        closestNode = tmpNode;
        minCost = tmpNode.aSearchCost;
      }
    }
  }

  aSearchUnvisitedNodeSet.delete(closestNode);

  return closestNode;
}


export async function aSearch() {
  aSearchUnvisitedNodeSet = new Set();
  let startNode = setStartNode(aSearchUnvisitedNodeSet);
  let tmpNode = null;
  let target = getTargetNode()
  let visitedNodes = 0;

  while (hasNext(aSearchUnvisitedNodeSet)) {
    if (tmpNode == null) {
      tmpNode = startNode;
      aSearchUnvisitedNodeSet.delete(startNode);
    } else {
      tmpNode = getNextNode();
    }

    tmpNode.setVisited();
    countVisited(visitedNodes++);

    await sleep(10);

    if (tmpNode.isTarget) {
      await drawShorterPath();
      return;
    }

    tmpNode.setNeighborsASearchCost(aSearchUnvisitedNodeSet, target);
  }
}

export function aSearchOnDragOverStart(newStartId) {
  aSearchUnvisitedNodeSet = new Set();
  let startNode = setStartNodeFromId(aSearchUnvisitedNodeSet, newStartId);
  let tmpNode = null;
  let target = getTargetNode();
  let visitedNodes = 0;

  while (hasNext(aSearchUnvisitedNodeSet)) {
    if (tmpNode == null) {
      tmpNode = startNode;
      aSearchUnvisitedNodeSet.delete(startNode);
    } else {
      tmpNode = getNextNode();
    }

    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++);

    if (tmpNode.isTarget) {
      drawShorterPathOnDragOverStart(newStartId);
      return;
    }

    tmpNode.setNeighborsASearchCost(aSearchUnvisitedNodeSet, target);
  }
}


export function aSearchOnDragOverTarget(newTargetId) {
  aSearchUnvisitedNodeSet = new Set();
  let startNode = setStartNode(aSearchUnvisitedNodeSet);
  let tmpNode = null;
  let target = getNode(newTargetId);
  let visitedNodes = 0;

  while (hasNext(aSearchUnvisitedNodeSet)) {
    if (tmpNode == null) {
      tmpNode = startNode;
      aSearchUnvisitedNodeSet.delete(startNode);
    } else {
      tmpNode = getNextNode();
    }
    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++);

    if (tmpNode.id === newTargetId) {
      drawShorterPathOnDragOverTarget(newTargetId);
      return;
    }

    tmpNode.setNeighborsASearchCost(aSearchUnvisitedNodeSet, target);
  }
}
