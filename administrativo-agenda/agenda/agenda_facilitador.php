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

	<body onload="carrega_facilitador('<?php echo $_GET["id"]; ?>'), zerar_contador()">

		<?php include_once '../inclusoes/cabecalho_menu.php'; ?>


		<div id="conteudo">
			<div id="topo"></div>

			<div id="alerta-sucesso">
				<span id="alerta-sucesso-texto"></span>
				<div id="alerta-sucesso-fechar" onclick="fecha_alerta_sucesso()">&times;</div>
			</div>

			<div id="corpo_conteudo">

				<div id="topo_conteudo">
					<label id="titulo_conteudo">Agenda</label>
				</div>

				<div id="caminho">
					<a href="agenda.php">Agenda</a> -
					Facilitador /
					Novo
				</div>


				<div class="celula_metade">
				<?php
					$sql = "SELECT id_facilitador, nome 
						FROM facilitadores";
					$resultado = $conexao->query($sql);
					?>
					<label>Facilitadores *</label>

					<select name="facilitador" id="facilitador">
						<option value="">Selecione...</option>
						<?php while ($facilitador = mysqli_fetch_assoc($resultado)) { ?>
							<option value="<?php echo $facilitador['id_facilitador'] ?>"> <?php echo $facilitador['nome'] ?> </option>
						<?php } ?>
					</select>
					<span class="alerta_formulario" id="alerta_facilitador"></span>
				</div>

				<div class="celula_formulario_total">
					<input type="button" value="Cadastrar" id="botao_cadastrar" onclick="adicionar_facilitador()">
				</div>

				<div id="recipiente"></div>
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