class Node {
  static topKey = 1;
  static leftKey = 2;
  static rightKey = 3;
  static bottomKey = 4;
  static WEIGHT = 20;

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
    this.block = document.getElementById(this.id);
    this.isVisited = false;
    this.isWall = false;
    this.isTarget = isTarget;
    this.isStart = isStart;
    this.isPartOfTheShortPath = false;
    this.treated = false;
    this.blockHeight = blockHeight;
    this.blockWidth = blockWidth;
    this.setNeighbors(blockHeight, blockWidth, mapHeight, mapWidth);

    this.weight = Infinity;
    this.parent = null;

    this.distanceFromTarget = Infinity;
    this.aSearchCost = Infinity;
  }

  switchWallState() {
    this.isWall = !this.isWall;
  }
  getBlock() {
    if (this.block === null) {
      this.block = document.getElementById(this.id);
    }
    return this.block;
  }

  init() {
    this.isVisited = false;
    this.isWall = false;
    this.weight = Infinity;
    this.parent = null;

    this.treated = false;
    this.isPartOfTheShortPath = false;

    this.distanceFromTarget = Infinity;
    this.aSearchCost = Infinity;

    let block = this.getBlock();
    block.classList.add("empty");
    block.classList.remove("short-path-node");
    block.classList.remove("visited");
    block.classList.remove("visited-non-animation");
    block.classList.remove("wall");
    block.classList.remove("treated");
    if (!this.isStart && !this.isTarget) {
      block.innerHTML = "";
    }
  }

  initForPathFinding() {
    this.isVisited = false;
    this.isPartOfTheShortPath = false;
    this.treated = false;
    this.weight = Infinity;
    this.parent = null;

    this.distanceFromTarget = Infinity;
    this.aSearchCost = Infinity;

    let block = this.getBlock();
    block.classList.add("empty");
    block.classList.remove("short-path-node");
    block.classList.remove("visited-non-animation");
    block.classList.remove("visited");
    block.classList.remove("treated");
    if (!this.isStart && !this.isTarget) {
      block.innerHTML = "";
    }
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
    let block = this.getBlock();
    block.classList.add("current");
  }

  removeCurrentInMazeGeneration() {
    let block = this.getBlock();
    block.classList.remove("current");
  }

  removeWall() {
    this.isWall = false;
    let block = this.getBlock();
    block.classList.remove("wall");
    block.classList.add("empty");
  }

  setWall() {
    this.isWall = true;
    let block = this.getBlock();
    block.classList.add("wall");
    block.classList.remove("empty");
  }

  thereIsSpaceInTopDirection() {
    return this.line - this.blockHeight * 2 >= 0;
  }
  thereIsSpaceInLeftDirection() {
    return this.column - this.blockWidth * 2 >= 0;
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

  setVisited() {
    this.isVisited = true;
    let block = this.getBlock();
    block.classList.add("visited");
    block.classList.remove("visited-non-animation");
    block.classList.remove("empty");
    block.classList.remove("treated");
  }

  setVisitedWithoutAnimation() {
    this.isVisited = true;
    let block = this.getBlock();
    block.classList.add("visited-non-animation");
    block.classList.remove("visited");
    block.classList.remove("empty");
    block.classList.remove("treated");
  }

  setNeighborsDijkstraWeight(dijkstraUnvisitedNode) {
    for (const value of this.neighbors.values()) {
      let neighborNode = getNode(value);
      if (!neighborNode.isVisited && !neighborNode.isWall) {
        let tmpWeigh =
          this.weight === Infinity ? Node.WEIGHT : this.weight + Node.WEIGHT;
        neighborNode.setDijkstraWeightAndParent(tmpWeigh, this);
        dijkstraUnvisitedNode.add(neighborNode);
      }
    }
  }

  setDijkstraWeightAndParent(newWeight, newParent) {
    if (this.weight > newWeight) {
      this.weight = newWeight;
      this.parent = newParent;
    }
  }

  setToPartOfTheShortPath() {
    this.isPartOfTheShortPath = true;
    let block = this.getBlock();
    block.classList.add("short-path-node");
    block.classList.remove("empty");
    block.classList.remove("visited");
    block.classList.remove("visited-non-animation");
    block.classList.remove("treated");
  }

  setToTreated() {
    this.treated = true;
    let block = this.getBlock();
    block.classList.add("treated");
    block.classList.remove("empty");
  }

  printScore() {
    this.treated = true;
    let block = this.getBlock();
    if (!this.isStart && !this.isTarget) {
      let tmp = `
        <span>${this.weight}  ${this.distanceFromTarget}</span><br>
        <span>${this.aSearchCost}</span>
      `;
      block.innerHTML = tmp;
    }
    block.classList.add("small-text");
  }

  setNeighborsASearchCost(aSearchUnvisitedNodeSet, target) {
    for (const value of this.neighbors.values()) {
      let neighborNode = getNode(value);
      if (!neighborNode.isVisited && !neighborNode.isWall) {
        neighborNode.setDistanceFromTargetIfInfinite(target);

        let tmpWeigh =
          this.weight === Infinity ? Node.WEIGHT : this.weight + Node.WEIGHT;
        neighborNode.setASearchCostAndWeightAndParent(tmpWeigh, this);
        aSearchUnvisitedNodeSet.add(neighborNode);
      }
    }
  }

  setASearchCostAndWeightAndParent(newWeight, newParent) {
    if (this.weight > newWeight) {
      this.weight = newWeight;
      this.parent = newParent;
      this.aSearchCost = newWeight + this.distanceFromTarget;
    }
  }

  setNeighborsBestFirstSearch(bestFirstSearchUnvisitedNode, target) {
    for (const value of this.neighbors.values()) {
      let neighborNode = getNode(value);
      if (!neighborNode.isVisited && !neighborNode.isWall) {
        neighborNode.setDistanceFromTargetIfInfinite(target);
        neighborNode.setParent(this);
        bestFirstSearchUnvisitedNode.add(neighborNode);
      }
    }
  }
  setNeighborsBreadthFirstSearch(breadthFirstSearchUnvisitedNode) {

    for (const value of this.neighbors.values()) {
      let neighborNode = getNode(value);
      if (!neighborNode.isVisited && !neighborNode.isWall) {
        neighborNode.setParent(this);
        breadthFirstSearchUnvisitedNode.pushToTheBack(neighborNode);
      }
    }
    
  }

  setParent(newParent) {
    this.parent = newParent
  }


  setDistanceFromTargetIfInfinite(target) {
    if (this.distanceFromTarget === Infinity) {
      this.setDistanceFromTarget(target);
    }
  }

  setDistanceFromTarget(target) {
    let xDistance = target.line - this.line;
    let yDistance = target.column - this.column;
    let distance = this.abs(xDistance) + this.abs(yDistance);

    //this.distanceFromTarget = Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2))
    this.distanceFromTarget = distance;
  }
  abs(number) {
    if (number < 0) {
      return -number;
    }
    return number;
  }
  setToCurrent() {
    let block = this.getBlock();
    block.classList.add("current");
  }
  removeCurrent() {
    let block = this.getBlock();
    block.classList.remove("current");
  }
}
