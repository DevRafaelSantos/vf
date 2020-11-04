<?php

	// resolve o problema de acessar arquivos externos para requisição AJAX
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");

	// incluindo arquivo de conexão com o banco de dados
	include("../../../inclusoes/conecta_banco_dados.php");

	$id = filter_var($_POST["id"],FILTER_SANITIZE_NUMBER_INT);

	if (!filter_var($id, FILTER_VALIDATE_INT)){
		echo "Erro no parâmetro ID!";
		exit();
	}

	$nome =  filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $senha = filter_var($_POST['senha'], FILTER_SANITIZE_STRING);
	
	if ($senha == "") {
		$sql = "UPDATE usuarios SET nome='" . $nome . "', email='" . $email . "'
			WHERE id_usuarios = " . $id . "";
	}else{
		$senha_criptografada = password_hash($senha, PASSWORD_DEFAULT);
 	$sql = "UPDATE usuarios SET nome='" . $nome . "', email='" . $email . "', senha='" . $senha_criptografada . "'
			WHERE id_usuarios = " . $id . "";
	}

	if (!$conexao->query($sql)) {
		printf("Erro: %s\n", $conexao->error);
	} else {
		echo "OK";
	}

	$conexao->close();
?>