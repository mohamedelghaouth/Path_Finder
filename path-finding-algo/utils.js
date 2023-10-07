export function drawShorterPathOnDragOverStart(newStartId) {
  let currNode = getTargetNode();
  let shortPathNodesNumber = 1

  while (currNode && currNode.id !== newStartId) {
    currNode.setToPartOfTheShortPath();
    countShortPath(shortPathNodesNumber++)
    currNode = currNode.parent;
  }

  currNode && currNode.setToPartOfTheShortPath();
}

export function drawShorterPathOnDragOverTarget(newTargetId) {
  let currNode = getNode(newTargetId);
  let shortPathNodesNumber = 1

  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    countShortPath(shortPathNodesNumber++)
    currNode = currNode.parent;
  }
  currNode.setToPartOfTheShortPath();
}

export async function drawShorterPath() {
  let currNode = getTargetNode();
  let shortPathNodesNumber = 1


  while (!currNode.isStart) {
    currNode.setToPartOfTheShortPath();
    countShortPath(shortPathNodesNumber++)
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


export function countVisited(visitedNodes){
  //let visitedNodes = document.querySelectorAll(".visited, .visited-non-animation").length
  document.getElementById("visited-node-number").innerHTML = visitedNodes;

}

export function countShortPath(shortPathNodes){
  //let shortPathNodes = document.querySelectorAll(".short-path-node").length
  document.getElementById("short-path-node-number").innerHTML = shortPathNodes;

}