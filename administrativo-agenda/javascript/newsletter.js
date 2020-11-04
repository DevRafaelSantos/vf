// var caminho = "https://evoestagios.com.br/sistema/";
var caminho = "http://localhost/vf/administrativo-agenda/";

var nome = document.getElementById("nome");
var email = document.getElementById("email");

var alerta_nome = document.getElementById("alerta_nome");
var alerta_email = document.getElementById("alerta_email");


function cadastrar() {

	var xhttp = new XMLHttpRequest();

	// if (nome.value == "") {
	// 	nome.focus();
	// 	alerta_nome.textContent = "Favor informar o nome!";
	// }
	// else if (email.value == "") {
	// 	email.focus();
	// 	alerta_cargo.textContent = "Favor informar o e-mail!";
	// }
	// else {

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			console.log(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				//window.location = caminho + "facilitadores/facilitadores.php?insercao_newsletter=ok";
			}
		};
		xhttp.open("POST", caminho + "servico/newsletter/newsletter_inserir.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("nome=" + nome.value + "&email=" + email.value);

		console.log("nome=" + nome.value + "&email=" + email.value );
	//}
}

function verifica_alerta() {
	var variaveis = location.search.split("?");


	if (variaveis[1] != null) {
		if (variaveis[1] == "insercao_newsletter=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Facilitador cadastrado com sucesso!";
		}

		if (variaveis[1] == "exclusao_newsletter=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Usuário excluído com sucesso!";
		}

		if (variaveis[1] == "exclusao_newsletter=nao_ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta.style.backgroundColor = "red";
			alerta_texto.textContent = "Usuário não pode ser excluído pois já está vinculado!";
		}

		if (variaveis[1] == "alteracao_newsletter=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Facilitador alterado com sucesso!";
		}
	}
}

function fecha_alerta_sucesso() {
	var alerta = document.getElementById("alerta-sucesso");

	alerta.style.display = "none";
}

function fechar_modal() {
	var sobreposicao = document.getElementById("sobreposicao");
	var modal = document.getElementById("modal");

	sobreposicao.style.display = "none";
	modal.style.display = "none";
}

function confirma_exclusao_usuario(id) {
	var sobreposicao = document.getElementById("sobreposicao");
	var modal = document.getElementById("modal");
	var caixa_mensagem = document.getElementById("caixa-mensagem-mensagem");
	var botao_confirmar = document.getElementById("botao-confirmar");

	sobreposicao.style.display = "block";
	modal.style.display = "block";

	caixa_mensagem.textContent = "Tem certeza que deseja excluir o usuário?";

	botao_confirmar.addEventListener("click", function () {
		modal.style.display = "none";
		sobreposicao.style.display = "none";
		excluir_usuario(id);
	});
}

function excluir_usuario(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.responseText);
			if (this.responseText == "OK") {
				window.location = caminho + "newsletter/newsletter.php?exclusao_newsletter=ok";
			}else
			{
				window.location = caminho + "newsletter/newsletter.php?exclusao_newsletter=nao_ok";
			}
		}
	};

	xhttp.open("POST", caminho + "servico/newsletter/newsletter_exclusao.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + id);
}