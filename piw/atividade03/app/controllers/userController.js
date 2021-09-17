const Usuario = require('../models/usuarios');
const Post = require('../models/post');
const view = require ("../views/usuario");
const viewPosts = require ("../views/post");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.addAlunos = function(req,res){
    //let usuario = req.body; 
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    }); //user a ser add
    let promisse = Usuario.create(usuario); // adicionando user com promisse
    promisse.then(function(user) {
        res.status(201).json(view.render(user)); //user adicionado
    }).catch ( function(error) {
        res.status(404).json({mensagem: "sua requisição falhou"});
    });
}

module.exports.listAlunos = function(req,res) {
    let promisse = Usuario.find().exec();// carregando lista de alunos
    promisse.then(function(user){
        res.status(200).json(view.renderMany(user));// listando alunos
    }).catch(function(error){
        res.status(500).json({mensagem: "erro no servidor"});
    });
};

module.exports.findAlunoPorId = function(req, res) {
    let id = req.params.id;// id a ser buscado
    let promisse = Usuario.findById(id).exec();// user do respectivo id
    promisse.then(function(user){
        res.status(200).json(view.render(user)); // printando user
    }).catch(function(error){
        res.status(404).json({mensagem: "usuario não encontrado ", error:error})
    });
};

module.exports.findPostsAlunoId = function(req,res){
    let id = req.params.id;// post do  aluno
    let promisse = Post.find({usuario:id});// post  do aluno
    promisse.then(function(posts){
        res.status(200).json(viewPosts.renderPosts(posts)); // post encontrado
    }).catch(function(error){
        res.status(404).json({mensagem: "usuario não encontrado ", error:error})
    });
};

module.exports.deleteAlunos = function(req, res) {
    //id a ser deletado
    let id = null;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    if(payload.id == req.params.id){
        id = req.params.id;
    }
    let promisse = Usuario.findByIdAndDelete(id);//aluno a ser deletado
    promisse.then(function(usuario){
        res.status(200).json(view.render(usuario));//aluno deletado
    }).catch(function(error){
        res.status(500).json({mensagem: "Você não tem permissao para deletar esse usuario", error: error});
    });
};
