import { drag, dragover_handler, drop, dragend_handler } from "./dragDropHelper.js";

export function addClickEventListener() {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach((block) => {
    block.onmouseenter = updateNodeWallState;
    block.ondrop = drop;
    block.ondragover = dragover_handler;
  });

  const start = document.getElementById("start");
  start.ondragstart = drag;
  start.ondragend = dragend_handler;
  
  const target = document.getElementById("target");
  target.ondragstart = drag;
  target.ondragend = dragend_handler;
}  


