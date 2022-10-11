const todo = require('./todoHandler');
const user = require('./userHandler');
const token = require('./tokenHandler');

const ACTIONS = {
    get: todo.getFromDB,
    add: todo.addToDB,
    del: todo.delFromDB,
    update: todo.updateDB,
    getUser: user.getFromDB
}

module.exports = async (dataBase, req, res, action) => {
    if (action == 'login') {
        user.login(dataBase, req, res);
        return;
    }
    try {
        const authorization = req.get('Authorization');
        if (authorization) {
            const curToken = authorization.replace('bearer ', '');
            const curUser = await user.getFromDB(dataBase, { sessionid: curToken });
            if (curUser && token.checkToken(curUser)) {
                const payload = action === 'getUser' ? { login: curUser.login } : { userid: curUser.id };
                const result = await ACTIONS[action](dataBase, payload, req);
                if (result) {
                    res.status(200).json({ status: 'ok', result });
                    console.log(`==> successfully ${action}`);
                } else {
                    res.json({ status: 'fail', message: 'Server error' });
                }
            } else {
                res.json({ status: 'fail', message: 'User is not logged in' });
            }
        } else {
            res.json({ status: 'fail', message: 'User is not logged in' });
        }
    }
    catch (err) {
        console.warn(`==> fail ${action}` + err);
        res.status(500).json({ status: 'fail', message: 'Server error' });
    }
}
