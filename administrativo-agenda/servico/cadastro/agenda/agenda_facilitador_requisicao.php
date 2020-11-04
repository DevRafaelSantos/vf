<?php  

	// resolve o problema de acessar arquivos externos para requisição AJAX
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");
	//header("Content-Type: application/json; charset=UTF-8");

	// incluindo arquivo de conexão com o banco de dados
	include("../../../inclusoes/conecta_banco_dados.php");

	$id = filter_var($_POST["id"],FILTER_SANITIZE_NUMBER_INT);
	//$id = 1;
	if (!filter_var($id, FILTER_VALIDATE_INT)){
		echo "Erro no parâmetro ID!";
		exit();
	}
	//$id = 1;

	$sql = "SELECT c.nome, a.id_agenda_facilitador
	FROM agenda_facilitador a
	JOIN agenda b
	ON a.fk_id_agenda = b.id_agenda
	JOIN facilitadores c
	ON a.fk_id_facilitador = c.id_facilitador
	WHERE b.id_agenda = '".$id."'";
	$resultado = $conexao->query($sql);


	$quantidade_registro = $resultado->num_rows;
	for	($i = 0; $i < $quantidade_registro; $i++){
		
		$registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);

		$dados[$i]["id_agenda_facilitador"] = $registro["id_agenda_facilitador"];
		$dados[$i]["nome"] = $registro["nome"];
	}

	//var_dump($registro);
	// imprimindo todos usuários


	echo json_encode($dados);

	//echo json_last_error_msg();

    $conexao -> close();

?>