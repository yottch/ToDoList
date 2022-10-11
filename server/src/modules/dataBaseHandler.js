const dataBaseConnect = require('../db');
const createTables = require('../db/modules/createTable');

module.exports = async () => {
    try {
        const dbConnection = await dataBaseConnect();
        // await createTables(dbConnection);
        return dbConnection;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
