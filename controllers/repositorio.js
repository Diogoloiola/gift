const baixarArquivo = require('./baixarArquivos');

exports.index = (req, res, next) => {
    console.log('Os repositorios estão sendo baixados agurade');

    const { dados } = req.body
        // dados.forEach(el => {
        //     baixarArquivo(el.urlRepositorio, el.nome).then(() => console.log('arquivo baixado'));
        // });


    function baixar(dados, i) {
        if (i < dados.length) {
            // console.log(dados[i].nome)
            baixarArquivo(dados[i].urlRepositorio, dados[i].nome).then(function() {
                // console.log('arquivo baixado' + dados[i].nome);
                baixar(dados, i + 1)
            })
        } else {
            console.log(`Todos os ${i} arquivos foram baixados, verfique as pasta repositorios`);
        }
    }
    baixar(dados, 0)
}