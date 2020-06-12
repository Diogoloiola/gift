import { condicionaisQuery } from './queryApi.js';
import { Ferramenta } from './Ferramenta.js';
import { overlay } from './overlay.js';
import {tabela} from './tabela.js';

const BD = {
    linkApi: 'https://api.github.com/search/repositories',
    complementoQuery: '',
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
    buscarReleases(url, indice, urlSemRelease){
        let tam = url.length;
        url = url.slice(0, tam-5)
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer 85639888d256054480ae6d56fc4dce018167727e');
            },
            success: function(dados) {
                tabela.criaOption(dados, indice, urlSemRelease);
            }
        });
    }
}
export { BD };