import { addClickEventListener } from "./eventHelper.js";

export function clearMap() {
  const blocks = document.querySelectorAll(".block");
  visualizingPathFinding = false;

  blocks.forEach((block) => {
    let node = map.get(block.id);
    node.init();
  });
}

export function createMap() {
  let tmp;

  for (let line = 0; line <= mapHeight; line += blockHeight) {
    tmp = `
           <div class="line">
          `;
    for (let column = 0; column <= mapWidth; column += blockWidth) {
      if (isTarget(line, column)) {
        tmp += `
            <div id = "${line}-${column}" class="block">
              <img id="target" src="./public/circle.svg" draggable="true">
            </div>
           `;
        addNewNode(line, column, true, false);
      } else if (isStart(line, column)) {
        tmp += `
            <div id = "${line}-${column}" class="block" ">
              <img id="start" src="./public/triangletwo-right.svg" draggable="true">
            </div>
           `;
        addNewNode(line, column, false, true);
      } else {
        tmp += `
                 <div id = "${line}-${column}" class="block"></div>
                `;
        addNewNode(line, column, false, false);
      }
    }
    tmp += `</div>`;
    domElement.innerHTML += tmp;
  }

  addClickEventListener();
}

export function clearFromWalls() {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach((block) => {
    let node = getNode(block.id);
    node.isVisited = false;
    node.removeWall();
  });
}
