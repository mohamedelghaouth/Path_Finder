import {
  drawShorterPath,
  drawShorterPathOnDragOverStart,
  drawShorterPathOnDragOverTarget,
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

  while (hasNext()) {
    tmpNode = getNextNode();

    tmpNode.setVisited();

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

  while (hasNext()) {
    tmpNode = getNextNode();

    tmpNode.setVisitedWithoutAnimation();

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

  while (hasNext()) {
    tmpNode = getNextNode();

    tmpNode.setVisitedWithoutAnimation();

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
