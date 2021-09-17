const Post = require('../models/post');
const Comentario = require('../models/comentario');
const view = require('../views/post');
const viewComentario = require('../views/comentario');
const jwt = require('jsonwebtoken');

module.exports.addPost = function(req,res) {
    
    //let post = req.body;// post a ser adicionado
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        usuario: payload.id
    });
    let promisse = Post.create(post); // criando post no promisse
    promisse.then(function(post){
        res.status(201).json(view.render(post)); //post criado com sucesso
    }).catch(function(error){
        res.status(500).json({mensagem: "erro no servidor"});
    });
}

module.exports.listPosts = function(req,res) {
    let promisse = Post.find().populate("usuario").exec(); // recebendo todos post para o promisse
    promisse.then(function(posts){
        res.status(200).json(view.renderPosts(posts)); // listando posts
    }).catch(function(error){
        res.status(500).json({mensagem: "erro no servidor"});
    });
}

module.exports.findPostId = function(req,res) {
    let id = req.params.id; // id do post procurado
    let promisse = Post.findById(id).populate("usuario").exec();//Post a ser porcurado
    promisse.then(function(post){
        res.status(200).json(view.render(post));// post encontrado
    }).catch(function(error){
        res.status(400).json({mensagem: "não funcionou", error:error})
    });
}

module.exports.findComentarioPostsId = function(req,res) {
    let id = req.params.id;// id do comentario no post
    let promisse = Comentario.find({post:id}).populate("usuario").exec();// comentario do respectivo id
    promisse.then(function(post){
        res.status(200).json(viewComentario.renderComentario(post)); // comentario printado
    }).catch(function(error){
        res.status(400).json({mensagem: "não funcionou", error:error})
    });
}

module.exports.deletePost = function(req,res) {
    let id = null;
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let post = Post.findById(req.params.id).exec();
    post.then(function(post_logado){
        console.log("id do token: "+payload.id);
        console.log("id do post procuradp: "+ post_logado.usuario);
        if(payload.id == post_logado.usuario){
            id = req.params.id;
        }
        let promisse = Post.findByIdAndDelete(id); //post a ser deletado
        promisse.then(function(post){
            res.status(200).json(view.render(post));//post deletado com sucesso
        }).catch(function(error){
            res.status(402).json({mensagem: "vc não tem permissao para excluir este post", error:error});
        });
    }).catch(function(error){
        res.status(402).json({mensagem: "post nao encontrado", error:error});
    });
    
    
}