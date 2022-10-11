const jwt = require('jsonwebtoken');

module.exports = {
    generate(payload, jwtSecret) {
        const token = jwt.sign(payload, jwtSecret);
        return {
            token,
            created: new Date()
        };
    },
    check(token, jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    }
};
