const comController = require("../controllers/comentarioController.js");
const auth = require('../controllers/auth.js');

module.exports = function(app){
    app.use("/api/comentarios", auth.checar);
    app.get("/api/comentarios", comController.listComentarios);
    app.get("/api/comentarios/:id", comController.findComentariosId);
    app.post("/api/comentarios", comController.addComentario);
    app.delete("/api/comentarios/:id", comController.deleteComentario);
}