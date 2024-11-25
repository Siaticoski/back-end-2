import express from 'express';
import { buscarTodos, buscarPorAno, buscarPorId, calcReajuste, validarParametros } from './servicos/servico.js';

const app = express();

app.get('/historicoIPCA/calculo', function (req, res) {
    const { valor, mesInicial, anoInicial, mesFinal, anoFinal } = req.query;
    const erro = validarParametros({
        valor: parseFloat(valor),
        mesInicial: Number(mesInicial),
        anoInicial: Number(anoInicial),
        mesFinal: Number(mesFinal),
        anoFinal: Number(anoFinal),
    });
    if (erro) return res.status(400).json({ erro });

    const resultado = calcReajuste(
        parseFloat(valor),
        Number(mesInicial),
        Number(anoInicial),
        Number(mesFinal),
        Number(anoFinal),
        buscarTodos()
    );
    return resultado.erro ? res.status(400).json(resultado) : res.json(resultado);
});

app.get('/historicoIPCA', function (req, res) {
    const ano = req.query.ano;
    const resultado = ano ? buscarPorAno(Number(ano)) : buscarTodos();
    return resultado.erro ? res.status(404).json(resultado) : res.json(resultado);
});

app.get('/historicoIPCA/:id', function (req, res) {
    const resultado = buscarPorId(Number(req.params.id));
    return resultado.erro ? res.status(404).json(resultado) : res.json(resultado);
});

app.listen(8080, function () {
    console.log('Projeto IPCA iniciado. Acesse: http://localhost:8080');
});