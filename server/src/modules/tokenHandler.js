const format = require('pg-format');
const dataBaseQuery = require('../db/modules/query');
const DB_CONFIG = require('../db/dataBaseConfig');
const jwt = require('./jwt');

async function checkToken(user) {
    try {
        let decoded = jwt.check(user.sessionid, user.secret);
        return decoded.name === user.name ? true : false;
    }
    catch (err) {
        console.log('==> check token fail ' + err);
        return false;
    }
}

async function addToDB(dataBase, user) {
    try {
        const token = jwt.generate({ name: user.name }, user.secret);
        const sql = `UPDATE %I SET %I = %L WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableUsers}`, 'sessionid', token.token, 'login', user.login));
        return result ? token : null;
    }
    catch (err) {
        console.log('==> add token fail ' + err);
        return null;
    }
}

module.exports = { checkToken, addToDB };
