import {
  drawShorterPath,
  drawShorterPathOnDragOverStart,
  drawShorterPathOnDragOverTarget,
  countVisited
} from "./utils.js";

import { LinkedList } from "./linkedList.js";

var breadthFirstSearchUnvisitedNodes = null;

function getNextNode() {
  let next = breadthFirstSearchUnvisitedNodes.pullFromFront();
  while (next.isVisited) {
    next = breadthFirstSearchUnvisitedNodes.pullFromFront();
  }
  return next;
}

export async function breadthFirstSearch() {
  breadthFirstSearchUnvisitedNodes = new LinkedList();
  breadthFirstSearchUnvisitedNodes.pushToTheBack(getStartNode());

  let tmpNode = null;
  let visitedNodes = 0

  while (hasNext()) {
    tmpNode = getNextNode();

    tmpNode.setVisited();
    countVisited(visitedNodes++)
    await sleep(10);

    if (tmpNode.isTarget) {
      await drawShorterPath();
      return;
    }

    tmpNode.setNeighborsBreadthFirstSearch(breadthFirstSearchUnvisitedNodes);
  }
}

export function breadthFirstSearchOnDragOverStart(newStartId) {
  breadthFirstSearchUnvisitedNodes = new LinkedList();
  breadthFirstSearchUnvisitedNodes.pushToTheBack(getNode(id));

  let tmpNode = null;
  let visitedNodes = 0

  while (hasNext()) {
    tmpNode = getNextNode();

    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++)
    if (tmpNode.isTarget) {
      drawShorterPathOnDragOverStart(newStartId);
      return;
    }

    tmpNode.setNeighborsBreadthFirstSearch(breadthFirstSearchUnvisitedNodes);
  }
}

export function breadthFirstSearchOnDragOverTarget(newTargetId) {
  breadthFirstSearchUnvisitedNodes = new LinkedList();
  breadthFirstSearchUnvisitedNodes.pushToTheBack(getStartNode());

  let tmpNode = null;
  let visitedNodes = 0

  while (hasNext()) {
    tmpNode = getNextNode();

    tmpNode.setVisitedWithoutAnimation();
    countVisited(visitedNodes++)
    if (tmpNode.id === newTargetId) {
      drawShorterPathOnDragOverTarget(newTargetId);
      return;
    }

    tmpNode.setNeighborsBreadthFirstSearch(breadthFirstSearchUnvisitedNodes);
  }
}

function hasNext() {
  return breadthFirstSearchUnvisitedNodes.size > 0;
}
