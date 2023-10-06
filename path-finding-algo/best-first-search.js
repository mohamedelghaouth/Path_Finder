var bestFirstSearchUnvisitedNodeSet = null;

function setStartNode() {
  let startNode = getStartNode();
  bestFirstSearchUnvisitedNodeSet.add(startNode);
  return startNode;
}

function setStartNodeFromId(id) {
  let startNode = getNode(id);
  bestFirstSearchUnvisitedNodeSet.add(startNode);
  return startNode;
}

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

function hasNext() {
  for (const tmpNode of bestFirstSearchUnvisitedNodeSet) {
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

export async function bestFirstSearch() {
  bestFirstSearchUnvisitedNodeSet = new Set();
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

    tmpNode.setNeighborsBestFirstSearch(
      bestFirstSearchUnvisitedNodeSet,
      getTargetNode()
    );
  }
}
