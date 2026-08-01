class LinkedList {
  constructor(key = undefined, next = null) {
    this.key = key;
    this.next = next;
  };
};

class HashSet {
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

  add(key) {
    const keyHashCode = this.hash(key);

    if (this.entry[keyHashCode]) {
      let tempNodeOfTheLinkedListInBucket = this.entry[keyHashCode].next;

      for (let i = 0; i < this.entry[keyHashCode].size; i++) {
        if (tempNodeOfTheLinkedListInBucket.key === key) {
          break;
        };
        if (i + 1 === this.entry[keyHashCode].size) {
          tempNodeOfTheLinkedListInBucket.next = new LinkedList(key);
          this.entry[keyHashCode].size += 1;
          break;
        };
        tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
      };
    };

    if (this.entry[keyHashCode] === undefined) {
      const head = {
        next: null,
        size: 0,
      };
      this.entry[keyHashCode] = head;
      this.entry[keyHashCode].next = new LinkedList(key);
      this.entry[keyHashCode].size += 1;
    };

    this.entriesGrowth();
  };

  get(key) {
    const keyHashCode = this.hash(key);

    if(this.entry[keyHashCode] === undefined) {
      return null;
    };

    let tempNodeOfTheLinkedListInBucket = this.entry[keyHashCode].next;
    for (let i = 0; i < this.entry[keyHashCode].size; i++) {
      if (tempNodeOfTheLinkedListInBucket.key === key) {
        return tempNodeOfTheLinkedListInBucket.key;
      };
      tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
    };

    return null;
  };

  has(key) {
    const keyHashCode = this.hash(key);

    if (this.entry[keyHashCode]) {
      let tempNodeOfTheLinkedListInBucket = this.entry[keyHashCode].next;
      for (let i = 0; i < this.entry[keyHashCode].size; i++) {
        if (tempNodeOfTheLinkedListInBucket.key === key) {
          return true;
        };
        tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
      };
    };

    return false;
  };

  remove(key) {
    const keyHashCode = this.hash(key);

    if (this.entry[keyHashCode]) {
      if (this.entry[keyHashCode].size === 1) {
        delete this.entry[keyHashCode];
        return true;
      };

      if (this.entry[keyHashCode].size !== 1) { 
        let tempNodeBeforeTheDeletedOne = this.entry[keyHashCode];
        let tempNodeOfTheLinkedListInBucket = this.entry[keyHashCode].next;
        let tempNodeAfterTheDeletedOne = tempNodeOfTheLinkedListInBucket.next;
    
        for (let i = 0; i < this.entry[keyHashCode].size; i++) {
          if (tempNodeOfTheLinkedListInBucket.key === key) {
            tempNodeBeforeTheDeletedOne.next = tempNodeAfterTheDeletedOne;
            this.entry[keyHashCode].size -= 1;
            break;
          };
          tempNodeBeforeTheDeletedOne = tempNodeOfTheLinkedListInBucket;
          tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
          tempNodeAfterTheDeletedOne = tempNodeOfTheLinkedListInBucket.next;
        };
      };
      return true;
    };
    return false;
  };

  length() {
    let nrOfKeysInHashSet = 0;

    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        nrOfKeysInHashSet += this.entry[i].size;
      };
    };
    return nrOfKeysInHashSet;
  };

  clear() {
    return this.entry = [];
  };

  keys() {
    let allKeysInTheHashSet = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        if(this.entry[i].size === 1) {
          allKeysInTheHashSet.push(this.entry[i].next.key);
        };

        if (this.entry[i].size !== 1) {
          let tempNodeOfTheLinkedListInBucket = this.entry[i].next;
          for (let i = 0; i < this.entry[i].size; i++) {
            allKeysInTheHashSet.push(tempNodeOfTheLinkedListInBucket.key);
            tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
          };
        };
      };
    };
    return allKeysInTheHashSet;
  };

  values() {
    return this.keys();
  };

  entries() {
    let allEntriesInTheHashSet = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        if(this.entry[i].size === 1) {
          allEntriesInTheHashSet.push([this.entry[i].next.key, this.entry[i].next.key]);
        };

        if (this.entry[i].size !== 1) {
          let tempNodeOfTheLinkedListInBucket = this.entry[i].next;
          for (let j = 0; j < this.entry[i].size; j++) {
            allEntriesInTheHashSet.push([tempNodeOfTheLinkedListInBucket.key, tempNodeOfTheLinkedListInBucket.key]);
            tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
          };
        };
      };
    };
    return allEntriesInTheHashSet;
  };

  entriesGrowth() {
    const growthFactor = this.capacity * this.loadFactor;
    const allEntriesInHashMap = this.entries();
    const currentSizeOfTheHashMap = this.length();

    if (growthFactor >= currentSizeOfTheHashMap) {
      return;
    };

    if (growthFactor < currentSizeOfTheHashMap) {
      this.clear();
      this.capacity *= 2;

      for (let i = 0; i < allEntriesInHashMap.length; i++) {
        this.add(allEntriesInHashMap[i][0]);
      };
      return;
    };
  };
};
