<!DOCTYPE html>
<html>

<head>
	<title>VF Consultoria - Área Administrador</title>
	<link rel="stylesheet" type="text/css" href="css/admin.css">
	<meta charset="UTF-8">
	<meta name="author" content="Pentaxial">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- <link rel="shortcut icon" href="imagens/fav.ico" type="image/x-icon"> -->
</head>

<body onload="pega_parametros_url()">

	<div id="alerta-autenticacao">Para acessar o sistema é necessário se autenticar.</div>
	<div id="alerta-nao-cadastrado">O email não esta cadastrado em nosso sistema!</div>
	<div id="alerta-sessao-finalizada">Sessão finalizada com sucesso!</div>

	<div id="recipiente">

		<img src="../imagens/logo.png">

		<form action="servico/autenticacao_usuarios/autenticacao_usuarios.php" method="post">
			<h1>Autenticação de Usuários</h1>
			<label>E-mail:</label>
			<input type="text" id="email" name="email" required="true" maxlength="100">
			<div id="mensagem_email"></div>
			<label>Senha:</label>
			<input type="password" name="senha" id="senha" maxlength="20">
			<div id="mensagem_senha"></div>
			<input type="submit" value="Entrar">
		</form>
	</div>

	<!-- Verificando se o JavaScript está habilitado no navegador do usuário -->
	<noscript>
		<div id="alerta">Habilite o JavaScript de seu navegador para utilizar o sistema!</div>
	</noscript>

	<script type="text/javascript" src="javascript/autenticacao_usuarios.js"></script>

</body>

</html>