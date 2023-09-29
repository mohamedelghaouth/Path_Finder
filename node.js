class Node {
  static topKey = 1;
  static leftKey = 2;
  static rightKey = 3;
  static bottomKey = 4;

  constructor(
    line,
    column,
    isTarget,
    isStart,
    blockHeight,
    blockWidth,
    mapHeight,
    mapWidth
  ) {
    this.line = line;
    this.column = column;
    this.id = line + "-" + column;
    this.isVisited = false;
    this.isWall = false;
    this.isTarget = isTarget;
    this.isStart = isStart;
    this.isPartOfTheShortPath = false;
    this.blockHeight = blockHeight;
    this.blockWidth = blockWidth;
    this.setNeighbors(blockHeight, blockWidth, mapHeight, mapWidth);
  }

  switchWallState() {
    this.isWall = !this.isWall;
  }

  setNeighbors(blockHeight, blockWidth, mapHeight, mapWidth) {
    let hasTop = this.line - blockHeight >= 0;

    let hasBottom = this.line + blockWidth <= mapHeight;

    let hasRight = this.column + blockWidth <= mapWidth;

    let hasLeft = this.column - blockWidth >= 0;

    this.neighbors = new Map();

    if (hasTop) {
      this.neighbors.set(
        Node.topKey,
        `${this.line - blockHeight}-${this.column}`
      );
    }
    if (hasRight) {
      this.neighbors.set(
        Node.rightKey,
        `${this.line}-${this.column + blockWidth}`
      );
    }
    if (hasLeft) {
      this.neighbors.set(
        Node.leftKey,
        `${this.line}-${this.column - blockWidth}`
      );
    }
    if (hasBottom) {
      this.neighbors.set(
        Node.bottomKey,
        `${this.line + blockWidth}-${this.column}`
      );
    }
  }

  getUnvisitedNeighbors(map) {
    let unvisitedNeighbors = [];
    const neighbors = [...this.neighbors.values()];

    neighbors.forEach((neighborId) => {
      let node = map.get(neighborId);
      if (!node.isVisited) {
        unvisitedNeighbors.push(node);
      }
    });

    return unvisitedNeighbors;
  }

  makeCurrentInMazeGeneration() {
    let block = document.getElementById(this.id);
    block.classList.add("current");
  }

  removeCurrentInMazeGeneration() {
    let block = document.getElementById(this.id);
    block.classList.remove("current");
  }

  removeWall() {
    this.isWall = false;
    let block = document.getElementById(this.id);
    block.classList.remove("wall");
    block.classList.add("empty");
  }

  setWall() {
    this.isWall = true;
    let block = document.getElementById(this.id);
    block.classList.add("wall");
    block.classList.remove("empty");
  }

  thereIsSpaceInTopDirection() {
    return this.line - this.blockHeight * 2 >= 0;
  }
  thereIsSpaceInLeftDirection() {
    return this.column - this.blockWidth * 2 >=0;
  }
  thereIsSpaceInRightDirection(mapWidth) {
    return this.column + this.blockWidth * 2 <= mapWidth;
  }
  thereIsSpaceInBottomDirection(mapHeight) {
    return this.line + this.blockHeight * 2 <= mapHeight;
  }

  secondElementInThisDirectionIsWall(direction, map) {
    let neighborInThisDirectionId = this.neighbors.get(direction);

    let neighborInThisDirection = map.get(neighborInThisDirectionId);


    let neighborNeighborInThisDirectionId =
      neighborInThisDirection.neighbors.get(direction);

    let secondNeighborInThisDirection = map.get(
      neighborNeighborInThisDirectionId
    );
   

    return (
      neighborInThisDirection.isWall && secondNeighborInThisDirection.isWall
    );
  }

  setTwoNextNeighborInThisDirectionToEmpty(direction, map) {
    let neighborInThisDirectionId = this.neighbors.get(direction);
    let neighborInThisDirection = map.get(neighborInThisDirectionId);
    neighborInThisDirection.removeWall();

    let neighborNeighborInThisDirectionId =
      neighborInThisDirection.neighbors.get(direction);
    let secondNeighborInThisDirection = map.get(
      neighborNeighborInThisDirectionId
    );

    secondNeighborInThisDirection.removeWall();

    return secondNeighborInThisDirection;
  }

  static getDirection() {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    return shuffleArray([
      Node.topKey,
      Node.leftKey,
      Node.rightKey,
      Node.bottomKey,
    ]);
  }
}
