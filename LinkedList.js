import Node from "./Node.js";

export default function LinkedList() {
  let nodeCount = 0;
  let headNode = null;
  let tailNode = null;

  // Adds a new node containing value to the end of the list
  function append(value = null) {
    if (headNode === null) {
      prepend(value);
    } else {
      const newNode = Node(value);
      let tmpHead = headNode;

      while (tmpHead.nextNode !== null) {
        tmpHead = tmpHead.nextNode;
      }

      nodeCount += 1;
      tmpHead.nextNode = newNode;
      tailNode = newNode;
    }
  }

  // Adds a new node containing value to the start of the list
  function prepend(value = null) {
    const newNode = Node(value);
    newNode.nextNode = headNode;
    headNode = newNode;
    nodeCount += 1;
  }

  // Returns the total number of nodes in the list
  function size() {
    return nodeCount;
  }

  // Returns the first node in the list
  function head() {
    return headNode;
  }

  // Returns the last node in the list
  function tail() {
    return tailNode;
  }

  // Returns the node at the given index
  function at(index) {
    if (index === 0 || headNode === null) {
      return headNode;
    }

    let tmpCount = 0;
    let tmpHead = headNode;

    while (tmpHead !== null) {
      tmpCount += 1;
      tmpHead = tmpHead.nextNode;

      if (tmpCount === index) {
        return tmpHead;
      }
    }

    return null;
  }

  // Removes the last element from the list
  function pop() {
    let tmpHead = headNode;

    while (tmpHead !== null) {
      if (tmpHead.nextNode === tailNode) {
        const poppedNode = tailNode;
        tailNode = tmpHead;
        tailNode.nextNode = null;
        nodeCount -= 1;
        return poppedNode;
      }

      tmpHead = tmpHead.nextNode;
    }
  }

  // Returns true if the passed in value is in the list and otherwise returns false
  function contains(value) {
    if (headNode.value === value) {
      return true;
    }

    let tmpHead = headNode;

    while (tmpHead !== tailNode) {
      tmpHead = tmpHead.nextNode;

      if (tmpHead.value === value) {
        return true;
      }
    }

    return false;
  }

  // Returns the index of the node containing value, or null if not found
  function find(value) {
    if (headNode.value === value) {
      return 0;
    }

    let tmpCount = 0;
    let tmpHead = headNode;

    while (tmpHead !== null) {
      tmpCount += 1;
      tmpHead = tmpHead.nextNode;

      if (tmpHead.value === value) {
        return tmpCount;
      }
    }

    return null;
  }

  // String representation. The format should be: ( value ) -> ( value ) -> ( value ) -> null
  function toString() {
    let output = "";
    let tmpHead = headNode;

    if (headNode === null) {
      output += "null";
      return output;
    }

    while (tmpHead !== null) {
      output += `( ${tmpHead.value} ) -> `;

      if (tmpHead.nextNode === null) {
        output += "null";
        return output;
      }

      tmpHead = tmpHead.nextNode;
    }
  }

  // Extra credit

  // Inserts a new node with the provided value at the given index
  function insertAt(value, index) {
    if (headNode === null) {
      throw new Error("List is empty!");
    }

    if (index > nodeCount) {
      throw new Error("List is not that big!");
    }

    // If the index requested is the beginning of the list, we already have a function that prepends
    if (index === 0) {
      prepend(value);
      return;
    }

    // If the index requested is the end of the list, we already have a function that appends
    if (index === nodeCount) {
      append(value);
      return;
    }

    // tmpCount keeps track of where we are in the list
    // currentNode and previousNode keep track of where we are and where we've been without mutating headNode
    // When we find the index requested, create a new Node with the requested value,
    // point the previousNode to it and newNode to the currentNode
    let tmpCount = 0;
    let currentNode = headNode;
    let previousNode = null;

    while (currentNode !== null) {
      tmpCount += 1;
      previousNode = currentNode;
      currentNode = currentNode.nextNode;

      if (tmpCount === index) {
        const newNode = Node(value);
        newNode.nextNode = currentNode;
        previousNode.nextNode = newNode;
        nodeCount += 1;
        return;
      }
    }
  }

  // Removes the node at the given index
  function removeAt(index) {
    if (headNode === null) {
      throw new Error("List is empty!");
    }

    if (index >= nodeCount) {
      throw new Error("List is not that big!");
    }

    // If the first node in the list is requested, point headNode to headNode.nextNode,
    // effectively removing it from the chain
    if (index === 0) {
      headNode = headNode.nextNode;
      nodeCount -= 1;
      return;
    }

    // Same idea as insertAt()
    // When we find the index to remove, point the previousNode to the currentNode's nextNode,
    // effectively removing currentNode from the chain
    let tmpCount = 0;
    let currentNode = headNode;
    let previousNode = null;

    while (currentNode !== null) {
      tmpCount += 1;
      previousNode = currentNode;
      currentNode = currentNode.nextNode;

      if (tmpCount === index) {
        previousNode.nextNode = currentNode.nextNode;
        nodeCount -= 1;
        return;
      }
    }
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
