<?php

class Arquivo
{

	private $caminho; //Que vai ficar os arquivo
	public function __construct()
	{	
		$this->caminho = __DIR__.'/zipados';
	}

	public function getArquivos($nomeRepositorio,$url)
	{
		$nome = $nomeRepositorio.'.zip';
		$caminho = $this->caminho . DIRECTORY_SEPARATOR . $nome;

		if (function_exists('curl_exec')) {
			$fp = fopen($caminho, 'w');
			$ch = curl_init($url);
			curl_setopt($ch, CURLOPT_FILE, $fp);
			$success = curl_exec($ch) && curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
			fclose($fp);
			curl_close($ch);

		}elseif (ini_get('allow_url_fopen')) {
			$success = copy($url, $caminho);
		}
	}
}

$arq = new Arquivo();


for ($i=0; $i < count($_POST['dados']) ; $i++) { 
	$arq->getArquivos($_POST['dados'][$i]['nomeRepositorio'],$_POST['dados'][$i]['urlRepositorio']);
}

echo json_encode(true);

