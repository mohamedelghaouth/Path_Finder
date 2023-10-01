import { getRandomArrayDivisibleBy25 } from "./helper.js";

export async function recursiveDivisionMaze() {
  await setBordersToWalls();
  recursiveDivision(0, mapHeight, 0, mapWidth, V_Orientation);
}

async function setBordersToWalls() {
  await setLineToWalls(0);
  await setColumnsToWalls(mapWidth);
  await setLineToWallsFromRightToLeft(mapHeight);
  await setColumnsToWallsFromBottomUp(0);
}

async function setLineToWalls(line) {
  for (let column = 0; column <= mapWidth; column += blockWidth) {
    let id = `${line}-${column}`;

    let node = getNode(id);
    if (!node.isStart && !node.isTarget) {
      node.setWall();
      await sleep(5);
    }
  }
}

async function setLineToWallsFromRightToLeft(line) {
  for (let column = mapWidth; column >= 0; column -= blockWidth) {
    let id = `${line}-${column}`;

    let node = getNode(id);
    if (!node.isStart && !node.isTarget) {
      node.setWall();
      await sleep(20);
    }
  }
}

async function setColumnsToWalls(column) {
  for (let line = 0; line <= mapHeight; line += blockHeight) {
    let id = `${line}-${column}`;

    let node = getNode(id);

    if (!node.isStart && !node.isTarget) {
      node.setWall();
      await sleep(5);
    }
  }
}

async function setColumnsToWallsFromBottomUp(column) {
  for (let line = mapHeight; line >= 0; line -= blockHeight) {
    let id = `${line}-${column}`;

    let node = getNode(id);

    if (!node.isStart && !node.isTarget) {
      node.setWall();
      await sleep(5);
    }
  }
}

async function recursiveDivision(
  minLine,
  maxLine,
  minColumn,
  maxColumn,
  orientation
) {
  let height = maxLine - minLine;
  let width = maxColumn - minColumn;
  if (height <= blockHeight * 5 || width <= blockWidth * 5) {
    return;
  }
  if (orientation === V_Orientation) {
    let randomColumn = getRandomColumn(
      minLine,
      maxLine,
      minColumn + 50,
      maxColumn - 50
    );
    await makeOpenWallInColumn(randomColumn, minLine, maxLine);

    let height = maxLine - minLine;
    let width = randomColumn - minColumn;
    let tmpOrientation = height > width ? H_Orientation : V_Orientation;
    await recursiveDivision(
      minLine,
      maxLine,
      minColumn,
      randomColumn,
      tmpOrientation
    );

    height = maxLine - minLine;
    width = maxColumn - randomColumn;
    tmpOrientation = height > width ? H_Orientation : V_Orientation;
    await recursiveDivision(
      minLine,
      maxLine,
      randomColumn,
      maxColumn,
      tmpOrientation
    );
    await sleep(20);
  } else {
    let randomLine = getRandomLine(
      minLine + 50,
      maxLine - 50,
      minColumn,
      maxColumn
    );
    await makeOpenWallInLine(randomLine, minColumn, maxColumn);

    let height = maxLine - randomLine;
    let width = maxColumn - minColumn;
    let tmpOrientation = height > width ? H_Orientation : V_Orientation;
    await recursiveDivision(
      randomLine,
      maxLine,
      minColumn,
      maxColumn,
      tmpOrientation
    );
    await sleep(20);

    height = randomLine - minLine;
    width = maxColumn - minColumn;
    tmpOrientation = height > width ? H_Orientation : V_Orientation;
    await recursiveDivision(
      minLine,
      randomLine,
      minColumn,
      maxColumn,
      tmpOrientation
    );
    await sleep(5);
  }
}

function getRandomLine(minLine, maxLine, minColumn, maxColumn) {
  let found = false;
  let randomLine = 0;
  while (!found) {
    randomLine = Math.floor(Math.random() * (maxLine - minLine + 1) + minLine);
    if (
      randomLine % 25 === 0 &&
      nodeIsAWall(randomLine, minColumn) &&
      nodeIsAWall(randomLine, maxColumn)
    ) {
      found = true;
    }
  }

  return randomLine;
}

function getRandomColumn(minLine, maxLine, minColumn, maxColumn) {
  let found = false;
  let randomColumn = 0;
  while (!found) {
    randomColumn = Math.floor(
      Math.random() * (maxColumn - minColumn + 1) + minColumn
    );
    if (
      randomColumn % 25 === 0 &&
      nodeIsAWall(maxLine, randomColumn) &&
      nodeIsAWall(minLine, randomColumn)
    ) {
      found = true;
    }
  }

  return randomColumn;
}

async function makeOpenWallInLine(randomLine, minColumn, maxColumn) {
  if (maxColumn - minColumn <= 50) {
    return;
  }
  let numberOfOpening = 1;
  let arrayOfOpening = getRandomArrayDivisibleBy25(
    minColumn + 25,
    maxColumn - 25,
    numberOfOpening
  );

  for (let column = minColumn; column < maxColumn; column += blockWidth) {
    if (!arrayOfOpening.includes(column)) {
      let id = `${randomLine}-${column}`;

      let node = getNode(id);
      if (!node.isStart && !node.isTarget) {
        node.setWall();
        await sleep(5);
      }
    }
  }
  return arrayOfOpening.pop();
}

async function makeOpenWallInColumn(randomColumn, minLine, maxLine) {
  if (maxLine - minLine <= 50) {
    return;
  }
  let numberOfOpening = 1;
  let arrayOfOpening = getRandomArrayDivisibleBy25(
    minLine + 25,
    maxLine - 25,
    numberOfOpening
  );

  for (let line = minLine; line < maxLine; line += blockHeight) {
    if (!arrayOfOpening.includes(line)) {
      let id = `${line}-${randomColumn}`;

      let node = getNode(id);

      if (!node.isStart && !node.isTarget) {
        node.setWall();
        await sleep(5);
      }
    }
  }
  return arrayOfOpening.pop();
}

function nodeIsAWall(line, column) {
  let id = `${line}-${column}`;

  let node = getNode(id);
  return node.isWall;
}
