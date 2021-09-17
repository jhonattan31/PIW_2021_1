const userController = require('../controllers/userController.js');
const auth = require('../controllers/auth.js');

module.exports = function(app){

    app.post("/api/usuarios/signin", auth.logar);
    app.post("/api/usuarios", userController.addAlunos);
    app.use("/api/usuarios", auth.checar);
    app.get("/api/usuarios", userController.listAlunos);
    app.get("/api/usuarios/:id",userController.findAlunoPorId);
    app.get("/api/usuarios/:id/posts", userController.findPostsAlunoId);
    app.delete("/api/usuarios/:id", userController.deleteAlunos);

}