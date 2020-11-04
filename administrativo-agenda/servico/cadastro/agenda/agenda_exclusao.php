<?php  

	// resolve o problema de acessar arquivos externos para requisição AJAX
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");

	// incluindo arquivo de conexão com o banco de dados
	include("../../../inclusoes/conecta_banco_dados.php");

	$id = filter_var($_POST["id"],FILTER_SANITIZE_NUMBER_INT);
	//$id = 1;
	if (!filter_var($id, FILTER_VALIDATE_INT)){
		echo "Erro no parâmetro ID!";
		exit();
	}
	//$id = 1;

	$sql_apagar_foto = "SELECT imagem_principal, imagem_secundaria FROM agenda WHERE id_agenda = " . $id . "";
	$resultado = $conexao->query($sql_apagar_foto);
	$registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);

	$imagem_banco = $registro['imagem_principal'];
	$imagem_secundaria_banco = $registro['imagem_secundaria'];

	$sql = "SELECT * from agenda_facilitador
		WHERE fk_id_agenda = " . $id . " ";
	$resultado = $conexao->query($sql);
	$quantidade_linha = mysqli_num_rows($resultado);

	if ($quantidade_linha > 0) {
		$sql = "DELETE FROM agenda_facilitador WHERE fk_id_agenda = '" . $id . "' ";
		
		if (!$conexao->query($sql)) {
			printf("Erro: %s\n", $conexao->error); 
			exit();
		}
	}

	

	$sql2 = "DELETE FROM agenda WHERE id_agenda = '".$id."' ";

	if(!$conexao->query($sql2)) 
	{
        printf("Erro: %s\n", $conexao->error);
    }
    else
    {
		echo "OK";
		if(!empty($imagem_banco)){
			unlink("../../uploads/".$imagem_banco);
		}
		if(!empty($imagem_secundaria_banco)){
			unlink("../../uploads/".$imagem_secundaria_banco);
		}
    }

	$conexao -> close();

?>