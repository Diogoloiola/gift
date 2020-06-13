const baixarArquivo = require('./baixarArquivos');

exports.index = (req, res, next) => {
    console.log('oi');

    const { dados } = req.body
        // dados.forEach(el => {
        //     baixarArquivo(el.urlRepositorio, el.nome).then(() => console.log('arquivo baixado'));
        // });


    function baixar(dados, indice) {
        if (indice < dados.length) {
            res.json({
                'flag': true
            });
        }
        baixarArquivo(dados[indice].urlRepositorio, dados[indice].nome).then(() => {
            console.log('arquivo baixado');
            baixar(dados, indice + 1)
        })
    }

    baixar(dados, 0);

}