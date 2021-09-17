const express = require('express');
const routerComentario = require('../app/routes/comentario');
const routerUser = require('../app/routes/user');
const routerPostUser = require('../app/routes/postUser');
const bodyParser = require('body-parser');

module.exports = function() {
    let app = express();
    //aplicacao
    app.set("port", 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.static("./public"));
    routerComentario(app);//rota comentario
    routerUser(app);//rota user
    routerPostUser(app);//rota post

    return app;
}
