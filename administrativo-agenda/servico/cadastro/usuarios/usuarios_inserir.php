<?php

// resolve o problema de acessar arquivos externos para requisição AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

    include_once "../../../inclusoes/conecta_banco_dados.php";
    
    $nome =  filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $senha = filter_var($_POST['senha'], FILTER_SANITIZE_STRING);

    $senha_criptografada = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios(id_usuario, nome, email, senha)
            VALUES (NULL, '${nome}', '${email}', '${senha_criptografada}')";

    if($conexao->query($sql)) {
        echo "OK";
    } else {
        echo "Não foi possível cadastrar.";
    }
