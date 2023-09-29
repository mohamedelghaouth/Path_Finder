class ProjectMap {
  static vOrientation = 1;
  static hOrientation = 2;
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
    let numberOfLine = Math.trunc(height / blockHeight) - 3;

    return blockHeight * numberOfLine;
  }

  getMapWidth() {
    let contWidth = document.getElementById("container").offsetWidth;

    let blockWidth = this.blockWidth;
    let numberOfColumn = Math.trunc(contWidth / blockWidth);

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

  clearMap() {
    const blocks = document.querySelectorAll(".block");

    blocks.forEach((block) => {
      let node = this.map.get(block.id);
      node.isVisited = false;
      node.removeWall();
    });
  }

  createMap() {
    let tmp;

    for (let line = 0; line <= this.mapHeight; line += this.blockHeight) {
      tmp = `
           <div class="line">
          `;
      for (let column = 0; column <= this.mapWidth; column += this.blockWidth) {
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
      block.classList.remove("wall");
      block.classList.add("empty");
    } else {
      block.classList.add("wall");
      block.classList.remove("empty");
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
      if (data === "start") {
        this.updateStartPosition(ev.target.id);
      }

      if (data === "target") {
        this.updateTargetPosition(ev.target.id);
      }

      ev.target.appendChild(document.getElementById(data));
    }
  }

  updateStartPosition(elementId) {
    let node = this.map.get(elementId);
    this.startLine = node.line;
    this.startColumn = node.column;
  }

  updateTargetPosition(elementId) {
    let node = this.map.get(elementId);
    this.targetLine = node.line;
    this.targetColumn = node.column;
  }

  createTestMaze(e) {
    let middleColumn =
      this.blockWidth * Math.trunc(this.mapWidth / (2 * this.blockWidth));
    let blocks = [];

    for (let line = 0; line < this.mapHeight; line += this.blockHeight) {
      let id = `${line}-${middleColumn}`;

      let block = document.getElementById(id);
      let node = this.getNode(id);

      block.classList.add("wall");
      blocks.push(block);

      node.switchWallState();
    }
    anime({
      targets: ".wall",
      backgroundColor: "#000000",
      delay: anime.stagger(100, { easing: "easeOutQuad" }), // increase delay by 100ms for each elements.
    });
  }

  clearFromWalls() {
    const blocks = document.querySelectorAll(".block");

    blocks.forEach((block) => {
      let node = this.map.get(block.id);
      node.isVisited = false;
      node.removeWall();
    });
  }

  visualizeMaze() {
    this.clearFromWalls();
    let selectValue = document.getElementById("maze-algo").value;

    if (selectValue === "recursive-division") {
      this.recursiveDivisionMaze();
    }
    if (selectValue === "depth-first-search") {
      this.deptFirstSearchMaze();
    }
    if (selectValue === "random-maze") {
      this.randomMaze();
    }
  }

  async makeOpenWallInLine(randomLine, minColumn, maxColumn) {
    if (maxColumn - minColumn <= 50) {
      return;
    }
    let numberOfOpening = 1;
    let arrayOfOpening = this.getRandomArrayDivisibleBy25(
      minColumn + 25,
      maxColumn - 25,
      numberOfOpening
    );

    for (
      let column = minColumn;
      column < maxColumn;
      column += this.blockWidth
    ) {
      if (!arrayOfOpening.includes(column)) {
        let id = `${randomLine}-${column}`;

        let node = this.getNode(id);
        if (!node.isStart && !node.isTarget) {
          node.setWall();
          await this.sleep(5);
        }
      }
    }
    return arrayOfOpening.pop();
  }

  async makeOpenWallInColumn(randomColumn, minLine, maxLine) {
    if (maxLine - minLine <= 50) {
      return;
    }
    let numberOfOpening = 1;
    let arrayOfOpening = this.getRandomArrayDivisibleBy25(
      minLine + 25,
      maxLine - 25,
      numberOfOpening
    );

    for (let line = minLine; line < maxLine; line += this.blockHeight) {
      if (!arrayOfOpening.includes(line)) {
        let id = `${line}-${randomColumn}`;

        let node = this.getNode(id);

        if (!node.isStart && !node.isTarget) {
          node.setWall();
          await this.sleep(5);
        }
      }
    }
    return arrayOfOpening.pop();
  }

  nodeIsAWall(line, column) {
    let id = `${line}-${column}`;

    let node = this.getNode(id);
    return node.isWall;
  }

  getRandomLine(minLine, maxLine, minColumn, maxColumn) {
    let found = false;
    let randomLine = 0;
    let count = 0;
    while (!found) {
      ++count;
      randomLine = Math.floor(
        Math.random() * (maxLine - minLine + 1) + minLine
      );
      if (
        randomLine % 25 === 0 &&
        this.nodeIsAWall(randomLine, minColumn) &&
        this.nodeIsAWall(randomLine, maxColumn)
      ) {
        found = true;
      }
    }

    return randomLine;
  }

  getRandomColumn(minLine, maxLine, minColumn, maxColumn) {
    let found = false;
    let randomColumn = 0;
    let count = 0;
    while (!found) {
      randomColumn = Math.floor(
        Math.random() * (maxColumn - minColumn + 1) + minColumn
      );
      if (
        randomColumn % 25 === 0 &&
        this.nodeIsAWall(maxLine, randomColumn) &&
        this.nodeIsAWall(minLine, randomColumn)
      ) {
        found = true;
      }
    }

    return randomColumn;
  }
  async recursiveDivision(minLine, maxLine, minColumn, maxColumn, orientation) {
    let height = maxLine - minLine;
    let width = maxColumn - minColumn;
    if (height <= this.blockHeight * 5 || width <= this.blockWidth * 5) {
      return;
    }
    if (orientation === ProjectMap.vOrientation) {
      let randomColumn = this.getRandomColumn(
        minLine,
        maxLine,
        minColumn + 50,
        maxColumn - 50
      );
      await this.makeOpenWallInColumn(randomColumn, minLine, maxLine);

      let height = maxLine - minLine;
      let width = randomColumn - minColumn;
      let tmpOrientation =
        height > width ? ProjectMap.hOrientation : ProjectMap.vOrientation;
      await this.recursiveDivision(
        minLine,
        maxLine,
        minColumn,
        randomColumn,
        tmpOrientation
      );

      height = maxLine - minLine;
      width = maxColumn - randomColumn;
      tmpOrientation =
        height > width ? ProjectMap.hOrientation : ProjectMap.vOrientation;
      await this.recursiveDivision(
        minLine,
        maxLine,
        randomColumn,
        maxColumn,
        tmpOrientation
      );
      await this.sleep(20);
    } else {
      let randomLine = this.getRandomLine(
        minLine + 50,
        maxLine - 50,
        minColumn,
        maxColumn
      );
      await this.makeOpenWallInLine(randomLine, minColumn, maxColumn);

      let height = maxLine - randomLine;
      let width = maxColumn - minColumn;
      let tmpOrientation =
        height > width ? ProjectMap.hOrientation : ProjectMap.vOrientation;
      await this.recursiveDivision(
        randomLine,
        maxLine,
        minColumn,
        maxColumn,
        tmpOrientation
      );
      await this.sleep(20);

      height = randomLine - minLine;
      width = maxColumn - minColumn;
      tmpOrientation =
        height > width ? ProjectMap.hOrientation : ProjectMap.vOrientation;
      await this.recursiveDivision(
        minLine,
        randomLine,
        minColumn,
        maxColumn,
        tmpOrientation
      );
      await this.sleep(5);
    }
  }

  async setLineToWalls(line) {
    for (let column = 0; column <= this.mapWidth; column += this.blockWidth) {
      let id = `${line}-${column}`;

      let node = this.getNode(id);
      if (!node.isStart && !node.isTarget) {
        node.setWall();
        await this.sleep(5);
      }
    }
  }
  async setLineToWallsFromRightToLeft(line) {
    for (let column = this.mapWidth; column >= 0; column -= this.blockWidth) {
      let id = `${line}-${column}`;

      let node = this.getNode(id);
      if (!node.isStart && !node.isTarget) {
        node.setWall();
        await this.sleep(20);
      }
    }
  }

  async setColumnsToWalls(column) {
    for (let line = 0; line <= this.mapHeight; line += this.blockHeight) {
      let id = `${line}-${column}`;

      let node = this.getNode(id);

      if (!node.isStart && !node.isTarget) {
        node.setWall();
        await this.sleep(5);
      }
    }
  }
  async setColumnsToWallsFromBottomUp(column) {
    for (let line = this.mapHeight; line >= 0; line -= this.blockHeight) {
      let id = `${line}-${column}`;

      let node = this.getNode(id);

      if (!node.isStart && !node.isTarget) {
        node.setWall();
        await this.sleep(5);
      }
    }
  }

  async setBordersToWalls() {
    await this.setLineToWalls(0);
    await this.setColumnsToWalls(this.mapWidth);
    await this.setLineToWallsFromRightToLeft(this.mapHeight);
    await this.setColumnsToWallsFromBottomUp(0);
  }

  async recursiveDivisionMaze() {
    await this.setBordersToWalls();
    this.recursiveDivision(
      0,
      this.mapHeight,
      0,
      this.mapWidth,
      ProjectMap.vOrientation
    );
  }

  getRandomNode() {
    function getRandomKeyFromMap(map) {
      // Convert the keys to an array
      const keysArray = Array.from(map.keys());

      // Generate a random index
      const randomIndex = Math.floor(Math.random() * keysArray.length);

      // Retrieve and return the random key
      const randomKey = keysArray[randomIndex];

      return randomKey;
    }

    return this.map.get(getRandomKeyFromMap(this.map));
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async deptFirstSearchMaze() {
    function initializeGridToWalls(map) {
      const blocks = document.querySelectorAll(".block");

      blocks.forEach((block) => {
        let node = map.get(block.id);
        node.isVisited = false;
        if (!node.isTarget && !node.isStart) {
          node.isWall = true;
          block.classList.add("wall");
        }
      });
    }

    initializeGridToWalls(this.map);

    let startCell = this.getRandomNode();
    let stack = [startCell];
    startCell.isVisited = true;

    while (stack.length !== 0) {
      let currentCell = stack.pop();
      currentCell.makeCurrentInMazeGeneration();
      let randomDirection = Node.getDirection();

      randomDirection.forEach((direction) => {
        switch (direction) {
          case Node.topKey:
            if (
              currentCell.thereIsSpaceInTopDirection() &&
              currentCell.secondElementInThisDirectionIsWall(
                direction,
                this.map
              )
            ) {
              let nextCell =
                currentCell.setTwoNextNeighborInThisDirectionToEmpty(
                  direction,
                  this.map
                );
              stack.push(nextCell);
            }

            break;
          case Node.leftKey:
            if (
              currentCell.thereIsSpaceInLeftDirection() &&
              currentCell.secondElementInThisDirectionIsWall(
                direction,
                this.map
              )
            ) {
              let nextCell =
                currentCell.setTwoNextNeighborInThisDirectionToEmpty(
                  direction,
                  this.map
                );
              stack.push(nextCell);
            }

            break;
          case Node.rightKey:
            if (
              currentCell.thereIsSpaceInRightDirection(this.mapWidth) &&
              currentCell.secondElementInThisDirectionIsWall(
                direction,
                this.map
              )
            ) {
              let nextCell =
                currentCell.setTwoNextNeighborInThisDirectionToEmpty(
                  direction,
                  this.map
                );
              stack.push(nextCell);
            }

            break;
          case Node.bottomKey:
            if (
              currentCell.thereIsSpaceInBottomDirection(this.mapHeight) &&
              currentCell.secondElementInThisDirectionIsWall(
                direction,
                this.map
              )
            ) {
              let nextCell =
                currentCell.setTwoNextNeighborInThisDirectionToEmpty(
                  direction,
                  this.map
                );
              stack.push(nextCell);
            }
            break;
        }
      });
      await this.sleep(20);
      currentCell.removeCurrentInMazeGeneration();
    }
  }

  getRandomArrayDivisibleBy25(min, max, count) {
    const result = [];
    while (result.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      if (randomNumber % 25 === 0) {
        result.push(randomNumber);
      }
    }

    return result;
  }

  getRandomDivisibleBy25DifferentThen(min, max, toDiffer) {
    let found = false;
    let randomNumber = 0;
    while (!found) {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      if (randomNumber !== toDiffer && randomNumber % 25 === 0) {
        found = true;
      }
    }
    return randomNumber;
  }

  getRandomDivisibleBy25(min, max) {
    let found = false;
    let randomNumber = 0;
    while (!found) {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      if (randomNumber % 25 === 0) {
        found = true;
      }
    }
    return randomNumber;
  }

  getRandomNumber(min, max) {
    let found = false;
    let randomNumber = 0;
    while (!found) {
      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      if (randomNumber !== 0) {
        found = true;
      }
    }

    return randomNumber;
  }

  randomMaze() {
    let randomLines = this.getRandomArrayDivisibleBy25(0, this.mapHeight, 40);

    randomLines.forEach((line) => {
      let randomColumn = this.getRandomArrayDivisibleBy25(0, this.mapWidth, 10);
      randomColumn.forEach((col) => {
        let node = this.map.get(`${line}-${col}`);
        if (!node.isStart && !node.isTarget) {
          node.setWall();
        }
      });
    });
  }
}
