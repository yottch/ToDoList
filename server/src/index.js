const express = require('express');
var serveStatic = require('serve-static');

// const fs = require('fs');
const dataBaseCreate = require('./modules/dataBaseHandler');
const handleRequest = require('./modules/requestHandler');

const app = express();
const port = process.env.PORT || 5002;

// let protected = fs.readdirSync(`${__dirname}/../../dist`, 'utf-8');

app.use(express.static(`${__dirname}/../../dist`));
app.use(serveStatic(__dirname + "/../../dist"));
app.use(express.json());

let dataBase;
dataBaseCreate().then((res) => (dataBase = res));

app.get('/todo', async (req, res) => {
    handleRequest(dataBase, req, res, 'get');
});
app.post('/todo', async (req, res) => {
    handleRequest(dataBase, req, res, 'add');
});
app.put('/todo/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'update');
});
app.delete('/todo/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'del');
});
app.get('/user', async (req, res) => {
    handleRequest(dataBase, req, res, 'getUser');
});
app.post('/user', async (req, res) => {
    handleRequest(dataBase, req, res, 'login');
});

// app.get("*", (req, res) => {
// let path = req.params['0'].substring(1)
// if (protected.includes(path)) {
//     res.sendFile(`${__dirname}/../../dist/${path}`);
// } else {
// res.sendFile(`${__dirname}/../../dist/index.html`);
// }
// });

app.listen(port, () => { console.log(`listen at port ${port}...`); });
