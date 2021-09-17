const Comentario = require('../models/comentario');
const view = require ("../views/comentario");

module.exports.addComentario = function(req,res){
    let coment = req.body; // atribuindo comnetario
    let promisse = Comentario.create(coment);// criando comentario com promisse
    promisse.then(function(coment) {
        res.status(201).json(view.render(coment)); // comentario criado
    }).catch (function(error) {
        res.status(404).json({mensagem: "requisição falhou"});
    });
}

module.exports.listComentarios = function(req,res){
    let promisse = Comentario.find().exec();// buscando todos comentarios
    promisse.then(function(coments){
        res.status(200).json(view.renderComentario(coments));//listando comentarios
    }).catch(function(error){
        res.status(500).json({mensagem: "erro no servidor"});
    });
}

module.exports.findComentariosId = function(req,res){
    let promisse = Comentario.find().populate("post").populate("usuario").exec();//promisse da buscar do comentario
    promisse.then(function(coments){
        res.status(200).json(view.renderComentario(coments)); //result da busca realizada
    }).catch(function(error){
        res.status(500).json({mensagem: "erro no servidor"});
    });
}

module.exports.deleteComentario = function(req, res) {
    var id = req.params.id; // id a ser deletado do comentario
    let promisse = Comentario.findByIdAndDelete(id); // buscando comentario a ser deletado
    promisse.then(function(coment){
        res.status(200).json(view.render(coment)); // comentario deletado com sucesso
    }).catch(function(error){
        res.status(500).json(error);
    });
};