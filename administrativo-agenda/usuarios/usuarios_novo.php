<?php

session_start();

require_once '../configuracao/permissao.php';


if (isset($_SESSION["usuario"])) {

?>

	<!DOCTYPE html>
	<html>

	<head>
		<title>Adicionar Novo Usuário</title>
		<link rel="stylesheet" type="text/css" href="../css/usuarios_novo.css">
		<link rel="shortcut icon" href="../imagens/fav.ico" type="image/x-icon">
		<meta charset="UTF-8">
		<meta name="author" content="Pentaxial">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>

	<body>

		<?php include_once '../inclusoes/cabecalho_menu.php'; ?>


		<div id="conteudo">
			<div id="topo"></div>
			<div id="corpo_conteudo">

				<div id="topo_conteudo">
					<label id="titulo_conteudo">Usuário</label>
				</div>

				<div id="caminho">
					<a href="usuarios.php">Usuário</a> /
					Novo
				</div>

				<div class="celula_metade">
					<label>Nome *</label>
					<input type="text" name="nome" id="nome">
					<span class="alerta_formulario" id="alerta_nome"></span>
				</div>

				<div class="celula_metade">
					<label>E-mail *</label>
					<input type="email" name="email" id="email" maxlength="150" required>
					<span class="alerta_formulario" id="alerta_email"></span>
				</div>

				<div class="celula_metade">
					<label>Senha *</label>
					<input type="password" name="senha" id="senha" maxlength="20" required>
					<span class="alerta_formulario" id="alerta_senha"></span>
				</div>

				<div class="celula_formulario_total">
					<input type="button" value="Cadastrar" id="botao_cadastrar" onclick="cadastrar()">
				</div>

			</div>
		</div>

		<script type="text/javascript" src="../javascript/usuarios.js" async></script>
	</body>

	</html>

<?php

} else {
	header("Location: ../index.php?usuario=nao_autenticado");
}

?>