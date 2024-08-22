// Represents a node in the linked list for handling collisions
class Node {
  constructor(key, value) {
    this.key = key; // Key of the node
    this.value = value; // Value associated with the key
    this.next = null; // Pointer to the next node in the linked list
  }
}

class HashMap {
  constructor(initialSize = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor; // Load factor threshold for resizing
    this.capacity = initialSize; // Initial number of buckets in the hash map
    this.buckets = new Array(this.capacity).fill(null); // Array of buckets initialized to null
    this.size = 0; // Number of entries in the hash map
  }

  // Generates a unique index for the given key
  hash(key) {
    let hashCode = 0; // Initial hash value
    const primeNumber = 31; // Prime number for hash calculation

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode; // Returns a unique hashcode/index
  }

  // Prints the current state of the buckets array
  print() {
    console.log(this.buckets);
  }

  // Inserts or updates a key-value pair in the hash map
  set(key, value) {
    // Resize the hash map if the load factor exceeds the threshold
    if (this.size / this.capacity > this.loadFactor) {
      this.resize(this.capacity * 2); // Double the capacity
    }

    const index = this.hash(key); // Compute the index for the key
    let bucket = this.buckets[index]; // Get the bucket at the computed index
    const node = new Node(key, value); // Create a new node for the key-value pair
    this.size++; // Increment the size of the hash map

    // Check if the index is out of bounds (should not happen)
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    // If the bucket is empty, place the new node directly in the bucket
    if (bucket === null) {
      this.buckets[index] = node;
      return;
    }

    // Traverse the linked list to check for existing key or find the end
    while (bucket) {
      if (bucket.key === key) {
        // Update the value if the key already exists
        bucket.value = value;
        return;
      }
      if (!bucket.next) {
        break; // If at the end of the list, stop traversing
      }
      bucket = bucket.next; // Move to the next node in the list
    }

    // Add the new node at the end of the linked list
    bucket.next = node;
  }

  // Retrieves the value associated with the given key
  get(key) {
    const index = this.hash(key); // Compute the index for the key
    let bucket = this.buckets[index]; // Get the bucket at the computed index

    // Traverse the linked list to find the key
    while (bucket) {
      if (bucket.key === key) {
        return bucket.value; // Return the value if the key is found
      }
      bucket = bucket.next; // Move to the next node in the list
    }
    return undefined; // Return undefined if the key is not found
  }

  // Checks if the hash map contains the given key
  has(key) {
    const index = this.hash(key); // Compute the index for the key
    let bucket = this.buckets[index]; // Get the bucket at the computed index

    // Traverse the linked list to find the key
    while (bucket) {
      if (bucket.key === key) {
        return true; // Return true if the key is found
      }
      bucket = bucket.next; // Move to the next node in the list
    }
    return false; // Return false if the key is not found
  }

  // Removes the key-value pair associated with the given key
  remove(key) {
    const index = this.hash(key); // Compute the index for the key
    let bucket = this.buckets[index]; // Get the bucket at the computed index
    let prevNode = null; // Previous node for updating the list

    // Traverse the linked list to find and remove the key
    while (bucket) {
      if (bucket.key === key) {
        if (prevNode) {
          // If removing a node that is not the first node
          prevNode.next = bucket.next;
        } else {
          // If removing the first node in the bucket
          this.buckets[index] = bucket.next;
        }
        this.size--; // Decrement the size of the hash map
        return true; // Indicate successful removal
      }
      prevNode = bucket; // Update the previous node
      bucket = bucket.next; // Move to the next node in the list
    }
    return false; // Return false if the key was not found
  }

  // Returns the number of key-value pairs in the hash map
  length() {
    return this.size;
  }

  // Clears all entries in the hash map
  clear() {
    this.buckets = new Array(this.capacity).fill(null); // Reset buckets array
    this.size = 0; // Reset size
  }

  // Returns an array of all keys in the hash map
  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      // Traverse each bucket and collect keys
      while (bucket) {
        keys.push(bucket.key);
        bucket = bucket.next;
      }
    }
    return keys;
  }

  // Returns an array of all values in the hash map
  values() {
    const values = [];
    for (let bucket of this.buckets) {
      // Traverse each bucket and collect values
      while (bucket) {
        values.push(bucket.value);
        bucket = bucket.next;
      }
    }
    return values;
  }

  // Returns an array of all key-value pairs in the hash map
  entries() {
    const entries = [];
    for (let bucket of this.buckets) {
      // Traverse each bucket and collect key-value pairs
      while (bucket) {
        entries.push([bucket.key, bucket.value]);
        bucket = bucket.next;
      }
    }
    return entries;
  }

  // Resizes the hash map to a new capacity
  resize(capacity) {
    this.capacity = capacity; // Update capacity
    this.size = 0; // Reset size for re-insertion

    const oldBuckets = this.buckets; // Save old buckets array
    this.buckets = new Array(this.capacity).fill(null); // Create new buckets array

    // Rehash and reinsert all entries from old buckets into new buckets
    for (let bucket of oldBuckets) {
      while (bucket) {
        this.set(bucket.key, bucket.value); // Re-insert each key-value pair
        bucket = bucket.next; // Move to the next node in the list
      }
    }
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");


test.print()
console.log(test.length())
test.remove('kite')
console.log(test.length())
console.log(test.has('jacket'))
console.log(test.get('ice cream'))
test.set('jacket', 'royal blue')
test.print()
