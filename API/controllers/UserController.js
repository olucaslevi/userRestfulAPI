const User = require('../models/User');
const PasswordToken = require('../models/PasswordToken');
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

var secret = "obsocelenciancidodianoturno"

class UserController {
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }
    async create(req, res) {
        //capture the data from the request
        var { username, email, password } = req.body;
        // validate the data
        if (!username || !email || !password) {
            res.status(400).send({ error: "Missing data" });
            return;
        }
        if (username.length < 3) {
            res.status(400).send({ error: "Username too short" });
            return;
        }
        if (password.length < 6) {
            res.status(400).send({ error: "Password too short" });
            return;
        }
        if (email.indexOf('@') == -1) {
            res.status(400).send({ error: "Invalid email" });
            return;
        }

        //* check if the user already exists
        var userExists = await User.findByEmail(email);
        if (userExists) {
            res.status(406).send({ error: "User already exists" });
            return;
        }

        //* check if the username already exists
        var usernameExists = await User.findByUsername(username);
        if (usernameExists) {
            res.status(406).send({ error: "Username already exists" });
            return;
        }


        //* create the user
        try {
            await User.create(email, password, username);
            res.status(200).send({ success: "User created" });
            return;
        } catch (err) {
            res.status(406).send({ error: err });
            return;
        }

    }
    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);
        if (user != undefined) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ error: "User not found" });
        }
    }
    async update(req, res) {
        var { id, email, username, password,photo } = req.body;
        var result = await User.update(id, email, password, username, photo);
        if (result.status) {
            res.status(200).send({ success: "User updated" });
        } else {
            res.status(406).send({ error: result.err });
        }
    }
    async delete(req, res) {
        var id = req.params.id;
        var result = await User.delete(id);
        if (result.status) {
            res.status(200).send({ success: "User deleted" });
        } else {
            res.status(406).send({ error: result.err });
        }
    }
    async recoverPassword(req, res){
        //* in json only the email is sent
        var email = req.body.email;
        if (email == undefined) {
            res.status(400);
            res.send({error: "Email invalid"});
            return;
        }
        if (email.indexOf('@') == -1) {
            res.status(400);
            res.send({error: "Email invalid"});
            return;
        }
        // check if the email exists
        var result = await User.findByEmail(email);
        if (result == undefined) {
            res.status(406);
            res.send({error: "Email not registered"});
            return;
        }
        var result = await PasswordToken.generate(email);
        console.log(result);
        if(result.status){
           res.status(200);
           res.send("Token:" + result.token);
           console.log(result.token)
        }else{
            res.status(401)
            res.send(result.err);
        }
    }
    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status == true){
            try{
                await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            }catch(err){
                console.log(err);
                res.status(406);
                res.send("An error when updating your password", err);
                return;
            }
            res.status(200);
            res.send("Password has been updated");
        }else{
            res.status(406);
            res.send("Token invalid!");
        }
    }
    async login(req, res){
        var {email, password } = req.body;
        var user = await User.findByEmail(email);

        if(user != undefined){
            var resultado = await bcrypt.compare(password,user.password);
            if(resultado){
                var token = jwt.sign({ email: user.email, role: user.role }, secret);
                res.status(200);
                res.json({token: token, user: {
                    email: user.email,
                    username: user.username,
                    phone: user.phone,
                }
                });
                
            }else{
                res.status(406);
                res.send("Incorrect password");
            }
        }else{
            res.json({status: false});

        }
    }
}

module.exports = new UserController();