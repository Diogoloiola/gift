import { BD } from './BD.js';
import { Ferramenta } from './Ferramenta.js';
let tabela = {
        tamanho: 0,
        criaColuna(dados, id) {
            let dataFinal = dados.created_at.slice(0, 10);
            return `
        <tr>
        <td id="nome-${id}">${dados.full_name}</td>
        <td>${dataFinal}</td>
        <td><select id="op-${id}"><select></td>
        </tr>
        `;
        },
        voltarFormulario() {
            $('#tabela').hide();
            $('#conteudo-tabela').html('');
            $('#formulario').fadeIn(500);
        },
        criaOption(dados, id, url) {
            if (dados.length) {
                $(`#op-${id}`).append(`<option value="">Selecione</option>`)
                dados.forEach(elemento => {
                            $(`#op-${id}`).append(`<option value="${url + `/archive/${elemento.tag_name}.zip`}">${elemento.name}</option>`)
                });

       } else {
        $(`#op-${id}`).append(`<option value="">Selecione</option>`)
           $(`#op-${id}`).append(`<option value="${url + '/archive/master.zip'}">Master</option>`)
       }
   },
   retroceder(){
       if(BD.indice - 1 <= 0){
           alert('Não pode voltar');
       }
       else{
        $('#conteudo-tabela').html('');
        BD.indice--;
        let url = BD.fazerQuery(Ferramenta.campos);
        BD.buscarRepositorios(url);
       }
   },
   avancar(){
        $('#conteudo-tabela').html('');
        BD.indice++;
        let url = BD.fazerQuery(Ferramenta.campos);
        BD.buscarRepositorios(url);
   }
}

export { tabela };