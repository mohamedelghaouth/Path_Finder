import { Node } from "./node.js";

export class ProjectMap {
  constructor() {
    this.map = new Map();
    this.domElement = this.initializeDomElement();
    this.isMouseDown = false;
    this.blockHeight = 25;
    this.blockWidth = 25;
    this.mapHeight = this.getMapHeight();
    this.mapWidth = this.getMapWidth();
    this.targetLine = this.blockHeight * 13;
    this.targetColumn = this.blockWidth * 55;
    this.startLine = this.blockHeight * 13;
    this.startColumn = this.blockWidth * 15;
  }

  getMapHeight() {
    let navHeight = document.getElementById("nav").offsetHeight;
    let optionsHeight = document.getElementById("options").offsetHeight;
    let titleHeight = document.getElementById("title").offsetHeight;
    let contHeight = document.getElementById("container").offsetHeight;

    let blockHeight = this.blockHeight;
    let height = contHeight - navHeight - optionsHeight - titleHeight;
    let numberOfLine = height / blockHeight - 3;

    return blockHeight * numberOfLine;
  }

  getMapWidth() {
    let contWidth = document.getElementById("container").offsetWidth;

    let blockWidth = this.blockWidth;
    let numberOfColumn = contWidth / blockWidth;

    return blockWidth * numberOfColumn;
  }

  initializeDomElement() {
    let domElement = document.getElementById("map");
    domElement.onmousedown = this.setMouseDown.bind(this);
    domElement.onmouseup = this.setMouseUp.bind(this);
    return domElement;
  }

  setMouseDown(e) {
    this.isMouseDown = true;
    if (e.target.id !== "map") {
      this.updateNodeWallState(e);
    }
  }

  setMouseUp() {
    this.isMouseDown = false;
  }

  addClickEventListener() {
    const blocks = document.querySelectorAll(".block");

    blocks.forEach((block) => {
      block.onmouseenter = this.updateNodeWallState.bind(this);
    });
  }

  updateNodeWallState(e) {
    if (this.isMouseDown === false) {
      return;
    }

    let block = document.getElementById(e.target.id);
    let node = this.getNode(e.target.id);
    console.log("🚀 ~ file: map.js:73 ~ ProjectMap ~ updateNodeWallState ~ node:", node)

    if (node.isTarget || node.isStart) {
        return;
    }else if (node.isWall) {
      block.style.backgroundColor = "white";
    } else {
      block.style.backgroundColor = "black";
    }

    node.switchWallState();
  }

  /**
   *
   * @param {string} id
   * @param {Node} node
   */
  addNode(id, node) {
    this.map.set(id, node);
  }

  /**
   *
   * @param {string} line
   * @param {string} column
   */
  addNewNode(line, column, isTarget, isStart) {
    let node = new Node(
      line,
      column,
      isTarget,
      isStart,
      this.blockHeight,
      this.blockWidth,
      this.mapHeight,
      this.mapWidth
    );
    this.map.set(node.id, node);
  }

  /**
   *
   * @param {string} id
   * @returns {Node}
   */
  getNode(id) {
    return this.map.get(id);
  }

  isTarget(line, column) {
    return line === this.targetLine && column === this.targetColumn;
  }

  isStart(line, column) {
    return line === this.startLine && column === this.startColumn;
  }

  createMap() {
    let tmp;

    for (let line = 0; line < this.mapHeight; line += this.blockHeight) {
      tmp = `
           <div class="line">
          `;
      for (let column = 0; column < this.mapWidth; column += this.blockWidth) {
        if (this.isTarget(line, column)) {
          tmp += `
            <div id = "${line}-${column}" class="block target"></div>
           `;
           this.addNewNode(line, column, true, false);

        } else if (this.isStart(line, column)) {
          tmp += `
            <div id = "${line}-${column}" class="block start"></div>
           `;
           this.addNewNode(line, column, false, true);

        } else {
          tmp += `
                 <div id = "${line}-${column}" class="block"></div>
                `;
                this.addNewNode(line, column, false, false);
        }
      }
      tmp += `</div>`;
      this.domElement.innerHTML += tmp;
    }

    this.addClickEventListener();
  }
}
