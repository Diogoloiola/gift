const baixarArquivo = require('./baixarArquivos');

exports.index = (req, res, next) => {
    console.log('oi');

    const { dados } = req.body
        // dados.forEach(el => {
        //     baixarArquivo(el.urlRepositorio, el.nome).then(() => console.log('arquivo baixado'));
        // });


        function baixar(dados, i){
            if(i < dados.length){
                console.log(dados[i].nome)
                baixarArquivo(dados[i].urlRepositorio, dados[i].nome).then(function(){
                    console.log('arquivo baixado' + dados[i].nome);
                    baixar(dados, i + 1)
                })
            }else{
                res.json({
                    flag: true
                })
            }
        }
        baixar(dados, 0)
}