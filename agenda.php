<?php 

// incluindo arquivo de conexão com o banco de dados
include("administrativo-agenda/inclusoes/conecta_banco_dados.php");


// definir o numero de itens por pagina (paginação)
$itens_por_pagina = 3;

// pegar a pagina atual
if (isset($_GET["pagina"])) {

	if ($_GET["pagina"] == 0) {
		$limite = 0;
		$pagina = intval($_GET["pagina"]);
	} else {
		$pagina = intval($_GET["pagina"]);

		// concatenando + 0 para todas páginas que não seja a página 0
		$concatena = 0;
		$limite = $pagina . $concatena;
	}
} else {
	$pagina = 0;
	$limite = 0;
}
?>



<!DOCTYPE html>
<html>

<head>
	<title>VF - Agenda</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/agenda.css">
</head>

<body>

	<!-- TOPO -->
	<header class="topo">
		<div class="recipiente">
			<img src="imagens/logo.png" class="logo">

			<div class="menu-icone">
				<a href="javascript: AbreMenu()" id="link-menu-icone"><img src="imagens/icone-menu.svg"></a>
			</div>

			<nav class="menu" id="menu">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="quem-somos.html">Quem somos</a></li>
					<li><a href="para-profissionais.html">Para empresas</a></li>
					<li><a href="cursos-rapidos.html">Para profissionais</a></li>
					<li><a href="resultados.html">Resultados</a></li>
					<li><a>Agenda</a></li>
					<li><a href="contato.php">Contato</a></li>
				</ul>
			</nav>
		</div>
	</header>

	<!-- BANNER -->
	<div class="fundo-banner">
		<div class="banner">
			<h1>Agenda</h1>
			<h3>Acompanhe nossa agenda!</h3>
			<div class="banner-descricao">

				<input type="date"> <span>Evento por data</span>


				<p>
					<select name="" id="">
						<option value="">Eventos por categoria</option>
						<option value=""></option>
						<option value=""></option>
						<option value=""></option>
					</select>
				</p>
			</div>

			<div class="agenda">
				<div class="imagem-destaque">
					<img src="imagens/imagem-agenda.png">
				</div>

				<div class="texto-destaque">

					<div class="titulo-evento">
						<span>
							Qualificações
						</span>
						<span class="data-evento">
							07 / nov /20 | 8h - 6h
						</span>
					</div>

					<div class="divisoria-agenda">
						<hr>
					</div>

					<div>
						<p class="titulo-descricao-destaque">
							<object data="imagens/seta-branca-svg.svg" type="image/svg+xml"></object> UPGRADE BLACK BELT
							- TURMA 2020
						</p>
						<p class="descricao-destaque">
							Profundidade para uma contribuição plena e diferenciada! Alta
							capacidade analítica e estatística, credibilidade e liderança fazem parte
							do perfil de [...]
						</p>

						<a href="#" class="saiba-mais-link">&#62; Saiba mais</a>
					</div>

				</div>
			</div>

			<div class="agenda">
				<div class="imagem-destaque">
					<img src="imagens/imagem-agenda.png">
				</div>

				<div class="texto-destaque">

					<div class="titulo-evento">
						<span>
							Qualificações
						</span>
						<span class="data-evento">
							07 / nov /20 | 8h - 6h
						</span>
					</div>

					<div class="divisoria-agenda">
						<hr>
					</div>

					<div>
						<p class="titulo-descricao-destaque">
							<object data="imagens/seta-branca-svg.svg" type="image/svg+xml"></object> UPGRADE BLACK BELT
							- TURMA 2020
						</p>
						<p class="descricao-destaque">
							Profundidade para uma contribuição plena e diferenciada! Alta
							capacidade analítica e estatística, credibilidade e liderança fazem parte
							do perfil de [...]
						</p>

						<a href="#" class="saiba-mais-link">&#62; Saiba mais</a>
					</div>

				</div>
			</div>

			<div class="agenda">
				<div class="imagem-destaque">
					<img src="imagens/imagem-agenda.png">
				</div>

				<div class="texto-destaque">

					<div class="titulo-evento">
						<span>
							Qualificações
						</span>
						<span class="data-evento">
							07 / nov /20 | 8h - 6h
						</span>
					</div>

					<div class="divisoria-agenda">
						<hr>
					</div>

					<div>
						<p class="titulo-descricao-destaque">
							<object data="imagens/seta-branca-svg.svg" type="image/svg+xml"></object> UPGRADE BLACK BELT
							- TURMA 2020
						</p>
						<p class="descricao-destaque">
							Profundidade para uma contribuição plena e diferenciada! Alta
							capacidade analítica e estatística, credibilidade e liderança fazem parte
							do perfil de [...]
						</p>

						<a href="#" class="saiba-mais-link">&#62; Saiba mais</a>
					</div>

				</div>
			</div>

			<a href="#" class="eventos-anteriores-link">&#62; Eventos Anteriores</a>

		</div>

	</div>





	<!-- RODAPÉ -->
	<footer class="rodape">

		<!-- Redes Sociais -->

		<div class="redes-sociais">
			<div class="texto-redes-sociais">
				Que tal explorar, além de nossa agenda,
				um pouco mais sobre a VF Consultoria?
				<br><br>
				<!-- <img src="imagens/seta-menu-ativo.png" alt=""> -->
				<p>

					<img src="imagens/seta-verde.png" alt="">
				</p>
				<p> Acesse nossas redes sociais. </p>
			</div>
			<div class="links-redes-sociais">
				<table>
					<tr>
						<td><a href="https://www.linkedin.com/company/vfconsultoria/" target="_blank"><img
									src="imagens/linkedin.png"></a></td>
						<td><a href="https://www.youtube.com/channel/UCCDpG-akUomioOs_s0_co1A" target="_blank"><img
									src="imagens/youtube.png"></a></td>
						<td><a href="https://www.facebook.com/vfconsultoria" target="_blank"><img
									src="imagens/facebook.png"></a></td>
						<td><a href="https://www.instagram.com/vf_consultoria/" target="_blank"><img
									src="imagens/instagram.png"></a></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="recipiente">
			<div class="divisoria">
				<hr>
			</div>

			<div class="rodape-recipiente">
				<div class="rodape-parte-institucional">
					<img src="imagens/logo-rodape.png" class="logo-rodape">

					<p>
						A VF Consultoria trabalha com expertise no uso conceitual e na aplicação prática do método Lean
						Six Sigma e Planejamento Estratégico. Cada etapa é aplicada para ajudar profissionais a se
						aprimorarem frente a desafios, empresas a conquistarem e manterem os melhores resultados.
					</p>

					<a href="quem-somos.html" class="conheca-a-vf-link">&#62; Conheça a VF</a>

				</div>

				<div class="rodape-parte-links">
					<h3>Links</h3>

					<p>
					<ul>
						<li>&#62; <a href="consultoria.html">Consultoria</a></li>
						<li>&#62; <a href="resultados.html">Resultados</a></li>
						<li>&#62; <a href="para-empresas.html">Qualificações in Company</a></li>
						<li>&#62; <a href="qualificacoes-abertas.html">Qualificações Abertas</a></li>
						<li>&#62; <a href="cursos-rapidos.html">Cursos Rápidos</a></li>
						<li>&#62; <a href="responsabilidade-social.html">Responsabilidade Social</a></li>
					</ul>
					</p>

					<table>
						<tr>
							<td><a href="https://www.linkedin.com/company/vfconsultoria/" target="_blank"><img
										src="imagens/linkedin.png"></a></td>
							<td><a href="https://www.youtube.com/channel/UCCDpG-akUomioOs_s0_co1A" target="_blank"><img
										src="imagens/youtube.png"></a></td>
							<td><a href="https://www.facebook.com/vfconsultoria" target="_blank"><img
										src="imagens/facebook.png"></a></td>
							<td><a href="https://www.instagram.com/vf_consultoria/" target="_blank"><img
										src="imagens/instagram.png"></a></td>
						</tr>
					</table>
				</div>

				<div class="rodape-parte-contato">
					<h3>Entre em contato</h3>

					<p>contato@vfconsultoria.com</p>

					<p>
						+55 (12) 3426-0400 <br>
						+55 (12) 99607-4218 <img src="imagens/whatsapp.png">
					</p>

					<p>
						The One Office Tower <br>
						Av. Itália, 928 | Sala 1609 <br>
						Jardim das Nações <br>
						12030-212 • Taubaté/SP • Brasil
					</p>

					<a href="contato.html" class="como-chegar-link">&#62; Como Chegar</a>
				</div>
			</div>

		</div>
	</footer>

	<div class="rodape-escuro">

		<div class="recipiente">
			<span>Copyright &copy; VF Consultoria - Todos os direitos reservados</span>
			<a href="https://www.pentaxial.com.br/" target="_blank"><img src="imagens/pentaxial-logo.png"></a>
		</div>

	</div>


	<script src="js/cursos-rapidos.js"></script>


</body>

</html>