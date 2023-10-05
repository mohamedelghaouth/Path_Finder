import { Heap } from "./heap.js";

var dijkstraUnvisitedNodeMinHeap = null;

function setStartNode() {
  let startNode = getStartNode();
  dijkstraUnvisitedNodeMinHeap.add(startNode);
}

function setStartNodeFromId(id) {
  let dijkstraUnvisitedNodeMinHeap = getNode(id);
  dijkstraUnvisitedNodeSet.add(startNode);
}

/***
 * get the closest unvisited node
 */
function getNextNode() {
  return dijkstraUnvisitedNodeMinHeap.getRoot();
}

async function drawShorterPath() {
  let currNode = getTargetNode();

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    await sleep(10);
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

function drawShorterPathOnDragOverStart(newStartId) {
  let currNode = getTargetNode();

  while (currNode.id !== newStartId) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

function drawShorterPathOnDragOverTarget(newTargetId) {
  let currNode = getNode(newTargetId);

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

export async function dijkstra() {
  dijkstraUnvisitedNodeMinHeap = new Heap("weight");
  setStartNode();
  let tmpNode = null;

  while (dijkstraUnvisitedNodeMinHeap.hasNext()) {
    tmpNode = getNextNode();
    tmpNode.setVisited();

    await sleep(10);

    if (tmpNode.isTarget) {
      await drawShorterPath();
      return;
    }

    tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeMinHeap);
  }
}

export function dijkstraOnDragOverStart(newStartId) {
  dijkstraUnvisitedNodeMinHeap = new Heap("weight");
  setStartNodeFromId(newStartId);
  let tmpNode = null;

  while (hasNext()) {
    tmpNode = getNextNode();
    tmpNode.setVisitedWithoutAnimation();

    if (tmpNode.isTarget) {
      drawShorterPathOnDragOverStart(newStartId);
      return;
    }

    tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeMinHeap);
  }
}

export function dijkstraOnDragOverTarget(newTargetId) {
  dijkstraUnvisitedNodeMinHeap = new Heap("weight");
  setStartNode();
  let tmpNode = null;

  while (hasNext()) {
    tmpNode = getNextNode();
    tmpNode.setVisitedWithoutAnimation();

    if (tmpNode.id === newTargetId) {
      drawShorterPathOnDragOverTarget(newTargetId);
      return;
    }

    tmpNode.setNeighborsDijkstraWeight(dijkstraUnvisitedNodeMinHeap);
  }
}
