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
          this.entriesGrowth();
          break;
        };
        if (i + 1 === this.entry[keyHashCode].size) {
          tempNodeOfTheLinkedListInBucket.next = new LinkedList(key, value);
          this.entry[keyHashCode].size += 1;
          this.entriesGrowth();
          break;
        };
        tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
      };

      return;
    };

    const head = {
      next: null,
      size: 0,
    };
    if (this.entry[keyHashCode] === undefined) {
      this.entry[keyHashCode] = head;
      this.entry[keyHashCode].next = new LinkedList(key, value);
      this.entry[keyHashCode].size += 1;
    };
  };

  get(key) {
    const keyHashCode = this.hash(key);

    if(this.entry[keyHashCode] === undefined) {
      return null;
    };

    let tempNodeOfTheLinkedListInBucket = this.entry[keyHashCode].next;
    for (let i = 0; i < this.entry[keyHashCode].size; i++) {
      if (tempNodeOfTheLinkedListInBucket.key === key) {
        return tempNodeOfTheLinkedListInBucket.value;
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
            this.entry[keyHashCode] -= 1;
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
    let nrOfKeysInHashMap = 0;

    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        nrOfKeysInHashMap += this.entry[i].size;
      };
    };
    return nrOfKeysInHashMap;
  };

  clear() {
    return this.entry = [];
  };

  keys() {
    let allKeysInTheHashMap = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        if(this.entry[i].size === 1) {
          allKeysInTheHashMap.push(this.entry[i].next.key);
        };

        if (this.entry[i].size !== 1) {
          let tempNodeOfTheLinkedListInBucket = this.entry[i].next;
          for (let i = 0; i < this.entry[i].size; i++) {
            allKeysInTheHashMap.push(tempNodeOfTheLinkedListInBucket.key);
            tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
          };
        };
      };
    };
    return allKeysInTheHashMap;
  };

  values() {
    let allValuesInTheHashMap = [];

    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        if(this.entry[i].size === 1) {
          allValuesInTheHashMap.push(this.entry[i].next.value);
        };

        if (this.entry[i].size !== 1) {
          let tempNodeOfTheLinkedListInBucket = this.entry[i].next;
          for (let i = 0; i < this.entry[i].size; i++) {
            allValuesInTheHashMap.push(tempNodeOfTheLinkedListInBucket.value);
            tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
          };
        };
      };
    };
    return allValuesInTheHashMap;
  };

  entries() {
    let allEntriesInTheHashMap = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.entry[i] === undefined) {
        continue;
      };
      if (this.entry[i]) {
        if(this.entry[i].size === 1) {
          allEntriesInTheHashMap.push([this.entry[i].next.key ,this.entry[i].next.value]);
        };

        if (this.entry[i].size !== 1) {
          let tempNodeOfTheLinkedListInBucket = this.entry[i].next;
          for (let j = 0; j < this.entry[i].size; j++) {
            allEntriesInTheHashMap.push([tempNodeOfTheLinkedListInBucket.key, tempNodeOfTheLinkedListInBucket.value]);
            tempNodeOfTheLinkedListInBucket = tempNodeOfTheLinkedListInBucket.next;
          };
        };
      };
    };
    return allEntriesInTheHashMap;
  };

  entriesGrowth() {
    const growthFactor = this.capacity * this.loadFactor;

    if (growthFactor <= this.length()) {
      return;
    };

    if (growthFactor > this.length()) {
      const allEntriesInHashMap = this.entries();
      this.clear();
      this.capacity *= 2;

      for (let i = 0; i < allEntriesInHashMap.length; i++) {
        this.set(allEntriesInHashMap[i][0], allEntriesInHashMap[i][1]);
      };
    };
  };

};

const myHashMap = new HashMap();

//myHashMap.set("alex", 25);
//myHashMap.set("george", 10);
//myHashMap.set("alex", 1);
//console.log(myHashMap.get("george"));
//console.log(myHashMap.has("georgeA"));
//console.log(myHashMap.remove("alex"));
//console.log(myHashMap.length());
//myHashMap.clear();
//console.log(myHashMap.keys());
//console.log(myHashMap.values());
//console.log(myHashMap.entries());
//myHashMap.entriesGrowth();

//console.log(myHashMap);

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
test.set('clown', 'red')  


console.log(test);