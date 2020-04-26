import {modal} from './modal.js';

const validador = {
    validarCampos(campos){
        if(campos[0].value == ''){
            modal.setarDadosModal('Preciso de uma linguagem para pesquisar os dados');
        }
        return 1;
    }
}

export {validador};