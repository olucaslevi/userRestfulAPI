const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: '****MY-USER****',
        password: '****MY-PASSWORD****',
        database: 'api_users'
    }
});

module.exports = knex;