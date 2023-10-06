export function drawShorterPathOnDragOverStart(newStartId) {
  let currNode = getTargetNode();
  let count = 1;

  while (currNode && currNode.id !== newStartId) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.parent;
    count++;
  }

  currNode && currNode.setToPartOfTheShortPath();
}

export function drawShorterPathOnDragOverTarget(newTargetId) {
  let currNode = getNode(newTargetId);

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

export async function drawShorterPath() {
  let currNode = getTargetNode();

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    await sleep(10);
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

export function setStartNode(unvisitedNode) {
  let startNode = getStartNode();
  unvisitedNode.add(startNode);
  return startNode;
}

export function setStartNodeFromId(unvisitedNode, id) {
  let startNode = getNode(id);
  unvisitedNode.add(startNode);
  return startNode;
}

export function hasNext(unvisitedNode) {
  for (const tmpNode of unvisitedNode) {
    if (!tmpNode.isVisited) {
      return true;
    }
  }

  return false;
}
