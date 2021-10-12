const Post = require('../../../model/Post')

/**
 * 
 * @param {*} title 
 * @param {*} content 
 * @param {*} username 
 */
async function addPost(Title, Content,username) {
    try {        
        var created = new Date();
        let newPost = new Post({
                username,
                Title,
                Content,
                created
            });
        await newPost.save(); 
        return "Post added";
    }
    catch(err){
        console.error("Error: " + err.message);
        throw Error("Server Error");
    }
}

module.exports = {
    addPost
}
