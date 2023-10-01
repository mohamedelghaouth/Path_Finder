
function initializeDomElement() {
  let domElement = document.getElementById("map");
  domElement.onmousedown = setMouseDown;
  domElement.onmouseup = setMouseUp;
  return domElement;
}

function setMouseDown(e) {
  let elementId = e.target.id;
  if (elementId === "start" || elementId === "target") {
    return;
  }
  isMouseDown = true;
  if (elementId !== "map") {
    updateNodeWallState(e);
  }
}

function setMouseUp() {
  isMouseDown = false;
}

function updateNodeWallState(e) {
  if (isMouseDown === false) {
    return;
  }

  let block = document.getElementById(e.target.id);
  let node = getNode(e.target.id);

  if (node.isTarget || node.isStart) {
    return;
  } else if (node.isWall) {
    block.classList.remove("wall");
    block.classList.add("empty");
  } else {
    block.classList.add("wall");
    block.classList.remove("empty");
  }

  node.switchWallState();
}
