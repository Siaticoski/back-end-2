import historicoInflacao from "../dados/dados.js";

export function buscarTodos() {
    return historicoInflacao;
}

export function buscarPorAno(ano) {
    const resultado = historicoInflacao.filter(item => item.ano === parseInt(ano));
    return resultado.length ? resultado : { erro: 'Nenhum histórico encontrado para o ano especificado.' };
}

export function buscarPorId(id) {
    const resultado = historicoInflacao.find(item => item.id === parseInt(id));
    return resultado || { erro: 'Elemento não encontrado.' };
}

export function calcReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal, historicoInflacao) {
    const periodo = historicoInflacao.filter(item => {
        return (item.ano > anoInicial || (item.ano === anoInicial && item.mes >= mesInicial)) &&
               (item.ano < anoFinal || (item.ano === anoFinal && item.mes <= mesFinal));
    });

    if (!periodo.length) {
        return { erro: 'Parâmetros inválidos.' };
    }

    const resultadoFinal = periodo.reduce((acumulado, item) => acumulado * (1 + item.ipca / 100), parseFloat(valor));
    return { valorReajustado: resultadoFinal.toFixed(2) };
}

export function validarParametros({ valor, mesInicial, anoInicial, mesFinal, anoFinal }) {
    if (!valor || !mesInicial || !anoInicial || !mesFinal || !anoFinal) {
        return 'Parâmetros faltando.';
    }
    if (anoInicial > anoFinal || (anoInicial === anoFinal && mesInicial > mesFinal)) {
        return 'Data inicial não pode ser posterior à data final.';
    }
    if (anoInicial < 2015 || anoFinal > 2023) {
        return 'Ano deve estar entre 2015 e 2023.';
    }
    if (mesInicial < 1 || mesInicial > 12 || mesFinal < 1 || mesFinal > 12) {
        return 'Mês deve estar entre 1 e 12.';
    }
    return null;
}