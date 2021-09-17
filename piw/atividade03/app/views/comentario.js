const viewUsuario = require("../views/usuario");

function render(comentario) {
    return {
        
        id: comentario._id,
        texto: comentario.texto,
        post: comentario.post,
        usuario: viewUsuario.render(comentario.usuario),

    }
}
module.exports.render = render;

function renderComentario(comentarios) {
    return comentarios.map(render);
}
module.exports.renderComentario = renderComentario;