$(document).ready(()=>{


	$('#pesquisar').click(e =>{
		e.preventDefault();
		let inputs = document.querySelectorAll('input');
		let complementoQuery = bindQuery(inputs);
		let quantRepositorios = inputs[11].value == '' ? 100 : inputs[11].value;
		let query = `https://api.github.com/search/repositories?q=${complementoQuery}&sort=stars&order=desc&page=1&per_page=${quantRepositorios}`;
		fechtAll(query);	
	});

	$('#voltar').click(e=>{
		$('#tabela').hide();
		$('#conteudo-tabela').html('');
		$('#fomrulario').fadeIn(500);
		$('#voltar').hide();
	});

	function bindQuery(campos){
		let string = '';
		for (let i = 0; i < campos.length; i++) {
			if (i == 0 && campos[i].value != '') {
				string += `${campos[i].value} in:name+`;
			}else if(i == 1 && campos[i].value != ''){
				string += `user:${campos[i].value}+`;
			}else if(i == 2 && campos[i].value != ''){
				string += `language:${campos[i].value}+`;
			}else if(i == 3 && campos[i].value != ''){
				string += `forks:${campos[i].value}+`;
			}else if(i == 4 && campos[i].value != ''){
				string += `size:>${form[i].value}`;
			}else if(i == 5 && campos[i].value != ''){
				string += `stars:>${campos[i].value}+`;
			}else if(i == 6 && campos[i].value != ''){
				string += `topic:${campos[i].value}+`;
			}else if(i == 7 && campos[i].value != ''){
				string += `pushed:${campos[i].value}+`;
			}else if(i == 8 && campos[i].value){
				string += `org: ${campos[i].value}+`;
			}else if(i == 9 && campos[i].value){
				string += `followers:${campos[i].value}+`;
			}else if(i == 10 && campos[i].value){
				string += `good-first-issues:>${campos[i].value}`;
			}
		}
		return string;
	}


	function fechtAll(query){
		 $.ajax(
		 {
			url: query,
			beforeSend: function(){
				$('#fomrulario').fadeOut(500);
				$('#overlay').show();
			},
			success: function(result){
				console.log(result)
	        	result.items.forEach(valor =>{
           		let valores = `
		         	<tr>
		         		<td>${valor.full_name}</td>
		         		<td>${valor.created_at}</td>
		         		<td>${valor.description}</td>
		         		<td><a href="${valor.html_url+'/archive/master.zip'}">Baixar</a></td>
		         	</tr>
		         `;
		         $('#conteudo-tabela').append(valores);
	            })
	        },
        	complete: function(){
        		$('#overlay').hide();
        		$('#tabela').show();
        		$('#voltar').show();
        	}
    	 });
	}
})