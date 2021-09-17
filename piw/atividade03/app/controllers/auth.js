const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.js')
const jwt = require('jsonwebtoken')

module.exports.logar = function(req, res){
    Usuario.findOne({email: req.body.email})
        .then(function(user){
            if(bcrypt.compareSync(req.body.senha, user.senha)){
                let token = jwt.sign({id: user._id}, "senha_secreta");
                //console.log(token)
                res.status(200).json({token:token, nome: user.nome});
            }else{
                res.status(401).send("credentiais erradas2");

            }
        })
        .catch(function(error){
            res.status(401).send("credentiais erradas3");
        })
}

module.exports.checar = function(req, res, next){
    let token = req.headers.token;
    jwt.verify(token, "senha_secreta", function(err, decoded){
        if(err){
            res.status(401).send("Token invalido");
        }else{
            next();
        }
        
    });
}