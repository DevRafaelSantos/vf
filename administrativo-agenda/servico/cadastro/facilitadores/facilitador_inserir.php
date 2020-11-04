<?php

// resolve o problema de acessar arquivos externos para requisição AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

    include_once "../../../inclusoes/conecta_banco_dados.php";
    
    $nome =  filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $cargo = filter_var($_POST['cargo'], FILTER_SANITIZE_STRING);
    $descricao = filter_var($_POST['descricao'], FILTER_SANITIZE_STRING);
    $linkedin = filter_var($_POST['linkedin'], FILTER_SANITIZE_STRING);

    $sql = "INSERT INTO facilitadores(id_facilitador, nome, cargo, descricao, linkedin)
            VALUES (NULL, '${nome}', '${cargo}', '${descricao}', '${linkedin}')";

    if($conexao->query($sql)) {
        echo "OK";
    } else {
        echo "Não foi possível cadastrar.";
    }
