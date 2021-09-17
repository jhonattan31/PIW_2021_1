
const postController = require('../controllers/postController.js');
const auth = require('../controllers/auth.js');

module.exports = function(app){
    app.use("/api/posts", auth.checar);
    app.get('/api/posts', postController.listPosts)
    app.get('/api/posts/:id', postController.findPostId)
    app.get("/api/posts/:id/comentarios", postController.findComentarioPostsId);
    app.post('/api/posts', postController.addPost)
    app.delete('/api/posts/:id', postController.deletePost)

}
