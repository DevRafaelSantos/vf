function pega_parametros_url()
{
	// o comando slice(1) traz os caracteres á direita da ? na URL
	var parametro = location.search.slice(1);
	
	// o comando split(&) divide num vetor os caracteres antes do &(0) e depois do &(1)
	var partes = parametro.split('&');
	
	// declarando os elementos
	var mensagem_email = document.getElementById("mensagem_email");
	var mensagem_senha = document.getElementById("mensagem_senha");
	var email = document.getElementById("email");
	var alerta_autenticacao = document.getElementById("alerta-autenticacao");
	var alerta_nao_cadastrado = document.getElementById("alerta-nao-cadastrado");
	var alerta_sessao_finalizada = document.getElementById("alerta-sessao-finalizada");

	if(parametro != "")
	{
		if(parametro == "resposta=email_vazio")
		{
			mensagem_email.style.display = "block";
			mensagem_email.textContent = "Favor informar o e-mail!";
		}
		else if(parametro == "resposta=email_invalido")
		{
			mensagem_email.style.display = "block";
			mensagem_email.textContent = "Favor informar um e-mail válido!";
		}
		else if(partes[0] == "resposta=senha_vazia")
		{
			mensagem_senha.style.display = "block";
			mensagem_senha.textContent = "Favor informar a senha!";

			// o comando split(&) divide num vetor os caracteres antes do =(0) e depois do =(1)
			// no caso usamos o chaveValor[1] pra pegar os caracteres após o =
			var chaveValor = partes[1].split('=');
    		var valor = chaveValor[1];
			email.value = valor;
		}
		else if(partes[0] == "resposta=senha_invalida")
		{
			mensagem_senha.style.display = "block";
			mensagem_senha.textContent = "Senha inválida!";

			// o comando split(&) divide num vetor os caracteres antes do =(0) e depois do =(1)
			// no caso usamos o chaveValor[1] pra pegar os caracteres após o =
			var chaveValor = partes[1].split('=');
    		var valor = chaveValor[1];
			email.value = valor;
		}
		else if(partes[0] == "usuario=nao_autenticado")
		{
			alerta_autenticacao.style.display = "block";
		}
		else if(partes[0] == "resposta=email_nao_cadastrado")
		{
			alerta_nao_cadastrado.style.display = "block";
		}
		else if(partes[0] == "resposta=usuario_inativo")
		{
			alerta_nao_cadastrado.style.display = "block";
			alerta_nao_cadastrado.textContent = "Usuário foi desativado!";
		}
		else if(partes[0] == "sessao=finalizada")
		{
			alerta_sessao_finalizada.style.display = "block";
		}
	}

}