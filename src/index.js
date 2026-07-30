class LinkedList {
  constructor(key = undefined, value = undefined, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  };
};

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.entry = [];
  };

  hash(key) {
    if (typeof key !== "string") {
      throw new Error("The key is not a string data type.");
    };

    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    };
    return hashCode; 
  };

  set(key, value) {
    const keyHashCode = this.hash(key);
    if (this.entry[keyHashCode]) {
      let tempNodeOfTheLinkedListInBucket = this.entry[keyHashCode].next;
      for (let i = 0; i < this.entry[keyHashCode].size; i++) {
        if (tempNodeOfTheLinkedListInBucket.key === key) {
          tempNodeOfTheLinkedListInBucket.value = value;
          break
        };
        if (i + 1 === this.entry[keyHashCode]) {
          this.entry[keyHashCode].next = {hallo:1};
        };
        tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
      };
    };

    let head = {
      next: null,
      size: 0,
    };
    if (this.entry[keyHashCode] === undefined) {
      this.entry[keyHashCode] = head;
      this.entry[keyHashCode].next = new LinkedList(key, value);
      this.entry[keyHashCode].size += 1;
    };
  };
};

const myHashMap = new HashMap();
myHashMap.set("alex", 25);
myHashMap.set("george", 10);
myHashMap.set("alex", 1);

console.log(myHashMap);
