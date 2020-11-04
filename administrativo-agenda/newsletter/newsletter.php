<?php
session_start();

// incluindo arquivo de conexão com o banco de dados
include("../inclusoes/conecta_banco_dados.php");



// Recuperando o parametro busca pelo get
if (isset($_GET["busca"])) {

	$busca = filter_var($_GET["busca"], FILTER_SANITIZE_STRING);
} else {

	$busca = "";
}


// Recuperando o parametro pagina pelo get
if (isset($_GET['pagina'])) {

	$pagina = filter_var($_GET['pagina'], FILTER_SANITIZE_STRING);
} else {

	$pagina = 1;
}



// verificando ser o usuario esta pesquisando
if ($busca == "") {

	// codigo que sera executado ser o usuario não estiver pesquisando
	$sql = "SELECT  id_newsletter, nome, email FROM newsletter";
	$resultado = $conexao->query($sql);
	$total_registros = $resultado->num_rows;
} else {

	// codigo que sera executado ser o usuario  estiver pesquisando
	$sql = "SELECT id_newsletter, nome, email
	FROM newsletter
	WHERE nome LIKE '%" . $busca . "%' 
	OR email LIKE '%" . $busca . "%' 
	ORDER BY nome ASC";
	$resultado = $conexao->query($sql);
	$total_registros = $resultado->num_rows;
}




// Limite de registros por pagina
$limite = 10;

// deslocamento 'offset' para selecionar os registros
$deslocamento = ($pagina - 1) * $limite;

// Total de paginas
$total_paginas = ceil($total_registros / $limite);

// Quantidade de links visiveis
$quantidade_links = 1;


// verificando ser o usuario esta pesquisando |
// trazendo os registros do banco
if ($busca == '') {

	// codigo que sera executado ser o usuario não estiver pesquisando
	$sql_2 = "SELECT id_newsletter, nome, email FROM newsletter 
			ORDER BY nome ASC LIMIT " . $limite . " OFFSET " . $deslocamento . " ";
	$resultado_2 = $conexao->query($sql_2);
	$total_registros_2 = $resultado_2->num_rows;
} else {

	// codigo que sera executado ser o usuario  estiver pesquisando
	$sql_2 = "SELECT id_newsletter, nome, email
	FROM newsletter
	WHERE nome LIKE '%" . $busca . "%' 
	OR email LIKE '%" . $busca . "%' 
	ORDER BY nome ASC LIMIT " . $limite . " OFFSET " . $deslocamento . "";
	$resultado_2 = $conexao->query($sql_2);
	$total_registros_2 = $resultado_2->num_rows;
}


if (isset($_SESSION["usuario"])) {

?>

	<!DOCTYPE html>
	<html>

	<head>
		<title>Newsletter</title>
		<link rel="stylesheet" type="text/css" href="../css/usuarios.css">
		<link rel="shortcut icon" href="../../imagens/fav.ico" type="image/x-icon">
		<meta charset="UTF-8">
		<meta name="author" content="Pentaxial">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>

	<body onload="verifica_alerta()">

		<!-- <?php echo $busca; ?> -->

		<!-- Linha alterada por cesar 17092020-13:22 -->



		<div id="sobreposicao"></div>

		<div id="modal">
			<div id="caixa-mensagem">
				<div id="caixa-mensagem-titulo">Alerta</div>
				<div id="caixa-mensagem-fechar" onclick="fechar_modal()">&times;</div>
				<div id="caixa-mensagem-mensagem"></div>
				<input type="button" value="Confirmar" id="botao-confirmar">
				<input type="button" value="Cancelar" id="botao-cancelar" onclick="fechar_modal()">
			</div>
		</div>

		<?php
		include_once '../inclusoes/cabecalho_menu.php';
		?>

		<div id="conteudo">
			<div id="topo"></div>

			<div id="alerta-sucesso">
				<span id="alerta-sucesso-texto"></span>
				<div id="alerta-sucesso-fechar" onclick="fecha_alerta_sucesso()">&times;</div>
			</div>

			<div id="corpo_conteudo">

				<div id="topo_conteudo">
					<label id="titulo_conteudo">Newsletter</label>


					<!-- <a href="facilitadores_novo.php">
						<img src="../imagens/icone_mais.svg" id="icone_topo_conteudo">
					</a> -->

					<a href="newsletter.php">
						<img src="../imagens/icone_atualizar.svg" id="icone_topo_conteudo">
					</a>
				</div>

				<div id="caminho">
					Newsletter
				</div>

				<div id="pesquisar-recipiente">
					<input type="text" id="pesquisar" name="pesquisar" placeholder="Pesquisar..." value="<?php if ($busca <> "") echo $busca; ?>">
					<button id="botao_pesquisar" onclick="window.location='newsletter.php?busca=' + document.getElementById('pesquisar').value"></button>
				</div>
				<div id="tabela_responsiva">
					<table id="dados" class="sortable">
						<thead>

							<tr>
								<th>Nome</th>
								<th>E-mail</th>
								<th>Opção</th>
							</tr>
						</thead>
						<tbody>
							<?php

							if ($total_paginas == 0) {
								$total_paginas = 1;
							}

							if ($total_registros > 0) {

								for ($i = 0; $i < $total_registros_2; $i++) {
									// Laço de repetição de informações
									$registro = mysqli_fetch_array($resultado_2, MYSQLI_NUM);

							?>
									<tr>
										<td><?php echo $registro[1]; ?></td>
										<td><?php echo $registro[2]; ?></td>
										<td>
											<button id="botao_lixeira" onclick="confirma_exclusao_usuario(<?php echo $registro[0]; ?>)"></button>
										</td>
									</tr>
								<?php } ?>

							<?php } else { ?>
								<tr>
									<td colspan="3" style="text-align:center">
										Nenhum registro encontrado!
									</td>
								</tr>
							<?php } ?>
						</tbody>
					</table>
				</div>

				<!-- PAGINAÇÃO -->

				<div class="paginacao">

					<?php

					// script para criar os botões de avança

					$avanca_itens = $pagina - 1;

					// avança para a esquerda
					if ($avanca_itens >= 1) {
						$avanca_esquerda = $avanca_itens;
					} else {

						$avanca_esquerda = 1;
					}


					$avanca_itens = $pagina + 1;

					// avança para a esquerda
					if ($avanca_itens <= $total_paginas) {

						$avanca_direita = $avanca_itens;
					} else {

						$avanca_direita = $total_paginas;
					}




					?>


					<!-- verificando ser o $busca esta vazio -->
					<?php if ($busca == '') { ?>
						<!-- exibido a paginação sem o $busca -->
						<ul>
							<!-- Botão de voltar '<'-->
							<div class="ordenar_paginacao">
								<a href="<?php echo '?pagina=1'; ?>">
									<<</a> </div> <!-- Botão de voltar '<<' -->
										<div class="ordenar_paginacao">
											<a href="<?php echo '?pagina=' . $avanca_esquerda; ?>">
												<</a> </div> <!-- laço para exibir os registros -->
													<?php for ($i = $pagina - $quantidade_links; $i <= $pagina - 1; $i++) { ?>

														<?php if ($i >= 1) { ?>
															<div class="ordenar_paginacao">
																<a href="?pagina=<?php echo $i; ?>"><?php echo $i; ?></a>
															</div>
														<?php } ?>
													<?php } ?>


													<div class="ordenar_paginacao">
														<a class="paginacao-ativa" href="?pagina=<?php echo $i; ?>"><?php echo $pagina; ?></a>
													</div>

													<!-- laço para exibir os registros -->
													<?php for ($i = $pagina + 1; $i <= $pagina + $quantidade_links; $i++) { ?>

														<?php if ($i <= $total_paginas) { ?>

															<div class="ordenar_paginacao">
																<a href="?pagina=<?php echo $i; ?>"><?php echo $i; ?></a>
															</div>

														<?php } ?>
													<?php } ?>

													<!-- Botão de voltar '>'-->

													<div class="ordenar_paginacao">
														<a href="?pagina=<?php echo $avanca_direita; ?>">></a>
													</div>

													<!-- Botão de voltar '>>'-->
													<div class="ordenar_paginacao">
														<a href="?pagina=<?php echo $total_paginas; ?>">>></a>
													</div>
						</ul>

					<?php   } else { ?>

						<!-- exibido a paginação  com o  $busca -->

						<ul>
							<!-- Botão de voltar '<<'-->
							<div class="ordenar_paginacao">
								<a href="<?php echo '?pagina=1' . '&busca=' . $busca;; ?>">
									<<</a> </div> <!-- Botão de voltar '<'' -->
						<div class="ordenar_paginacao">
							<a href="<?php echo '?pagina=' . $avanca_esquerda . '&busca=' . $busca; ?>"><</a>
						</div>

						<!-- laço para exibir os registros -->
						<?php for ($i = $pagina - $quantidade_links; $i <= $pagina - 1; $i++) { ?>

							<?php if ($i >= 1) { ?>
								<div class="ordenar_paginacao">
									<a href="?pagina=<?php echo $i . '&busca=' . $busca; ?>"><?php echo $i; ?></a>
								</div>
							<?php } ?>
						<?php } ?>


						<div class="ordenar_paginacao">
							<a class="paginacao-ativa" href="?pagina=<?php echo $i . '&busca=' . $busca; ?>"><?php echo $pagina; ?></a>
						</div>

						 <!-- laço para exibir os registros -->
						<?php for ($i = $pagina + 1; $i <= $pagina + $quantidade_links; $i++) { ?>

							<?php if ($i <= $total_paginas) { ?>
								<div class="ordenar_paginacao">
									<a href="?pagina=<?php echo $i . '&busca=' . $busca; ?>"><?php echo $i; ?></a>
						        </div>
							<?php } ?>
						<?php } ?>

							<!-- Botão de voltar '>'-->
										<div class="ordenar_paginacao">
											<a href="?pagina=<?php echo $avanca_direita . '&busca=' . $busca;; ?>">></a>
										</div>

										<!-- Botão de voltar '>>'-->
										<div class="ordenar_paginacao">
											<a href="?pagina=<?php echo $total_paginas . '&busca=' . $busca;; ?>">>></a>
										</div>
						</ul>

					<?php  } ?>


				</div>
				<!-- FIM DA PAGINAÇÃO -->

			</div>
		</div>

		<script type="text/javascript" src="../javascript/newsletter.js" async></script>
	</body>

	</html>

<?php

} else {
	header("Location: ../index.php?usuario=nao_autenticado");
}

?>