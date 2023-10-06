import {
  visualizePathFindingOnDragOver,
  visualizePathFindingOnDragEnd,
} from "./path-finding-algo/index.js";

var dragged = null;
var dropHandled = false;

export function allowDrop(ev) {
  ev.preventDefault();
}

export function drag(ev) {
  ev.dataTransfer.effectAllowed = "move";
  dropHandled = false;
  dragged = ev.target.id;

  ev.dataTransfer.setData("text", ev.target.id);
}

export function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
  let elementId = ev.target.id;
  if (
    elementId === "start" ||
    elementId === "target" ||
    map.get(elementId).isWall
  ) {
    return;
  }
  if (visualizingPathFinding) {
    visualizePathFindingOnDragOver(dragged, elementId);
  }
}

export function dragend_handler(ev) {
  if (dropHandled) {
    return;
  }
  if (visualizingPathFinding && ev.dataTransfer.dropEffect === "none") {
    visualizePathFindingOnDragEnd(dragged);
  }
}

export function drop(ev) {
  dropHandled = true;
  ev.preventDefault();
  let element = ev.target;
  let elementId = element.id;

  if (
    elementId === "start" ||
    elementId === "target" ||
    map.get(elementId).isWall
  ) {
    if (visualizingPathFinding) {
      visualizePathFindingOnDragEnd(dragged);
    }
    visualizePathFindingOnDragEnd(dragged);
    return;
  } else {
    var data = ev.dataTransfer.getData("text");
    if (data === "start") {
      updateStartPosition(elementId);
    }

    if (data === "target") {
      updateTargetPosition(elementId);
    }

    element.appendChild(document.getElementById(data));
  }
  dragged = null;
}

function updateStartPosition(elementId) {
  let prevStartNode = getStartNode();
  prevStartNode.isStart = false;

  let node = map.get(elementId);
  node.isStart = true;
  startLine = node.line;
  startColumn = node.column;
}

function updateTargetPosition(elementId) {
  let prevTargetNode = getTargetNode();
  prevTargetNode.isTarget = false;

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
