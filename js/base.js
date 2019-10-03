$(document).ready(()=>{
	$("#pesquisar").click((e)=>{

		
		$('#formulario').fadeOut(2000);
		e.preventDefault()

		let complementoQuery = bindQuery(document.querySelectorAll('input'));
		let query = `https://api.github.com/search/repositories?q=${complementoQuery}&sort=stars&order=desc`;
		console.log(query);
         $.ajax({url: query, success: function(result){
         $('#tabela').fadeIn(2000);
            result.items.forEach(valor =>{
           		let valores = `
		         	<tr>
		         		<td>${valor.full_name}</td>
		         		<td>${valor.created_at}</td>
		         		<td><a href="${valor.html_url+'/archive/master.zip'}">Baixar</a></td>
		         	</tr>
		         `;
		         $('#conteudo-tabela').append(valores);
            })
        }});

      });


	$("#pesquisarNovamente").click((e)=>{
		$('#tabela').fadeOut(2000);
		$('#conteudo-tabela').html('');
		$('#formulario').fadeIn(2000);
     });



	function bindQuery(form){
		
		let string = '';
		for(let i = 0; i < form.length;i++){
			if(i == 0 && form[i].value != ''){
				string += `${form[i].value} in name+`;
			}else if(i == 1 && form[i].value != ''){
				string += `user:${form[i].value}+`;
			}else if(i == 2 && form[i].value != ''){
				string += `language:${form[i].value}+`;
			}else if(i == 3 && form[i].value != ''){
				string += `forks:${form[i].value}+`;
			}else if(i == 4 && form[i].value != ''){
				string += `stars:${form[i].value}+`;
			}else if(i == 5 && form[i].value != ''){
				string += `size:${form[i].value}`;
			}
		}
		return string;
	}


});