let assert = require("assert");
let Trie = require("../routes/loginroutes/users");

let userDB = new Trie(); 
let emailDB = new Trie(); 

userDB.insert("hams");
userDB.insert("ian");
emailDB.insert("harriszheng@live.com"); 

describe("All DB Tests", () => {
    describe("User DB Tests", () => { 
    
        it("hams should be found", () => {
            assert.equal(userDB.contains("hams"), true);
        });
    
        it(" should not be found", () => {
            assert.equal(userDB.contains(""), false);
        });
    
        it("yeetcode should not be found", () => {
            assert.equal(userDB.contains("yeetcode"), false);
        });
        
        it("ian should be found", () => {
            assert.equal(userDB.contains("ian"), true);
        });
    
    });

    describe("Email DB Tests", () => { 
    
        it("harriszheng@live.com should be found", () => {
            assert.equal(emailDB.contains("harriszheng@live.com"), true);
        });
    
        it(" should not be found", () => {
            assert.equal(userDB.contains(""), false);
        });
    });
});
