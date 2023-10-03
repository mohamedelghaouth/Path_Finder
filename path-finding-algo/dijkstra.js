var dijkstraUnvisitedNodeSet = null;

function setStartNode() {
  let startNode = getStartNode();
  dijkstraUnvisitedNodeSet.add(startNode);
}

function setStartNodeFromId(id) {
    let startNode = getNode(id);
    dijkstraUnvisitedNodeSet.add(startNode);
  }

/***
 * get the closest unvisited node
 */
function getNextNode() {
  let closestNode = null;
  let minWeight = Infinity;
  for (const tmpNode of dijkstraUnvisitedNodeSet) {
    if (!tmpNode.isVisited && tmpNode.dijkstraWeight <= minWeight) {
      closestNode = tmpNode;
      minWeight = tmpNode.dijkstraWeight;
    }
  }

  dijkstraUnvisitedNodeSet.delete(closestNode);

  return closestNode;
}

function hasNext() {
  for (const tmpNode of dijkstraUnvisitedNodeSet) {
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
    currNode = currNode.dijkstraParent;
  }
  currNode.setToPartOfTheShortPath();
}

function drawShorterPathOnDragOverStart(newStartId) {
  let currNode = getTargetNode();

  while (currNode.id !== newStartId) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.dijkstraParent;
  }
  currNode.setToPartOfTheShortPath();
}

function drawShorterPathOnDragOverTarget(newTargetId) {
  let currNode = getNode(newTargetId);

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.dijkstraParent;
  }
  currNode.setToPartOfTheShortPath();
}

export async function dijkstra() {
  dijkstraUnvisitedNodeSet = new Set();
  setStartNode();
  let tmpNode = null;

  while (hasNext()) {
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
  setStartNodeFromId(newStartId);
  let tmpNode = null;

  while (hasNext()) {
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