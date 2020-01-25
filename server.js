const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const baixarArquivo = require('./controllers/baixarArquivo');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res)=>{
	res.render('index.ejs');
});

app.post('/dados', (req, res)=>{
	let cont = 0;
	for (var key in req.body) {
		let dados = req.body[key];
		 let flag = baixarArquivo(dados);
	}
	console.log('oi');
});

app.listen(3000,()=>console.log('servidor rodando na porta 3000'));
