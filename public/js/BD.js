import { condicionaisQuery } from './queryApi.js';
import { Ferramenta } from './Ferramenta.js';
import { overlay } from './overlay.js';

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
    }
}
export { BD };