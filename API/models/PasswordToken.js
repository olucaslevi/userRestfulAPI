var knex = require("../database/db");
const User = require("./User");

class PasswordToken {
    async generate(email) { //? creates a token for password recovery
        try {
            // find user
            var user = await User.findByEmail(email); // ! erro tá aki
            if (user != undefined) {
                var token = Date.now();
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("password_tokens");
                return { status: true, token: token };
            } else {
                return { status: false, err: "User not found" };
            }
        } catch (err) {
            return { status: false, err: err };
        }
        
    }
    async validate(token) { //? validates if the token is valid (exist and not used)
        try {
            var result = await knex.select().where({ token: token }).table("password_tokens");
            if (result.length > 0) {
                var tk = result[0];
                if (tk.used) {
                    return { status: false };
                } else {
                    return { status: true, token: tk };
                }
            } else {
                return { status: false };
            }
        } catch (err) {
            return { status: false, err: err };
        }
    }
    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table("password_tokens");
    }
}

module.exports = new PasswordToken();