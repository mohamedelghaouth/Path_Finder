export function addClickEventListener() {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach((block) => {
    block.onmouseenter = updateNodeWallState;
    block.ondrop = drop;
    block.ondragover = dragover_handler;
  });
  const start = document.getElementById("start");
  const target = document.getElementById("target");

  start.ondragstart = drag;
  target.ondragstart = drag;
}
