function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (ev.target.id === "start") {
    removeStartPosition();
  }

  if (ev.target.id === "target") {
    removeTargetPosition();
  }
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop(ev) {
  ev.preventDefault();

  if (
    ev.target.id === "start" ||
    ev.target.id === "target" ||
    map.get(ev.target.id).isWall
  ) {
    return;
  } else {
    var data = ev.dataTransfer.getData("text");
    if (data === "start") {
      updateStartPosition(ev.target.id);
    }

    if (data === "target") {
      updateTargetPosition(ev.target.id);
    }

    ev.target.appendChild(document.getElementById(data));
  }
}

function updateStartPosition(elementId) {
  let node = map.get(elementId);
  node.isStart = true;
  startLine = node.line;
  startColumn = node.column;
}

function updateTargetPosition(elementId) {
  let node = map.get(elementId);
  node.isTarget = true;
  targetLine = node.line;
  targetColumn = node.column;
}

function removeStartPosition() {
  let node = getNodeByLineAndColumn(startLine, startColumn);
  node.isStart = false;
}

function removeTargetPosition() {
  let node = getNodeByLineAndColumn(targetLine, targetColumn);
  node.isTarget = false;
}
