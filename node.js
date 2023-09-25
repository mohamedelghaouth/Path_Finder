class Node {
  static topLeftKey = 1;
  static topKey = 2;
  static topRightKey = 3;
  static leftKey = 4;
  static rightKey = 5;
  static bottomLeftKey = 6;
  static bottomKey = 7;
  static bottomRightKey = 8;

  constructor(line, column, isTarget, isStart, blockHeight, blockWidth, mapHeight, mapWidth) {
    this.line = line;
    this.column = column;
    this.id = line + "-" + column;
    this.isVisited = false;
    this.isWall = false;
    this.isTarget = isTarget;
    this.isStart = isStart;
    this.isPArtOfTheShortPath = false;
    this.setNeighbors(blockHeight, blockWidth, mapHeight, mapWidth);
  }

  switchWallState() {
    this.isWall = !this.isWall;
  }
  setNeighbors(blockHeight, blockWidth, mapHeight, mapWidth) {
    let hasTop = this.line - blockHeight >= 0;

    let hasBottom = this.line + blockWidth <= mapHeight;

    let hasLeft = this.column + blockWidth <= mapWidth;

    let hasRight = this.column - blockWidth >= 0;

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
        `${this.line}-${this.column - blockWidth}`
      );
    }
    if (hasLeft) {
      this.neighbors.set(
        Node.leftKey,
        `${this.line}-${this.column + blockWidth}`
      );
    }
    if (hasBottom) {
      this.neighbors.set(
        Node.leftKey,
        `${this.line + blockWidth}-${this.column}`
      );
    }

    if (hasTop && hasRight) {
      this.neighbors.set(
        Node.topRightKey,
        `${this.line - blockHeight}-${this.column - blockWidth}`
      );
    }

    if (hasTop && hasLeft) {
      this.neighbors.set(
        Node.topLeftKey,
        `${this.line - blockHeight}-${this.column + blockWidth}`
      );
    }

    if (hasBottom && hasRight) {
      this.neighbors.set(
        Node.bottomRightKey,
        `${this.line + blockWidth}-${this.column - blockWidth}`
      );
    }

    if (hasBottom && hasLeft) {
      this.neighbors.set(
        Node.bottomLeftKey,
        `${this.line + blockWidth}-${this.column + blockWidth}`
      );
    }
}
}

