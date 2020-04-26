const baixarArquivo = require('./baixarArquivos');

exports.index = (req, res, next) => {
    console.log('oi');
    for (var key in req.body) {
        let dados = req.body[key];
        let flag = baixarArquivo(dados);
    }
}