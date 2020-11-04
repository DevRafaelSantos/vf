<?php

// resolve o problema de acessar arquivos externos para requisição AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

    include_once "../../../inclusoes/conecta_banco_dados.php";
    
    $id_agenda =  filter_var($_POST['id'], FILTER_SANITIZE_STRING);
    $id_facilitador = filter_var($_POST['id_facilitador'], FILTER_SANITIZE_STRING);

    $sql = "INSERT INTO agenda_facilitador(id_agenda_facilitador, fk_id_agenda, fk_id_facilitador) 
            VALUES (NULL, '${id_agenda}', '${id_facilitador}')";

    if($conexao->query($sql)) {
        echo "OK";
    } else {
        echo "Não foi possível cadastrar.";
    }
