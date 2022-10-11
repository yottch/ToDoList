const format = require('pg-format');
const dataBaseQuery = require('../db/modules/query');
const DB_CONFIG = require('../db/dataBaseConfig');

async function getFromDB(dataBase, payload) {
    try {
        const sql = `SELECT * FROM %I WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableTodos}`, Object.keys(payload), Object.values(payload)));
        if (result && result.rows && result.rows.length) {
            return result.rows;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('==> failed get "todo" ' + err);
        return null;
    }
}

async function addToDB(dataBase, payload, req) {
    try {
        const newTodo = Object.assign(payload, req.body);
        const sql = `INSERT INTO %I(%s) VALUES (%L)`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableTodos}`, Object.keys(newTodo).toString(), Object.values(newTodo)));
        return (result);
    }
    catch (err) {
        console.log('==> failed post "todo" ' + err);
        return null;
    }
}

async function delFromDB(dataBase, payload, req) {
    try {
        const sql = `DELETE FROM %I WHERE %I = %L;`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableTodos}`, 'id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed delete "todo" ' + err);
        return null;
    }
}

async function updateDB(dataBase, payload, req) {
    try {
        const sql = `UPDATE %I SET %I = %L WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableTodos}`, 'done', req.body.done, 'id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed put "todo" ' + err);
        return null;
    }
}

module.exports = { getFromDB, addToDB, delFromDB, updateDB };
