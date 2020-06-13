import { condicionaisQuery } from './queryApi.js';
import { Ferramenta } from './Ferramenta.js';
import { overlay } from './overlay.js';
import { tabela } from './tabela.js';
import { token } from '../credenciais/./token.js'
const BD = {
    linkApi: 'https://api.github.com/search/repositories',
    complementoQuery: '',
    indice: 1,
    fazerQuery(campos) {
        let complementoQuery = '?q=';
        campos.forEach(campo => {
            complementoQuery += condicionaisQuery[campo.dataset.tipo](campo.value);
        });
        this.complementoQuery = complementoQuery;
        return this.linkApi + this.complementoQuery;
    },
    consultarApi(url) {
        return axios.get(url);
    },
    buscarRepositorios(url) {
        let promise = this.consultarApi(url);
        overlay.showOverlayForm();
        promise.then(response => {
            Ferramenta.listarRepositorios(response.data);
        });
    },
    baixarRepositorio(dados) {
        $.ajax({
            url: '/recuperarDados',
            type: 'POST',
            data: { dados },
            dataType: 'json',
            beforeSend() {
                overlay.showOverlay('Baixando');
            },
            success(dados) {
                console.table(dados);
            },
            error(dados) {
                console.log(dados);
            },
            complete() {
                $('#overlay').hide();
            }
        })
    },
    buscarReleases(url, indice, urlSemRelease) {
        let tam = url.length;
        url = url.slice(0, tam - 5)
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
            success: function(dados) {
                tabela.criaOption(dados, indice, urlSemRelease);
            }
        });
    }
}
export { BD };