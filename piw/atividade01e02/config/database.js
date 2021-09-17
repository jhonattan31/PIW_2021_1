const mongoose = require('mongoose');

module.exports = function(uri){
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.on('connected', function(){
        console.log('mongoose! Conectado em '+uri)
    });

    mongoose.connection.on('disconnected', function(){
        console.log('mongoose! Desconectado de '+uri)
    });

    mongoose.connection.on('error', function(erro){
        console.log('mongoose! Erro de conexão: '+ erro)
    });

    mongoose.set('debug', true);
}