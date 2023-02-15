var jwt = require('jsonwebtoken');
var secret = "obsocelenciancidodianoturno"

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1];

        try {
            var decoded = jwt.verify(token, secret)
            if (decoded.role == 0) {// 1 = admin
                next();
            }  else { // 0 = user
                res.status(408).send("You don't have permission to access this page")
                return
            }
        } catch (err) {
            res.status(409).send("You don't have permission to access this page")
            return
        }

    }
}

//funcionamento do middleware
//1. Verifica se o usuário está logado
//2. Se estiver, continua a execução
//3. Se não estiver, redireciona para a página de login
