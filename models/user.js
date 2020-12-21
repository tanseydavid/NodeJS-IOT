const db = require('../connection');
const tools = require( '../tools');

module.exports = {

    async getUserByUsername(username) {

        let sqlUser = 'SELECT * FROM users u ' +
          '  WHERE username = ? ';

        const user = await db.query(sqlUser, username);
        return user[0];
    },

    async getAll() {

        let sqlUsers = "SELECT * FROM users ORDER BY username";

        const users = await db.query(sqlUsers);
        return users;
    },

    authenticate() {
        return true;
    }

}