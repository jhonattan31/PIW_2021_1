const userController = require('../controllers/userController.js');

module.exports = function(app){

    app.get("/api/alunos", userController.listAlunos);
    app.get("/api/alunos/:id",userController.findAlunoPorId);
    app.get("/api/alunos/:id/posts", userController.findPostsAlunoId);
    app.post("/api/alunos", userController.addAlunos);
    app.delete("/api/alunos/:id", userController.deleteAlunos);

}