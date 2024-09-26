const express = require('express');
const colecaoUF = require('./dados/dados.js');

const app = express();

app.get('/ufs', (req, res) =>{
    res.json(colecaoUF.colecaoUf)
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});