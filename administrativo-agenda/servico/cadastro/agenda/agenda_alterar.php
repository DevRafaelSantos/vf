<?php

// resolve o problema de acessar arquivos externos para requisição AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// incluindo arquivo de conexão com o banco de dados
include("../../../inclusoes/conecta_banco_dados.php");

$id = filter_var($_POST["id"], FILTER_SANITIZE_NUMBER_INT);

if (!filter_var($id, FILTER_VALIDATE_INT)) {
	echo "Erro no parâmetro ID!";
	exit();
}
#selecionar foto no banco para se for alterar
$sql_apagar_foto = "SELECT imagem_principal, imagem_secundaria FROM agenda WHERE id_agenda = " . $id . "";
$resultado = $conexao->query($sql_apagar_foto);
$registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);

$imagem_banco = $registro['imagem_principal'];
$imagem_secundaria_banco = $registro['imagem_secundaria'];

$nome =  filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
$categoria = filter_var($_POST['categoria'], FILTER_SANITIZE_STRING);
$local = filter_var($_POST['local'], FILTER_SANITIZE_STRING);
$sobre = filter_var($_POST['sobre'], FILTER_SANITIZE_STRING);

if ($local == "Físico") {
	$localidade = filter_var($_POST['localidade'], FILTER_SANITIZE_STRING);
	$cep = filter_var($_POST['cep'], FILTER_SANITIZE_STRING);
	$endereco = filter_var($_POST['endereco'], FILTER_SANITIZE_STRING);
	$numero = filter_var($_POST['numero'], FILTER_SANITIZE_STRING);
	$bairro = filter_var($_POST['bairro'], FILTER_SANITIZE_STRING);
	$cidade = filter_var($_POST['cidade'], FILTER_SANITIZE_STRING);
	$estado = filter_var($_POST['estado'], FILTER_SANITIZE_STRING);
	$complemento = filter_var($_POST['complemento'], FILTER_SANITIZE_STRING);
	$google_maps = filter_var($_POST['google_maps'], FILTER_SANITIZE_STRING);
	$data = filter_var($_POST['data'], FILTER_SANITIZE_STRING);
	$horario = filter_var($_POST['horario'], FILTER_SANITIZE_STRING);

	// upload imagem
	if ((isset($_FILES['foto_logo']['name']) && $_FILES["foto_logo"]["error"] == 0) && (isset($_FILES['foto_logo_secundaria']['name']) && $_FILES["foto_logo_secundaria"]["error"] == 0)) {
		// seleciona o fuso horário correto
		// fazendo isso pra gerar nome aleatório da imagem
		date_default_timezone_set('America/Sao_Paulo');
		$criado_em = date("Y-m-d H:i:s") . $nome;
		$hash = md5($criado_em) . "principal";

		if ($_FILES["foto_logo"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo"]["type"] == "image/png") {
			$extensao = ".png";
		}

		$novo_nome_imagem = $hash . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome_imagem);

		if (move_uploaded_file($_FILES["foto_logo"]["tmp_name"], $target_file)) {
		} else {
		}


		if ($_FILES["foto_logo_secundaria"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo_secundaria"]["type"] == "image/png") {
			$extensao = ".png";
		}
		$hash_banner = md5($criado_em) . "secundaria";
		$novo_nome = $hash_banner . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome);

		move_uploaded_file($_FILES["foto_logo_secundaria"]["tmp_name"], $target_file);


		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "', sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "', imagem_principal='" . $novo_nome_imagem . "', imagem_secundaria='" . $novo_nome . "'
			WHERE id_agenda= '" . $id . "'";
	} else if (isset($_FILES['foto_logo']['name']) && $_FILES["foto_logo"]["error"] == 0) {
		// seleciona o fuso horário correto
		// fazendo isso pra gerar nome aleatório da imagem
		date_default_timezone_set('America/Sao_Paulo');
		$criado_em = date("Y-m-d H:i:s") . $nome;
		$hash = md5($criado_em) . "principal";

		if ($_FILES["foto_logo"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo"]["type"] == "image/png") {
			$extensao = ".png";
		}

		$novo_nome_imagem = $hash . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome_imagem);

		if (move_uploaded_file($_FILES["foto_logo"]["tmp_name"], $target_file)) {
		} else {
		}


		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "', sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "', imagem_principal='" . $novo_nome_imagem . "'
			WHERE id_agenda= '" . $id . "'";
	} else if (isset($_FILES['foto_logo_secundaria']['name']) && $_FILES["foto_logo_secundaria"]["error"] == 0) {
		// seleciona o fuso horário correto
		// fazendo isso pra gerar nome aleatório da imagem
		date_default_timezone_set('America/Sao_Paulo');
		$criado_em = date("Y-m-d H:i:s") . $nome;
		$hash_banner = md5($criado_em) . "secundaria";
		if ($_FILES["foto_logo_secundaria"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo_secundaria"]["type"] == "image/png") {
			$extensao = ".png";
		}
		
		$novo_nome = $hash_banner . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome);

		move_uploaded_file($_FILES["foto_logo_secundaria"]["tmp_name"], $target_file);


		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "', sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "', imagem_secundaria='" . $novo_nome . "'
			WHERE id_agenda= '" . $id . "'";
	} else {

		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "', sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "'
			WHERE id_agenda= '" . $id . "'";
	}
	if (!$conexao->query($sql)) {
		printf("Erro: %s\n", $conexao->error);
	} else {
		echo "OK";
		if (!empty($imagem_banco) && !empty($novo_nome_imagem)) {
			unlink("../../../uploads/" . $imagem_banco);
		}
		if (!empty($imagem_secundaria_banco) && !empty($novo_nome)) {
			unlink("../../../uploads/" . $imagem_secundaria_banco);
		}
	}
} else {
	$localidade = Null;
	$endereco = filter_var($_POST['endereco'], FILTER_SANITIZE_STRING);
	$numero = Null;
	$bairro = Null;
	$cidade = Null;
	$estado = Null;
	$complemento = Null;
	$google_maps = Null;
	$data = filter_var($_POST['data'], FILTER_SANITIZE_STRING);
	$horario = filter_var($_POST['horario'], FILTER_SANITIZE_STRING);

	// upload imagem
	if ((isset($_FILES['foto_logo']['name']) && $_FILES["foto_logo"]["error"] == 0) && (isset($_FILES['foto_logo_secundaria']['name']) && $_FILES["foto_logo_secundaria"]["error"] == 0)) {
		// seleciona o fuso horário correto
		// fazendo isso pra gerar nome aleatório da imagem
		date_default_timezone_set('America/Sao_Paulo');
		$criado_em = date("Y-m-d H:i:s") . $nome;
		$hash = md5($criado_em) . "principal";

		if ($_FILES["foto_logo"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo"]["type"] == "image/png") {
			$extensao = ".png";
		}

		$novo_nome_imagem = $hash . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome_imagem);

		if (move_uploaded_file($_FILES["foto_logo"]["tmp_name"], $target_file)) {
		} else {
		}


		if ($_FILES["foto_logo_secundaria"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo_secundaria"]["type"] == "image/png") {
			$extensao = ".png";
		}
		$hash_banner = md5($criado_em) . "secundaria";
		$novo_nome = $hash_banner . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome);

		move_uploaded_file($_FILES["foto_logo_secundaria"]["tmp_name"], $target_file);

		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "',  sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "', imagem_principal='" . $novo_nome_imagem . "', imagem_secundaria='" . $novo_nome . "'
			WHERE id_agenda= '" . $id . "'";
	} else if (isset($_FILES['foto_logo']['name']) && $_FILES["foto_logo"]["error"] == 0) {
		// seleciona o fuso horário correto
		// fazendo isso pra gerar nome aleatório da imagem
		date_default_timezone_set('America/Sao_Paulo');
		$criado_em = date("Y-m-d H:i:s") . $nome;
		$hash = md5($criado_em) . "principal";

		if ($_FILES["foto_logo"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo"]["type"] == "image/png") {
			$extensao = ".png";
		}

		$novo_nome_imagem = $hash . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome_imagem);

		if (move_uploaded_file($_FILES["foto_logo"]["tmp_name"], $target_file)) {
		} else {
		}


		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "',  sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "', imagem_principal='" . $novo_nome_imagem . "'
			WHERE id_agenda= '" . $id . "'";
	} else if (isset($_FILES['foto_logo_secundaria']['name']) && $_FILES["foto_logo_secundaria"]["error"] == 0) {
		// seleciona o fuso horário correto
		// fazendo isso pra gerar nome aleatório da imagem
		date_default_timezone_set('America/Sao_Paulo');
		$criado_em = date("Y-m-d H:i:s") . $nome;
		$hash_banner = md5($criado_em) . "secundaria";
		
		if ($_FILES["foto_logo_secundaria"]["type"] == "image/jpeg") {
			$extensao = ".jpg";
		} else if ($_FILES["foto_logo_secundaria"]["type"] == "image/png") {
			$extensao = ".png";
		}
		
		$novo_nome = $hash_banner . $extensao;

		$target_dir = "../../../uploads/";
		$target_file = $target_dir . basename($novo_nome);

		move_uploaded_file($_FILES["foto_logo_secundaria"]["tmp_name"], $target_file);


		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "',  sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "', imagem_secundaria='" . $novo_nome . "'
			WHERE id_agenda= '" . $id . "'";
	} else {

		$sql = "UPDATE  agenda SET nome ='" . $nome . "', categoria='" . $categoria . "',  sobre='" . $sobre . "', local ='" . $local . "', localidade='" . $localidade . "', cep ='" . $cep . "', endereco='" . $endereco . "', 
			numero='" . $numero . "', bairro='" . $bairro . "', cidade ='" . $cidade . "', estado='" . $estado . "', complemento ='" . $complemento . "', google_maps ='" . $google_maps . "', 
			data ='" . $data . "', horario='" . $horario . "'
			WHERE id_agenda= '" . $id . "'";
	}
	if (!$conexao->query($sql)) {
		printf("Erro: %s\n", $conexao->error);
	} else {
		echo "OK";
		if (!empty($imagem_banco) && !empty($novo_nome_imagem)) {
			unlink("../../../uploads/" . $imagem_banco);
		}
		if (!empty($imagem_secundaria_banco) && !empty($novo_nome)) {
			unlink("../../../uploads/" . $imagem_secundaria_banco);
		}
	}
}


// if (!$conexao->query($sql)) {
// 	printf("Erro: %s\n", $conexao->error);
// } else {
// 	echo "OK";
// }

$conexao->close();
