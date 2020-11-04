<?php
	
	//$conexao = mysqli_connect("localhost","evoestag_ptx","{OAK=MDEUvDt","evoestag_sistema");
	$conexao = mysqli_connect("localhost","root","mysql","vf_agenda");

	// Verificando a conexão
	if(mysqli_connect_errno()) 
	{
  		echo "Falha ao conectar ao MySQL: " . mysqli_connect_error();
  		exit();
	}
	// alterar o conjunto de caracteres para utf8
	$conexao->set_charset("utf8");
	
?>