const knex = require('../database/db');
const bcrypt = require('bcrypt');

class User {
    // methods
    // create a new user
    async create(email,password,username){
        try{
            var hash = await bcrypt.hash(password,10);
            await knex.insert(
                {
                    email,
                    password:hash,
                    username,
                    role:0,
                    createAt: new Date(),
                    updateAt: new Date(),
                    photo: null
                }
                ).table("users");
        }catch(err){
            console.log(err);
        }
    }
    async update(id,email,username,photo){
        var user = await this.findById(id);
        if(user != undefined){
            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var result = await this.findByEmail(email);
                    if(result == false){
                        editUser.email = email;
                    }else{
                        return {status:false,err:"O email já está cadastrado!"};
                    }
                }
            }
            if(username != undefined){
                if(username != user.username){
                    var result = await this.findByUsername(username);
                    if(result == false){
                        editUser.username = username;
                    }else{
                        return {status:false,err:"O username já está cadastrado!"};
                    }
                }
            }
            if(photo != undefined){
                editUser.photo = photo;
            }
            try{
                await knex.update(editUser).where({id:id}).table("users");
                return {status:true};
            }catch(err){
                return {status:false,err:err};
            }
        }else{
            return {status:false,err:"O usuário não existe!"};
        }
    }
    // find a user by email
    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email:email});
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","role","password","username"]).from("users").where({email:email});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    // find a user by username
    async findByUsername(username){
        try{
            var result = await knex.select("*").from("users").where({username:username});
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async findAll(){
        try{
            var result = await knex.select("*").from("users");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    async findById(id){
        try{
            var result = await knex.select("username","email","cpf").from("users").where({id:id});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }
    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){
            try{
                await knex.delete().where({id:id}).table("users");
                return {status:true};
            }catch(err){
                return {status:false,err:err};
            }
        }else{
            return {status:false,err:"O usuário não existe!"};
        }
    } 
    async changePassword(newPassword,id,token){
        var hash = await bcrypt.hash(newPassword,10);
        await knex.update({password:hash}).where({id:id}).table("users");
        await PasswordToken.setUsed(token);
        
    }
}

module.exports = new User();