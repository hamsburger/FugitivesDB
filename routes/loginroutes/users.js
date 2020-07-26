/**
 * Title: TrieNode
 * @param {char} letter 
 * @param {bool} isEnd 
 * @param {array} children 
 */
function TrieNode(letter, isEnd = false){
  this.letter = letter;
  this.isEnd = isEnd;
  this.children = []; 
}

class Trie {
  constructor(){
    this.root = new TrieNode(null);   
  }

  /** 
   * Title: insert
   * @param {String} newWord
   * @return {void} 
   */
  insert(newWord){
    let node = this.root; 
    for (let i = 0; i < newWord.length; i++){
      if (!node.children[newWord[i]])
        node.children[newWord[i]] = new TrieNode(newWord[i]);
    
      node = node.children[newWord[i]]; 
      if (i === newWord.length - 1){
        node.isEnd = true;  
        break; 
      }
    }
  }

  /**
   * Check if Trie contains whole word. 
   * @param {String} oldUser 
   * @return {false} if user doesn't exist.
   * @return {true} if user exists. 
   */
  contains(oldUser){
      let node = this.root; 
      for (let i = 0; i < oldUser.length; i++){
        if (node.children[oldUser[i]]) node = node.children[oldUser[i]];
        else return false;  
      } // for 

      return node.isEnd; 
  } // contains
};


module.exports = Trie;
