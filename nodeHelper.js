/**
 *
 * @param {string} id
 * @param {Node} node
 */
function addNode(id, node) {
  map.set(id, node);
}

/**
 *
 * @param {string} line
 * @param {string} column
 */
function addNewNode(line, column, isTarget, isStart) {
  let node = new Node(
    line,
    column,
    isTarget,
    isStart,
    blockHeight,
    blockWidth,
    mapHeight,
    mapWidth
  );
  map.set(node.id, node);
}

/**
 *
 * @param {string} id
 * @returns {Node}
 */
function getNode(id) {
  return map.get(id);
}

/**
 *
 * @param {string} line
 * @param {string} column
 * @returns {Node}
 */
function getNodeByLineAndColumn(line, column) {
  return map.get(`${line}-${column}`);
}

function isTarget(line, column) {
  return line === targetLine && column === targetColumn;
}

function isStart(line, column) {
  return line === startLine && column === startColumn;
}

function getStartNode() {
  return getNodeByLineAndColumn(startLine, startColumn);
}
function getTargetNode() {
  return getNodeByLineAndColumn(targetLine, targetColumn);
}
