const fs = require('fs');
const Path = require('path')
const Axios = require('axios');


async function baixarArquivo(url, nome) {
    console.log(url);
    const path = Path.resolve(__dirname, '../repositorios', `${nome}.zip`);


    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });


    response.data.pipe(fs.createWriteStream(path));


    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        })

        response.data.on('error', error => {
            reject(error);
        })
    });
}

module.exports = baixarArquivo;