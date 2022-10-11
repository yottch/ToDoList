module.exports = async (dbConnection, sql, values) => {
    try {
        const result = await dbConnection.query(sql, values);
        return result;
    }
    catch (err) {
        console.log('==> failed query ' + err);
        return null;
    }
}
