const express = require('express');
const historicoInflacao = require('./dados/dados.js')

const app = express()

app.get('/historicoiPCA', (req, res) => {
    res.json(historicoInflacao)
});

app.listen(8080, () => {
    console.log('dados históricos do IPCA');
});