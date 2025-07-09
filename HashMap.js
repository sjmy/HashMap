import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

// HashMap factory function
// Assignment limitation: Use the following snippet whenever you access a bucket through an index.
// We want to throw an error if we try to access an out-of-bounds index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

export default function HashMap() {
  let capacity = 16;
  let loadFactor = 0.75;
  let buckets = new Array(capacity);
  let bucketCount = 0;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  // If a key already exists, then the old value is overwritten
  // Remember to grow your buckets to double their capacity when your hash map reaches the load factor
  function set(key, value) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // If the bucket is empty, add a new linked list, append the key/value pair, place the head in the bucket
    if (buckets[index] === undefined) {
      let newList = LinkedList();

      newList.prepend(key, value);
      buckets[index] = newList.head();
      bucketCount += 1;
      return;
    }

    // If the bucket already has a linked list head in it, traverse the list and check if any keys match
    // If they do, update the value. If they don't, add a new entry to the linked list
    let tmpHead = buckets[index];

    while (tmpHead !== null) {
      if (tmpHead.key === key) {
        tmpHead.value = value;
        return;
      } else if (tmpHead.nextNode === null) {
        let newNode = Node(key, value);
        tmpHead.nextNode = newNode;
        bucketCount += 1;
      }

      tmpHead = tmpHead.nextNode;
    }
  }

  // Takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
  function get(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[index] === undefined) {
      return null;
    }

    let tmpHead = buckets[index];

    while (tmpHead !== null) {
      if (tmpHead.key === key) {
        return tmpHead.value;
      }

      tmpHead = tmpHead.nextNode;
    }

    return null;
  }

  // Takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  function has(key) {
    const index = hash(key);

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[index] === undefined) {
      return false;
    }

    let tmpHead = buckets[index];

    while (tmpHead !== null) {
      if (tmpHead.key === key) {
        return true;
      }

      tmpHead = tmpHead.nextNode;
    }

    return false;
  }

  // Returns the number of stored keys in the hash map
  function length() {
    return bucketCount;
  }

  // Removes all entries in the hash map
  function clear() {
    buckets = new Array(capacity);
    bucketCount = 0;
  }

  // Returns an array containing all the keys inside the hash map
  function keys() {
    let keysArray = [];

    for (let i = 0; i < capacity; i++) {
      if (buckets[i] === undefined) {
        continue;
      }

      let tmpHead = buckets[i];

      while (tmpHead !== null) {
        keysArray.push(tmpHead.key);
        tmpHead = tmpHead.nextNode;
      }
    }

    return keysArray;
  }

  // Returns an array containing all the values
  function values() {
    let valuesArray = [];

    for (let i = 0; i < capacity; i++) {
      if (buckets[i] === undefined) {
        continue;
      }

      let tmpHead = buckets[i];

      while (tmpHead !== null) {
        valuesArray.push(tmpHead.value);
        tmpHead = tmpHead.nextNode;
      }
    }

    return valuesArray;
  }

  // Returns an array that contains each key, value pair
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  function entries() {
    let entriesArray = [];

    for (let i = 0; i < capacity; i++) {
      if (buckets[i] === undefined) {
        continue;
      }

      let tmpHead = buckets[i];

      while (tmpHead !== null) {
        let entry = [tmpHead.key, tmpHead.value];
        entriesArray.push(entry);
        tmpHead = tmpHead.nextNode;
      }
    }

    return entriesArray;
  }

  return { set, get, has, length, clear, keys, values, entries };
}
