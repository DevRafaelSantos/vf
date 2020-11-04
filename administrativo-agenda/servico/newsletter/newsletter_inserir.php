<?php

// resolve o problema de acessar arquivos externos para requisição AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

    include_once "../../inclusoes/conecta_banco_dados.php";
    
    date_default_timezone_set('America/Sao_Paulo');

    $data_criacao = date("Y-m-d");
    $nome =  filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);

    $sql = "INSERT INTO newsletter(id_newsletter, nome, email, data_criacacao)
            VALUES (NULL, '${nome}', '${email}', '${data_criacao}')";

    if($conexao->query($sql)) {
        echo "OK";
    } else {
        echo "Não foi possível cadastrar.";
    }
