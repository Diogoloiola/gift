import {BD} from './BD.js';
const Ferramenta = {
	campos: document.querySelectorAll('.form-control'),
	load(){
		document.querySelector('#pesquisar-repositorio').onclick = this.processarDados.bind(this);
		document.querySelector('#baixar-selecionado').onclick = this.processaRepositorios.bind(this);
		document.querySelector('#voltar').onclick = this.voltarFormulario;
	},
	setarDadosModal(mensagem){
		$('#meu-modal').modal('show');
		$('#conteudo-modal').html(mensagem);
	},
	processarDados(e){
		e.preventDefault();
		BD.fazerQuery(this.campos);
		BD.fazerConsulta(this);
	},
	listarDados(dados){
		dados.items.forEach(valor =>{
			let valores = `
			<tr>
			<td>${valor.full_name}</td>
			<td>${valor.created_at}</td>
			<td><input type="checkbox" name="teste" class="teste" value="${valor.html_url+'/archive/master.zip'}"></td>
			<td><button class="btn btn-default btn-copiar" data-valor="${valor.clone_url}">Copiar</button></td>
			</tr>
			`;
			$('#conteudo-tabela').append(valores);
		})
	},
	processaRepositorios(){
		let repositotios = [];
		$.each($('.teste:checked'), (indice, valor)=>{
			repositotios.push(this.repositorioFactory(valor.value));
		});
		BD.baixarRepositorio(repositotios);
	},
	repositorioFactory(urlRepositorio){
		return{
			nomeRepositorio: urlRepositorio.replace('https://github.com/', '').replace('/archive/master.zip','').replace('/', ''),
			urlRepositorio
		}
	},
	voltarFormulario(){
		$('#tabela').hide();
		$('#conteudo-tabela').html('');
		$('#formulario').fadeIn(500);
	}
};
$('body').on('click', '[data-valor]', function(e){
	console.log($(this).data());
}) 
Ferramenta.load();
export{Ferramenta};