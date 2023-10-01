import { getRandomArrayDivisibleBy25 } from "./helper.js";
export function randomMaze() {
  let randomLines = getRandomArrayDivisibleBy25(0, mapHeight, 40);

  randomLines.forEach((line) => {
    let randomColumn = getRandomArrayDivisibleBy25(0, mapWidth, 10);
    randomColumn.forEach((col) => {
      let node = map.get(`${line}-${col}`);
      if (!node.isStart && !node.isTarget) {
        node.setWall();
      }
    });
  });
}
