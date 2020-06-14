import { BD } from './BD.js';
import { Ferramenta } from './Ferramenta.js';
let tabela = {
    tamanho: 0,
    criaLinha(dados, id) {
        let dataFinal = dados.created_at.slice(0, 10);
        const linha = document.createElement('tr');
        const coluna1 = document.createElement('td');
        const coluna2 = document.createElement('td');
        const coluna3 = document.createElement('td');
        const select = document.createElement('select');

        coluna1.id = `nome-${id}`;
        coluna1.innerHTML = dados.full_name;

        coluna2.innerHTML = dataFinal

        select.id = `op-${id}`;

        coluna3.appendChild(select)

        linha.appendChild(coluna1)
        linha.appendChild(coluna2)
        linha.appendChild(coluna3)
        return linha;
    },
    voltarFormulario() {
        $('#tabela').hide();
        $('#conteudo-tabela').html('');
        $('#formulario').fadeIn(500);
    },
    criaOption(dados, id, url) {

        const select = document.querySelector(`#op-${id}`);
        const optionVazio = document.createElement('option');

        optionVazio.value = '';
        optionVazio.innerHTML = 'Selecione'

        select.appendChild(optionVazio);

        if (dados.length) {
            dados.forEach(informacao => {
                console.log(informacao)
                const opiton = document.createElement('option');
                opiton.value = url + `/archive/${informacao.tag_name}.zip`;
                opiton.innerHTML = informacao.tag_name;
                select.appendChild(opiton);
            })
        } else {
            const opiton = document.createElement('option');
            opiton.value = url + '/archive/master.zip';
            opiton.innerHTML = 'Master';
            select.appendChild(opiton);
        }
    },
    retroceder() {
        if (BD.indice - 1 <= 0) {
            alert('Não pode voltar');
        } else {
            $('#conteudo-tabela').html('');
            BD.indice--;
            let url = BD.fazerQuery(Ferramenta.campos);
            BD.consultarApi(url);
        }
    },
    avancar() {
        $('#conteudo-tabela').html('');
        BD.indice++;
        let url = BD.fazerQuery(Ferramenta.campos);
        BD.consultarApi(url);
    }
}

export { tabela };