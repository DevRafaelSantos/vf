<?php

session_start();

include("../inclusoes/conecta_banco_dados.php");


if (isset($_SESSION["usuario"])) {

?>

<!DOCTYPE html>
<html>

<head>
	<title>Adicionar Novo Facilitadores</title>
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
				<label id="titulo_conteudo">Facilitadores</label>
			</div>

			<div id="caminho">
				<a href="facilitadores.php">Facilitadores</a> /
				Novo
			</div>

			<div class="celula_metade">
				<label>Nome *</label>
				<input type="text" name="nome" id="nome" maxlength="200">
				<span class="alerta_formulario" id="alerta_nome"></span>
			</div>

			<div class="celula_metade">
				<label>Cargo *</label>
				<input type="text" name="cargo" id="cargo" maxlength="200">
				<span class="alerta_formulario" id="alerta_cargo"></span>
			</div>

			<div class="celula_metade">
				<label>LinkedIn *</label>
				<input type="text" name="linkedin" id="linkedin" maxlength="80">
				<span class="alerta_formulario" id="alerta_linkedin"></span>
			</div>

			<div class="celula_metade">
				<label>Descrição *</label>
				<textarea name="descricao" id="descricao" cols="30" rows="10" maxlength="170" placeholder="Descrição curta no máximo 170 caracteres"></textarea>
				<span class="alerta_formulario" id="alerta_descricao"></span>
			</div>

			<div class="celula_formulario_total">
				<input type="button" value="Cadastrar" id="botao_cadastrar" onclick="cadastrar()">
			</div>

		</div>
	</div>

	<script type="text/javascript" src="../javascript/facilitadores.js" async></script>
</body>

</html>

<?php

} else {
	header("Location: ../index.php?usuario=nao_autenticado");
}

?>