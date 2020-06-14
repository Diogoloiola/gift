import { tabela } from './tabela.js';
import { sanitizarNomeRepo } from './sanitizarNomeRepo.js';
import { BD } from './BD.js';
import { overlay } from './overlay.js';
import { objFactory } from './objFactory.js';
import { modal } from './modal.js';

const Ferramenta = {
    campos: document.querySelectorAll(".form-control"),
    load() {
        document.querySelector('#pesquisar-repositorio').onclick = this.antesDeEnviar.bind(this);
        document.querySelector('#baixar-selecionado').onclick = this.processaRepositorios.bind(this);
        document.querySelector('#voltar').onclick = tabela.voltarFormulario;
        document.querySelector('#retroceder').onclick = tabela.retroceder;
        document.querySelector('#avancar').onclick = tabela.avancar;
        document.querySelector('.closebtn').onclick = overlay.hideOverlay;
    },
    antesDeEnviar(e) {
        e.preventDefault();
        let url = BD.fazerQuery(this.campos);
        BD.consultarApi(url);
    },
    listarRepositorios(repositorios) {
        let indice = 1;
        repositorios.items.forEach(repositorio => {
            let coluna = tabela.criaLinha(repositorio, indice);
            $('#conteudo-tabela').append(coluna);
            BD.buscarReleases(repositorio.releases_url, indice, repositorio.html_url)
            indice++;
        });
        tabela.tamanho = indice;
        overlay.hideFormOverlay();
    },
    processaRepositorios() {
        let tam = tabela.tamanho;
        let repositorios = [];
        for (let i = 0; i < tam; i++) {
            let valor = $(`#op-${i+1}`);
            if (valor.length && valor.val().length) {
                let conteudo = valor.val()
                repositorios.push(objFactory(conteudo, sanitizarNomeRepo(conteudo)));

            }
        }
        if (repositorios.length === 0) {
            modal.setarDadosModal('Nenhum repositorio selecionado')
        } else {
            BD.baixarRepositorio(repositorios);
        }
    }
}

Ferramenta.load();

export { Ferramenta };