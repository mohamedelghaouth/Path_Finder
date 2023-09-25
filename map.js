 class ProjectMap {
  constructor() {
    this.map = new Map();
    this.domElement = this.initializeDomElement();
    this.isMouseDown = false;
    this.blockHeight = 25;
    this.blockWidth = 25;
    this.mapHeight = this.getMapHeight();
    this.mapWidth = this.getMapWidth();
    this.targetLine =
      this.blockHeight * Math.floor(this.mapHeight / (2 * this.blockHeight));
    this.targetColumn =
      this.blockWidth * Math.floor(this.mapWidth / (3 * this.blockWidth)) * 2;
    this.startLine =
      this.blockHeight * Math.floor(this.mapHeight / (2 * this.blockHeight));
    this.startColumn =
      this.blockWidth * Math.floor(this.mapWidth / (4 * this.blockWidth));
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

  clearMap(){
    this.domElement.innerHTML = ''
    this.map = new Map()
    this.createMap()
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
            <div id = "${line}-${column}" class="block">
              <img id="target" src="./public/circle.svg" draggable="true">
            </div>
           `;
          this.addNewNode(line, column, true, false);
        } else if (this.isStart(line, column)) {
          tmp += `
            <div id = "${line}-${column}" class="block" ">
              <img id="start" src="./public/triangletwo-right.svg" draggable="true">
            </div>
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

  initializeDomElement() {
    let domElement = document.getElementById("map");
    domElement.onmousedown = this.setMouseDown.bind(this);
    domElement.onmouseup = this.setMouseUp.bind(this);
    return domElement;
  }

  setMouseDown(e) {
    let elementId = e.target.id;
    if (elementId === "start" || elementId === "target") {
      return;
    }
    this.isMouseDown = true;
    if (elementId !== "map") {
      this.updateNodeWallState(e);
    }
  }

  setMouseUp() {
    this.isMouseDown = false;
  }

  updateNodeWallState(e) {
    if (this.isMouseDown === false) {
      return;
    }

    let block = document.getElementById(e.target.id);
    let node = this.getNode(e.target.id);

    if (node.isTarget || node.isStart) {
      return;
    } else if (node.isWall) {
        block.style.backgroundColor = "white"
    } else {
        block.style.backgroundColor = "black"
    }

    node.switchWallState();
  }

  addClickEventListener() {
    const blocks = document.querySelectorAll(".block");

    blocks.forEach((block) => {
      block.onmouseenter = this.updateNodeWallState.bind(this);
      block.ondrop = this.drop.bind(this);
      //block.allowDrop = this.allowDrop.bind(this);
      block.ondragover = this.dragover_handler.bind(this);
    });
    const start = document.getElementById("start");
    const target = document.getElementById("target");

    start.ondragstart = this.drag.bind(this);
    target.ondragstart = this.drag.bind(this);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }

  drop(ev) {
    ev.preventDefault();

    if (
      ev.target.id === "start" ||
      ev.target.id === "target" ||
      this.map.get(ev.target.id).isWall
    ) {
      return;
    } else {
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }
  }

  createTestMaze(e) {
    let middleColumn = this.blockWidth * Math.trunc(this.mapWidth / (2*this.blockWidth));
    let blocks = []

    for (let line = 0; line < this.mapHeight; line += this.blockHeight) {
      let id = `${line}-${middleColumn}`;

      let block = document.getElementById(id);
      let node = this.getNode(id);

      block.classList.add("wall");
      blocks.push(block)

      node.switchWallState();
    }
    anime({
        targets: '.wall',
        backgroundColor: '#000000',
        delay: anime.stagger(100, {easing: 'easeOutQuad'}) // increase delay by 100ms for each elements.
      })
  }
}
