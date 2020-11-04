<?php
session_start();
//ob_start();

// ajustando cabeçalho PHP para aceitar conjunto de caracteres UTF-8
header("Content-Type: text/html; charset=utf-8");

// incluindo arquivo de conexão com o banco de dados
include("../../inclusoes/conecta_banco_dados.php");

$email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
$senha = filter_var($_POST["senha"], FILTER_SANITIZE_STRING);

if ($email == "") {
	echo "Favor informar o e-mail!";

	header("Location:../../index.php?resposta=email_vazio");
} else {
	$email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
	//var_dump($email);

	if ($email == false) {
		echo "Favor informar um e-mail válido!";

		header("Location: ../../index.php?resposta=email_invalido");
	} else {
		if ($senha == "") {
			echo "Favor informar a senha!";

			header("Location: ../../index.php?resposta=senha_vazia&email=" . $email);
		} else {
			// criptografando senha para testar no banco
			//$senha_criptografada = md5($senha);

			// criando consulta SQL
			$sql = "SELECT id_usuario, nome, email, senha FROM usuarios 
						WHERE email ='" . $email . "'";
			$resultado = $conexao->query($sql);
			$total = mysqli_num_rows($resultado);
			if ($total) {
				$dados = mysqli_fetch_array($resultado);

				// verificando ser a senha digitada é igual ao do banco de dados
				if (password_verify($senha, $dados['senha'])) {

					// iniciando as sessões
					$_SESSION["usuario"] = $email;
					$_SESSION["id_usuarios"] = $dados["id_usuarios"];
					$_SESSION["nome"] = $dados["nome"];
					// echo $email;
					// var_dump(password_verify($senha, $dados['senha']));
					header("Location: ../../usuarios/usuarios.php");
				} else {
					header("Location:../../index.php?resposta=senha_invalida&email=" . $email);
				}
			} else {
				header("Location:../../index.php?resposta=email_nao_cadastrado");
			}
		}
	}
}
//ob_end_flush();
$conexao->close();
