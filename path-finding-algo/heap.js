export class Heap {
  constructor(attributeOfComparison) {
    this.array = [];
    this.attributeOfComparison = attributeOfComparison;
  }

  size() {
    return this.array.length;
  }

  getAttributeOFComparisonValue(index) {
    return this.array[index][this.attributeOfComparison];
  }
  compareIndexes(firstIndex, secondIndex) {
    return (
      this.getAttributeOFComparisonValue(firstIndex) <
      this.getAttributeOFComparisonValue(secondIndex)
    );
  }

  heapifyDown(i) {
    let leftChildIndex = 2 * i + 1;
    let rightChildIndex = 2 * i + 2;
    let largestOneIndex = i;

    if (
      leftChildIndex < this.size() &&
      this.compareIndexes(leftChildIndex, largestOneIndex)
    ) {
      largestOneIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.size() &&
      this.compareIndexes(rightChildIndex, largestOneIndex)
    ) {
      largestOneIndex = rightChildIndex;
    }

    if (largestOneIndex != i) {
      this.swap(largestOneIndex, i);
      this.heapifyDown(largestOneIndex);
    }
  }

  heapifyUp(index) {
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);

        // If the current element is smaller than its parent, swap them
        if (this.compareIndexes(index, parentIndex)) {
            this.swap(index, parentIndex);
            index = parentIndex;
        } else {
            // If the min-heap property is satisfied, break out of the loop
            break;
        }
    }
  }

  add(node) {
    this.array.push(node);
    if (this.size() > 1) {
      this.heapifyUp(this.size() - 1);
    }
  }

  getRoot() {
    this.swap(0, this.size() - 1);

    let minElement = this.array.pop();

    this.heapifyDown(0);

    return minElement;
  }

  swap(i, j) {
    let temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }

  hasNext() {
    for (const tmpNode of this.array) {
      if (!tmpNode.isVisited) {
        return true;
      }
    }

    return false;
  }
}
