/**
 * Title : Check Users
 * Date : June 9, 2020
 * Description: Validates that user from formData has not been previously 
 * added to MySQL Database. 
 */

 let userTrie = require("./users"); 


 /**
  * 
  * @param {String} formUsername
  * @param {Array} results
  * @return {true} if username already exists 
  * @return {false} if username does not exist.  
  */
function checkUsers(formUsername, results){
    let newTrie = new userTrie();

    // We should use a Trie to validate users 
    for (let i = 0; i < results.length; i++){
        if (req.body.username === results[i].username){ 
            res.status(406);
            res.send("Username has already been used. Come up with another one.");
        }
    }
} 