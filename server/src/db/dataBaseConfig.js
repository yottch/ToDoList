const DB_URL = process.env.DATABASE_URL || "postgres://ohamlaggpaglyq:52366b047fd8cf80310a4fcd0201ed106d77845127eb6f13597ccc38b55d9cba@ec2-52-209-246-87.eu-west-1.compute.amazonaws.com:5432/d1q04br2isteoq";

const DB_CONFIG = {
    uri: DB_URL,
    host: "ec2-52-209-246-87.eu-west-1.compute.amazonaws.com",
    user: "ohamlaggpaglyq",
    port: "5432",
    password: "52366b047fd8cf80310a4fcd0201ed106d77845127eb6f13597ccc38b55d9cba",
    database: "d1q04br2isteoq",
    tableUsers: "users",
    tableTodos: "todo_list"
}

module.exports = DB_CONFIG;
