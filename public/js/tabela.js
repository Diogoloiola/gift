
import { BD } from './BD.js';

let tabela = {
    criaColuna(dados) {
        let dataFinal = dados.created_at.slice(0,10);
        return `
		<tr>
		<td>${dados.full_name}</td>
		<td>${dataFinal}</td>
		<td><input type="checkbox" name="teste" class="teste" value="${dados.html_url + '/archive/master.zip'}"></td>
		<td><button class="btn btn-default btn-copiar" data-valor="${dados.clone_url}">Copiar</button></td>
		</tr>
		`;
    },
    voltarFormulario() {
        $('#tabela').hide();
        $('#conteudo-tabela').html('');
        $('#formulario').fadeIn(500);
    }
}

export { tabela };