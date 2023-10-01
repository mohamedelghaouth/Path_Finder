function getRandomNode() {
  function getRandomKeyFromMap(map) {
    // Convert the keys to an array
    const keysArray = Array.from(map.keys());

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * keysArray.length);

    // Retrieve and return the random key
    const randomKey = keysArray[randomIndex];

    return randomKey;
  }

  return map.get(getRandomKeyFromMap(map));
}

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

export async function deptFirstSearchMaze() {
  initializeGridToWalls(map);

  let startCell = getRandomNode();
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
            currentCell.secondElementInThisDirectionIsWall(direction, map)
          ) {
            let nextCell = currentCell.setTwoNextNeighborInThisDirectionToEmpty(
              direction,
              map
            );
            stack.push(nextCell);
          }

          break;
        case Node.leftKey:
          if (
            currentCell.thereIsSpaceInLeftDirection() &&
            currentCell.secondElementInThisDirectionIsWall(direction, map)
          ) {
            let nextCell = currentCell.setTwoNextNeighborInThisDirectionToEmpty(
              direction,
              map
            );
            stack.push(nextCell);
          }

          break;
        case Node.rightKey:
          if (
            currentCell.thereIsSpaceInRightDirection(mapWidth) &&
            currentCell.secondElementInThisDirectionIsWall(direction, map)
          ) {
            let nextCell = currentCell.setTwoNextNeighborInThisDirectionToEmpty(
              direction,
              map
            );
            stack.push(nextCell);
          }

          break;
        case Node.bottomKey:
          if (
            currentCell.thereIsSpaceInBottomDirection(mapHeight) &&
            currentCell.secondElementInThisDirectionIsWall(direction, map)
          ) {
            let nextCell = currentCell.setTwoNextNeighborInThisDirectionToEmpty(
              direction,
              map
            );
            stack.push(nextCell);
          }
          break;
      }
    });
    await sleep(20);
    currentCell.removeCurrentInMazeGeneration();
  }
}
