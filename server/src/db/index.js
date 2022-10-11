const { Client } = require('pg');
const { uri } = require('./dataBaseConfig');
const DB_CONFIG = require('./dataBaseConfig');

module.exports = async () => {
    let connection;
    try {
        connection = new Client({
            connectionString: DB_CONFIG.uri,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await connection.connect();
        return connection;
    }
    catch (err) {
        console.log("==> create connection fail " + err);
        await connection.end();
        return null;
    }
};
