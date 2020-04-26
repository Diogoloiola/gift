const request = require('request');
const fs = require('fs');


function baixarArquivo(url) {
    let dataAtual = new Date().toString().slice(7, 15).replace(' ', '');
    let nome = parseNomeRepositorio(url);
    request(url, function(error, response, body) {
        if (response.statusCode == 200) {
            return 1;
        }
    }).pipe(fs.createWriteStream(`repositorios/${nome}.zip`));
}

function parseNomeRepositorio(urlRepositorio) {
    let nomeRepositorioNormal = urlRepositorio.replace('https://github.com/', '').replace('/archive/master.zip', '');
    return nomeRepositorioNormal.slice(nomeRepositorioNormal.lastIndexOf('/'), nomeRepositorioNormal.lenght);
}

module.exports = baixarArquivo;