// var caminho = "https://evoestagios.com.br/sistema/";
var caminho = "http://localhost/vf/administrativo-agenda/";


function cadastrar() {
	var nome = document.getElementById("nome");
	var email = document.getElementById("email");
	var senha = document.getElementById("senha");

	var alerta_nome = document.getElementById("alerta_nome");
	var alerta_email = document.getElementById("alerta_email");
	var alerta_senha = document.getElementById("alerta_senha");

	var xhttp = new XMLHttpRequest();

	if (nome.value == "") {
		nome.focus();
		alerta_nome.textContent = "Favor informar o nome!";
	}
	else if (email.value == "") {
		email.focus();
		alerta_email.textContent = "Favor informar o email!";
	}
	else if (senha.value == "") {
		senha.focus();
		alerta_senha.textContent = "Favor informar a senha!";
	}
	else {

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			//console.log(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				window.location = caminho + "usuarios/usuarios.php?insercao_usuario=ok";
			}
		};
		xhttp.open("POST", caminho + "servico/cadastro/usuarios/usuarios_inserir.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value);

		//console.log("nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value);
	}
}


function carrega_dados(id) {
	//console.log(id);

	var variaveis = location.search.split("?");
	var id = variaveis[1].split("=");
	var nome = document.getElementById("nome");
	var email = document.getElementById("email");

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			//console.log(xhttp.responseText);
			var dados = JSON.parse(xhttp.responseText);

			nome.value = dados.nome;
			email.value = dados.email;

		}
	};

	xhttp.open("POST", caminho + "servico/cadastro/usuarios/usuarios_requisicao.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + id[1]);
	//console.log("id=" + id[1]);
}

function alterar(id) {
	//console.log(id)
	var variaveis = location.search.split("?");
	var id = variaveis[1].split("=");
	var nome = document.getElementById("nome");
	var email = document.getElementById("email");
	var senha = document.getElementById("senha");

	var alerta_nome = document.getElementById("alerta_nome");
	var alerta_email = document.getElementById("alerta_email");

	var xhttp = new XMLHttpRequest();

	if (nome.value == "") {
		nome.focus();
		alerta_nome.textContent = "Favor informar o nome!";
	}
	else if (email.value == "") {
		email.focus();
		alerta_email.textContent = "Favor informar email!";
	}
	else {

		//var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			//console.log(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				window.location = caminho + "usuarios/usuarios.php?alteracao_usuario=ok";
			}
		};
		xhttp.open("POST", caminho + "servico/cadastro/usuarios/usuarios_alterar.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("id=" + id[1] + "&nome=" + nome.value +"&email=" + email.value + "&senha=" + senha.value);

		//console.log("id=" + id[1] + "&nome=" + nome.value + "&cpf=" + cpf.value + "&rg=" + rg.value + "&unidade=" + unidade.value + "&cidade=" +
		//cidade.value + "&agente=" + agente.value + "&email=" + email.value + "&senha=" + senha.value);
	}
}

function verifica_alerta() {
	var variaveis = location.search.split("?");


	if (variaveis[1] != null) {
		if (variaveis[1] == "insercao_usuario=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Usuário cadastrado com sucesso!";
		}

		if (variaveis[1] == "exclusao_usuario=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Usuário excluído com sucesso!";
		}

		if (variaveis[1] == "alteracao_usuario=ok") {
			var alerta = document.getElementById("alerta-sucesso");
			var alerta_texto = document.getElementById("alerta-sucesso-texto");
			alerta.style.display = "block";
			alerta_texto.textContent = "Usuário alterado com sucesso!";
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
				window.location = caminho + "usuarios/usuarios.php?exclusao_usuario=ok";
			}
		}
	};

	xhttp.open("POST", caminho + "servico/cadastro/usuarios/usuarios_exclusao.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id=" + id);
}