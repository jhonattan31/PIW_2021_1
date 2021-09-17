
const postController = require('../controllers/postController.js');

module.exports = function(app){
    app.get('/api/posts', postController.listPosts)
    app.get('/api/posts/:id', postController.findPostId)
    app.get("/api/posts/:id/comentarios", postController.findComentarioPostsId);
    app.post('/api/posts', postController.addPost)
    app.delete('/api/posts/:id', postController.deletePost)

}
