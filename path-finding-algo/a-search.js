var aSearchUnvisitedNodeSet = null;

function setStartNode() {
  let startNode = getStartNode();
  aSearchUnvisitedNodeSet.add(startNode);
  return startNode;
}

function setStartNodeFromId(id) {
  let startNode = getNode(id);
  aSearchUnvisitedNodeSet.add(startNode);
  return startNode;
}

function getNextNode() {

  let closestNode = null;
  let minCost = Infinity;
  for (const tmpNode of aSearchUnvisitedNodeSet) {
    if (!tmpNode.isVisited && tmpNode.aSearchCost <= minCost) {
      closestNode = tmpNode;
      minCost = tmpNode.aSearchCost;
    }
  }

  aSearchUnvisitedNodeSet.delete(closestNode);

  return closestNode;
}

function hasNext() {
  for (const tmpNode of aSearchUnvisitedNodeSet) {
    if (!tmpNode.isVisited) {
      return true;
    }
  }

  return false;
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

export async function aSearch() {
  aSearchUnvisitedNodeSet = new Set();
  let startNode = setStartNode();
  let tmpNode = null;

  while (hasNext()) {
    if (tmpNode == null) {
      tmpNode = startNode;
      aSearchUnvisitedNodeSet.delete(startNode);
    } else {
      tmpNode = getNextNode();
    }

    tmpNode.setVisited();

    await sleep(10);

    if (tmpNode.isTarget) {
      await drawShorterPath();
      return;
    }

    tmpNode.setNeighborsASearchCost(aSearchUnvisitedNodeSet, getTargetNode());
  }
}

function drawShorterPathOnDragOverStart(newStartId) {
  let currNode = getTargetNode();
  let count = 1;

  while (currNode && currNode.id !== newStartId) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.parent;
    count++;
  }

  currNode && currNode.setToPartOfTheShortPath();
}

export function aSearchOnDragOverStart(newStartId) {
  aSearchUnvisitedNodeSet = new Set();
  let startNode = setStartNodeFromId(newStartId);
  let tmpNode = null;
  let target = getTargetNode();


  while (hasNext()) {
    if (tmpNode == null) {
      tmpNode = startNode;
      aSearchUnvisitedNodeSet.delete(startNode);
    } else {
      tmpNode = getNextNode();
    }

    tmpNode.setVisitedWithoutAnimation();

    if (tmpNode.isTarget) {
      drawShorterPathOnDragOverStart(newStartId);
      return;
    }

    tmpNode.setNeighborsASearchCost(aSearchUnvisitedNodeSet, target);
  }
}

function drawShorterPathOnDragOverTarget(newTargetId) {
  let currNode = getNode(newTargetId);

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

export function aSearchOnDragOverTarget(newTargetId) {
  aSearchUnvisitedNodeSet = new Set();
  let startNode = setStartNode();
  let tmpNode = null;
  let target = getNode(newTargetId);

  while (hasNext()) {
    if (tmpNode == null) {
      tmpNode = startNode;
      aSearchUnvisitedNodeSet.delete(startNode);
    } else {
      tmpNode = getNextNode();
    }
    tmpNode.setVisitedWithoutAnimation();

    if (tmpNode.id === newTargetId) {
      drawShorterPathOnDragOverTarget(newTargetId);
      return;
    }

    tmpNode.setNeighborsASearchCost(aSearchUnvisitedNodeSet, target);
  }
}
