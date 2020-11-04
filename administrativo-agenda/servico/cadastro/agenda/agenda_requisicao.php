<?php  

	// resolve o problema de acessar arquivos externos para requisição AJAX
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");

	// incluindo arquivo de conexão com o banco de dados
	include("../../../inclusoes/conecta_banco_dados.php");

	$id = filter_var($_POST["id"],FILTER_SANITIZE_NUMBER_INT);
	// $id = 5;
	if (!filter_var($id, FILTER_VALIDATE_INT)){
		echo "Erro no parâmetro ID!";
		exit();
	}
	//$id = 1;

	
	$sql = "SELECT id_agenda, nome, categoria, sobre, local, localidade, cep, endereco, numero, bairro, cidade, estado,
			complemento, google_maps, data, horario, imagem_principal, imagem_secundaria
			FROM agenda WHERE id_agenda = '".$id."' ";
	$resultado = $conexao->query($sql);

	
	$quantidade_registro = $resultado->num_rows;
	for	($i = 0; $i < $quantidade_registro; $i++){
		
		$registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);

		$dados[$i]["id_agenda"] = $registro["id_agenda"];
		$dados[$i]["nome"] = $registro["nome"];
		$dados[$i]["categoria"] = $registro["categoria"];
		$dados[$i]["sobre"] = $registro["sobre"];
		$dados[$i]["local"] = $registro["local"];
		$dados[$i]["localidade"] = $registro["localidade"];
		$dados[$i]["cep"] = $registro["cep"];
		$dados[$i]["endereco"] = $registro["endereco"];
		$dados[$i]["numero"] = $registro["numero"];
		$dados[$i]["bairro"] = $registro["bairro"];
		$dados[$i]["cidade"] = $registro["cidade"];
		$dados[$i]["estado"] = $registro["estado"];
		$dados[$i]["complemento"] = $registro["complemento"];
		$dados[$i]["google_maps"] = $registro["google_maps"];
		$dados[$i]["data"] = $registro["data"];
		$dados[$i]["horario"] = $registro["horario"];
		$dados[$i]["imagem_principal"] = $registro["imagem_principal"];
		$dados[$i]["imagem_secundaria"] = $registro["imagem_secundaria"];
	}

	// imprimindo todos usuários

	echo json_encode($dados);

    $conexao -> close();

?>