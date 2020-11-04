// var caminho = "https://evoestagios.com.br/sistema/";
var caminho = "http://localhost/vf/administrativo-agenda/";

var nome = document.getElementById("nome");
var cargo = document.getElementById("cargo");
var linkedin = document.getElementById("linkedin");
var descricao = document.getElementById("descricao");

var alerta_nome = document.getElementById("alerta_nome");
var alerta_cargo = document.getElementById("alerta_cargo");
var alerta_linkedin = document.getElementById("alerta_linkedin");
var alerta_descricao = document.getElementById("alerta_descricao");

function cadastrar() {


	var xhttp = new XMLHttpRequest();

	if (nome.value == "") {
		nome.focus();
		alerta_nome.textContent = "Favor informar o nome!";
	}
	else if (cargo.value == "") {
		cargo.focus();
		alerta_cargo.textContent = "Favor informar o cargo!";
	}
	else if (linkedin.value == "") {
		linkedin.focus();
		alerta_linkedin.textContent = "Favor informar a LinkedIn!";
	}
	else if (descricao.value == "") {
		descricao.focus();
		alerta_descricao.textContent = "Favor informar a descrição!";
	}
	else {

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			//console.log(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				window.location = caminho + "facilitadores/facilitadores.php?insercao_facilitador=ok";
			}
		};
		xhttp.open("POST", caminho + "servico/cadastro/facilitadores/facilitador_inserir.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("nome=" + nome.value + "&cargo=" + cargo.value + "&linkedin=" + linkedin.value + "&descricao=" + descricao.value);

		//console.log("nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value);
	}
}


function carrega_dados(id) {
	//console.log(id);

	var variaveis = location.search.split("?");
	var id = variaveis[1].split("=");

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			//console.log(xhttp.responseText);
			var dados = JSON.parse(xhttp.responseText);

			nome.value = dados.nome;
			cargo.value = dados.cargo;
			linkedin.value = dados.linkedin;
			descricao.value = dados.descricao;

		}
	};

	xhttp.open("POST", caminho + "servico/cadastro/facilitadores/facilitador_requisicao.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + id[1]);
	//console.log("id=" + id[1]);
}

function alterar(id) {
	//console.log(id)
	var variaveis = location.search.split("?");
	var id = variaveis[1].split("=");

	var xhttp = new XMLHttpRequest();

	if (nome.value == "") {
		nome.focus();
		alerta_nome.textContent = "Favor informar o nome!";
	}
	else if (cargo.value == "") {
		cargo.focus();
		alerta_cargo.textContent = "Favor informar o cargo!";
	}
	else if (linkedin.value == "") {
		linkedin.focus();
		alerta_linkedin.textContent = "Favor informar a LinkedIn!";
	}
	else if (descricao.value == "") {
		descricao.focus();
		alerta_descricao.textContent = "Favor informar a descrição!";
	}
	else {

		//var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			//console.log(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				window.location = caminho + "facilitadores/facilitadores.php?alteracao_facilitador=ok";
			}
		};
		xhttp.open("POST", caminho + "servico/cadastro/facilitadores/facilitador_alterar.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("id=" + id[1] + "&nome=" + nome.value + "&cargo=" + cargo.value + "&linkedin=" + linkedin.value + "&descricao=" + descricao.value);

		//console.log("id=" + id[1] + "&nome=" + nome.value + "&cpf=" + cpf.value + "&rg=" + rg.value + "&unidade=" + unidade.value + "&cidade=" +
		//cidade.value + "&agente=" + agente.value + "&email=" + email.value + "&senha=" + senha.value);
	}
}

function verifica_alerta() {
	var variaveis = location.search.split("?");


	if (variaveis[1] != null) {
		if (variaveis[1] == "insercao_facilitador=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Facilitador cadastrado com sucesso!";
		}

		if (variaveis[1] == "exclusao_facilitador=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Facilitador excluído com sucesso!";
		}

		if (variaveis[1] == "exclusao_facilitador=nao_ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta.style.backgroundColor = "red";
			alerta_texto.textContent = "Facilitador não pode ser excluído, pois já está vinculado a alguma agenda!";
		}

		if (variaveis[1] == "alteracao_facilitador=ok") {
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

	caixa_mensagem.textContent = "Tem certeza que deseja excluir o facilitador?";

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
				window.location = caminho + "facilitadores/facilitadores.php?exclusao_facilitador=ok";
			}else
			{
				window.location = caminho + "facilitadores/facilitadores.php?exclusao_facilitador=nao_ok";
			}
		}
	};

	xhttp.open("POST", caminho + "servico/cadastro/facilitadores/facilitador_exclusao.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + id);
}