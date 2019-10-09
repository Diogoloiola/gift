$(document).ready(()=>{

	function BD(){
		let that = this;
		that.fields = document.querySelectorAll('.form-control');
		that.linkApi = 'https://api.github.com/search/repositories';
		that.complementQuery = '';
		that.dataQuerys = 
		[
			' in:name', 'user:', 'language:', 'forks:','size:>=','license:','stars:>=', 'topic:', 
				'','org:', 'followers:>','fork:',
			  'good-first-issues:>','&page=1&per_page=' 
		];
		that.dataRepository = '';
		that.bindQuery = function(){
			let string = '?q=';
			let i = 0;
			that.fields.forEach(field=>{
				if(field.value !== '') string += that.dataQuerys[i] + `${field.value} `;
				i++;
			});
			that.complementQuery = string;
		};
		that.fetchAll = function(e){
			e.preventDefault();
			that.bindQuery();
			 $.ajax(
			 {
				url: that.linkApi + that.complementQuery,
				beforeSend: function(){
					ferramenta.beforeSend();
				},
				success: function(result){
		        	ferramenta.listDate(result);
		        },
	        	complete: function(result){
	        		ferramenta.afterShipping(result);
	        	}
	    	 });
		}
	}

	function Ferramenta(){
		let that = this;
		that.load = function(){
			document.querySelector('#pesquisar').onclick = banco.fetchAll;
			document.querySelector('#voltar').onclick = ferramenta.backToForm;
		}
		that.listDate = function(data){
			data.items.forEach(valor =>{
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
		}
		that.setDataModal = function(msg){
			$('#modal').modal('show');
			$('#conteudo-modal').html(msg);
		}
		that.afterShipping = function(data){
			if (data.responseJSON.total_count == 0) {
				that.setDataModal('Nenhum dado foi encontrado com esses parâmetros');
				$('#fomrulario').fadeIn(500);
				$('#overlay').hide();
			}else{
				$('#overlay').hide();
        		$('#tabela').show();
        		$('#voltar').show();
			}
		}
		that.backToForm = function(){
			$('#tabela').hide();
			$('#conteudo-tabela').html('');
			$('#fomrulario').fadeIn(500);
			$('#voltar').hide();
		}
		that.beforeSend = function(){
			$('#fomrulario').fadeOut(500);
			$('#overlay').show();
		}
	}	

	let banco = new BD();
	let ferramenta = new Ferramenta();
	ferramenta.load();
})