class Node {
  constructor(data) {
    this.data = data;
    this.isWord = false;
    this.prefixes = 0;
    this.children = {};
  };
}


class Trie {
  constructor(node) {
    this.root = null;
  }
}