<?php  

	// resolve o problema de acessar arquivos externos para requisição AJAX
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");

	// incluindo arquivo de conexão com o banco de dados
	include("../../../inclusoes/conecta_banco_dados.php");

	$id = filter_var($_POST["id_agenda_facilitador"],FILTER_SANITIZE_NUMBER_INT);
	//$id = 1;
	if (!filter_var($id, FILTER_VALIDATE_INT)){
		echo "Erro no parâmetro ID!";
		exit();
	}
	//$id = 1;

	$sql = "DELETE FROM agenda_facilitador WHERE id_agenda_facilitador = '".$id."' ";

	if(!$conexao->query($sql)) 
	{
        printf("Erro: %s\n", $conexao->error);
    }
    else
    {
    	echo "OK";
    }

	$conexao -> close();

?>