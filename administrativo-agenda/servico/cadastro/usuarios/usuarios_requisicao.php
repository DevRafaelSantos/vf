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

	
	$sql = "SELECT * FROM usuarios WHERE id_usuario = '".$id."'";
	$resultado = $conexao->query($sql);
	$registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);

	//var_dump($registro);
	// imprimindo todos usuários

	//echo json_encode($registro, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
	echo json_encode($registro);

	//echo json_last_error_msg();

    $conexao -> close();

?>