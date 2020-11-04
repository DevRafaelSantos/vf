<?php

session_start();

include("../inclusoes/conecta_banco_dados.php");


if (isset($_SESSION["usuario"])) {

?>

	<!DOCTYPE html>
	<html>

	<head>
		<title>Adicionar Nova Agenda</title>
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
					<label id="titulo_conteudo">Agenda</label>
				</div>

				<div id="caminho">
					<a href="agenda.php">Agenda</a> /
					Novo
				</div>


				<div class="celula_metade">
					<label>Nome *</label>
					<input type="text" name="nome" id="nome" maxlength="200">
					<span class="alerta_formulario" id="alerta_nome"></span>
				</div>

				<div class="celula_metade">
					<label>Categoria *</label>
					<select name="categoria" id="categoria">
						<option value="">Selecione...</option>
						<option value="Qualificações">Qualificações</option>
						<option value="Cursos Rápidos">Cursos Rápidos</option>
						<option value="Workshop">Workshop</option>
						<option value="Palestras">Palestras</option>
						<option value="Webinários">Webinários</option>
						<option value="Outros">Outros</option>
					</select>
					<span class="alerta_formulario" id="alerta_categoria"></span>
				</div>

				<div class="celula_metade">
					<label>Local *</label>
					<select name="local" id="local" onchange="criar_novos_campos()">
						<option value="">Selecione...</option>
						<option value="Físico">Físico</option>
						<option value="Online">Online</option>
					</select>
					<span class="alerta_formulario" id="alerta_local"></span>
				</div>

				<div class="celula_metade">
					<label>Sobre *</label>
					<textarea name="sobre" id="sobre" cols="30" rows="10" maxlength="700" placeholder="Descrição no máximo 700 caracteres"></textarea>
					<span class="alerta_formulario" id="alerta_sobre"></span>
				</div>

				<div id="corpo_recipiente" class="">
					<div id="recipiente"></div>
				</div>

				<div id="adicionados"></div>

				<div class="celula_formulario_total">
					<input type="button" value="Cadastrar" id="botao_cadastrar" onclick="cadastrar()">
				</div>

				<div class="celula_metade">
					<label>
						Obs.: <br>
						 - Imagem Principal: Tamanho de 1190 Largura X 378 Altura <br>
						 - Imagem Segundária:  Tamanho de 436 Largura X 334 Altura
					</label>
				</div>
			</div>
		</div>

		<script type="text/javascript" src="../javascript/agenda.js" async></script>
	</body>

	</html>

<?php

} else {
	header("Location: ../index.php?usuario=nao_autenticado");
}

?>