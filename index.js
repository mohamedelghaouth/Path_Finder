/** @format */

let projectMap = new ProjectMap();

projectMap.createMap();

//let pathFindingButton = document.getElementById("path-finding-button");

let mazeGenerationButton = document.getElementById("maze-generation-button");
mazeGenerationButton.onclick = projectMap.createTestMaze.bind(projectMap)


document.getElementById("clear-button").addEventListener('click', projectMap.clearMap.bind(projectMap));
