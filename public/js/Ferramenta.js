import { tabela } from './tabela.js';
import { validador } from './validadorForm.js';
import { BD } from './BD.js';
import { overlay } from './overlay.js';
import { objFactory } from './objFactory.js';


const Ferramenta = {
    campos: document.querySelectorAll(".form-control"),
    load() {
        document.querySelector('#pesquisar-repositorio').onclick = this.antesDeEnviar.bind(this);
        document.querySelector('#baixar-selecionado').onclick = this.processaRepositorios.bind(this);
        document.querySelector('#voltar').onclick = tabela.voltarFormulario;
    },
    antesDeEnviar(e) {
        e.preventDefault();
        let url = BD.fazerQuery(this.campos);
        BD.buscarRepositorios(url);
    },
    listarRepositorios(repositorios) {
        let indice = 1;
        repositorios.items.forEach(repositorio => {
            let coluna = tabela.criaColuna(repositorio, indice);
            $('#conteudo-tabela').append(coluna);
            BD.buscarReleases(repositorio.releases_url, indice, repositorio.html_url)
            indice++;
        });
        overlay.hideFormOverlay();
    },
    processaRepositorios() {
        let repositorios = [];

        $.each($('.teste:checked'), (indice, repositorio) => {
            repositorios.push(objFactory(repositorio.value));
        });
        BD.baixarRepositorio(repositorios);
    }
}

Ferramenta.load();

export { Ferramenta };