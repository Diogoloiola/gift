<?php

class Arquivo
{

	private $caminho; //Que vai ficar os arquivos
	private $repositorios; //nome do arquivo que sera baixado
	public function __construct()
	{	
		mkdir(__DIR__.'/zipados'); //criando a pasta
		$this->repositorios = 'repositorios1.zip'; //setando o valor nome do zip
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

	public function disponibilizar()
	{
		$caminhoCompleto = $this->caminho.'/'.$this->repositorios;
		$diretorios = scandir($this->caminho);
		array_shift($diretorios);
		array_shift($diretorios);
		$zip = new ZipArchive();
		if( $zip->open($caminhoCompleto, ZipArchive::CREATE)){
			foreach($diretorios as $file){
				$zip->addFile($this->caminho.'/'.$file, $file);
			}
			$zip->close();
		}
	}
}

$arq = new Arquivo();


for ($i=0; $i < count($_POST['dados']) ; $i++) { 
	$arq->getArquivos($_POST['dados'][$i]['nomeRepositorio'],$_POST['dados'][$i]['urlRepositorio']);
}

echo json_encode(true);

$arq->disponibilizar();

