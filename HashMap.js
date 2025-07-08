// HashMap factory function
// Assignment limitation: Use the following snippet whenever you access a bucket through an index.
// We want to throw an error if we try to access an out-of-bounds index:

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

export default function HashMap() {
  let capacity = 16;
  let loadFactor = 0.75;

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
  function set(key, value) {}

  // Takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
  function get(key) {}

  // Takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  function has(key) {}

  // Returns the number of stored keys in the hash map
  function length() {}

  // Removes all entries in the hash map
  function clear() {}

  // Returns an array containing all the keys inside the hash map
  function keys() {}

  // Returns an array containing all the values
  function values() {}

  // Returns an array that contains each key, value pair
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  function entries() {}

  return {};
}
