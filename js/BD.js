const BD = {
	linkApi: 'https://api.github.com/search/repositories',
	complentoLink: '',
	condicionais:[
	'language:', 'forks:>=', 'size:>=', 'license:', 'stars:>=', 'topic:',
	'created:>=', '&page=1&per_page=', 'good-first-issues:>'
	],
	fazerQuery(campos){
		let i = 0;
		let string = '?q='
		campos.forEach(campo=>{
			if (campo.value !='' && i === 6) {
				let ano = new Date().getFullYear() - parseInt(campo.value);
				string += this.condicionais[i] + `${ano}-01-01 `;
			}else if (campo.value != '' && i === 7){
				let quantidadeRepositorios = campo.value == '' ? 100 : campo.value;
				string += this.condicionais[i] + quantidadeRepositorios + ' ';
			}else if(campo.value != ''){
				string += this.condicionais[i] + campo.value + ' ';
			}
			i++;
		})
		this.complentoLink =  string;
	},
	fazerConsulta(ferramenata){
		$.ajax({
			url: this.linkApi + this.complentoLink,
			beforeSend: function () {
				$('#formulario').fadeOut(500);
				$('#overlay').show();
			},
			success: function (resultados) {
				ferramenata.listarDados(resultados);
			},
			complete: function () {
				$('#overlay').hide();
				$('#tabela').show();
			}
		})
	},
	baixarRepositorio(dados){
		$.ajax({
			url: 'php/Arquivos.php',
			type: 'POST',
			data: {
				dados
			},
			dataType: 'json',
			success(dados){
				console.table(dados);
			},
			error(dados){
				alert(dados.responseText);
			}
		})
	}
}
export{BD};