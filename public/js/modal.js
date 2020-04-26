const modal = {
    setarDadosModal(mensagem){
        $('#meu-modal').modal('show');
		$('#conteudo-modal').html(mensagem);
    }
}
export{modal};