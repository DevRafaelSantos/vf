<?php

// resolve o problema de acessar arquivos externos para requisição AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

include_once "../../../inclusoes/conecta_banco_dados.php";

// seleciona o fuso horário correto

date_default_timezone_set('America/Sao_Paulo');

$data_criacao = date("Y-m-d");
$nome =  filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
$categoria = filter_var($_POST['categoria'], FILTER_SANITIZE_STRING);
$sobre = filter_var($_POST['sobre'], FILTER_SANITIZE_STRING);
$local = filter_var($_POST['local'], FILTER_SANITIZE_STRING);

if ($local == "Físico") {
    $localidade = filter_var($_POST['localidade'], FILTER_SANITIZE_STRING);
    $cep = filter_var($_POST['cep'], FILTER_SANITIZE_STRING);
    $endereco = filter_var($_POST['endereco'], FILTER_SANITIZE_STRING);
    $numero = filter_var($_POST['numero'], FILTER_SANITIZE_STRING);
    $bairro = filter_var($_POST['bairro'], FILTER_SANITIZE_STRING);
    $cidade = filter_var($_POST['cidade'], FILTER_SANITIZE_STRING);
    $estado = filter_var($_POST['estado'], FILTER_SANITIZE_STRING);
    $complemento = filter_var($_POST['complemento'], FILTER_SANITIZE_STRING);
    $google_maps = filter_var($_POST['google_maps'], FILTER_SANITIZE_STRING);
    $data = filter_var($_POST['data'], FILTER_SANITIZE_STRING);
    $horario = filter_var($_POST['horario'], FILTER_SANITIZE_STRING);

    // upload imagem
    if ((isset($_FILES['foto_logo']['name']) && $_FILES["foto_logo"]["error"] == 0) && (isset($_FILES['foto_logo_secundaria']['name']) && $_FILES["foto_logo_secundaria"]["error"] == 0)) {
        // seleciona o fuso horário correto
        // fazendo isso pra gerar nome aleatório da imagem
        date_default_timezone_set('America/Sao_Paulo');
        $criado_em = date("Y-m-d H:i:s") . $nome;
        $hash = md5($criado_em) . "principal";

        if ($_FILES["foto_logo"]["type"] == "image/jpeg") {
            $extensao = ".jpg";
        } else if ($_FILES["foto_logo"]["type"] == "image/png") {
            $extensao = ".png";
        }

        $novo_nome_imagem = $hash . $extensao;

        $target_dir = "../../../uploads/";
        $target_file = $target_dir . basename($novo_nome_imagem);

        if (move_uploaded_file($_FILES["foto_logo"]["tmp_name"], $target_file)){

        }else{}


        if ($_FILES["foto_logo_secundaria"]["type"] == "image/jpeg") {
            $extensao = ".jpg";
        } else if ($_FILES["foto_logo_secundaria"]["type"] == "image/png") {
            $extensao = ".png";
        }
        $hash_banner = md5($criado_em) . "secundaria";
        $novo_nome = $hash_banner . $extensao;

        $target_dir = "../../../uploads/";
        $target_file = $target_dir . basename($novo_nome);

        move_uploaded_file($_FILES["foto_logo_secundaria"]["tmp_name"], $target_file);
    }
    $sql = "INSERT INTO agenda(id_agenda, nome, categoria, sobre, local, localidade, cep, endereco, numero, bairro,
    cidade, estado, complemento, google_maps, data, horario, imagem_principal, imagem_secundaria, data_criacao)
        VALUES (NULL, '${nome}', '${categoria}', '${sobre}', '${local}', '${localidade}', '${cep}', '${endereco}', '${numero}', 
        '${bairro}', '${cidade}', '${estado}', '${complemento}', '${google_maps}', '${data}','${horario}',
        '${novo_nome_imagem}',  '${novo_nome}', '${data_criacao}')";

    if ($conexao->query($sql)) {
        echo mysqli_insert_id($conexao);
    } else {
        echo "Não foi possível cadastrar.";
    }
} else {
    $localidade = Null;
    $endereco = filter_var($_POST['endereco'], FILTER_SANITIZE_STRING);
    $numero = Null;
    $bairro = Null;
    $cidade = Null;
    $estado = Null;
    $complemento = Null;
    $google_maps = Null;
    $data = filter_var($_POST['data'], FILTER_SANITIZE_STRING);
    $horario = filter_var($_POST['horario'], FILTER_SANITIZE_STRING);

    // upload imagem
    if ((isset($_FILES['foto_logo']['name']) && $_FILES["foto_logo"]["error"] == 0) && (isset($_FILES['foto_logo_secundaria']['name']) && $_FILES["foto_logo_secundaria"]["error"] == 0)) {
        // seleciona o fuso horário correto
        // fazendo isso pra gerar nome aleatório da imagem
        date_default_timezone_set('America/Sao_Paulo');
        $criado_em = date("Y-m-d H:i:s");
        $hash = md5($criado_em) . "principal";

        if ($_FILES["foto_logo"]["type"] == "image/jpeg") {
            $extensao = ".jpg";
        } else if ($_FILES["foto_logo"]["type"] == "image/png") {
            $extensao = ".png";
        }

        $novo_nome_imagem = $hash . $extensao;

        $target_dir = "../../../uploads/";
        $target_file = $target_dir . basename($novo_nome_imagem);

        move_uploaded_file($_FILES["foto_logo"]["tmp_name"], $target_file);


        if ($_FILES["foto_logo_secundaria"]["type"] == "image/jpeg") {
            $extensao = ".jpg";
        } else if ($_FILES["foto_logo_secundaria"]["type"] == "image/png") {
            $extensao = ".png";
        }
        $hash_banner = md5($criado_em) . "secundaria";
        $novo_nome = $hash_banner . $extensao;

        $target_dir = "../../../uploads/";
        $target_file = $target_dir . basename($novo_nome);

        move_uploaded_file($_FILES["foto_logo_secundaria"]["tmp_name"], $target_file);
    }

    $sql = "INSERT INTO agenda(id_agenda, nome, categoria, sobre, local, localidade, cep, endereco, numero, bairro,
    cidade, estado, complemento, google_maps, data, horario, imagem_principal, imagem_secundaria, data_criacao)
        VALUES (NULL, '${nome}', '${categoria}', '${sobre}', '${local}', '${localidade}', '${cep}', '${endereco}', '${numero}', 
        '${bairro}', '${cidade}', '${estado}', '${complemento}', '${google_maps}', '${data}','${horario}',
        '${novo_nome_imagem}', '${novo_nome}', '${data_criacao}')";

    if ($conexao->query($sql)) {
        echo mysqli_insert_id($conexao);
    } else {
        echo "Não foi possível cadastrar.";
    }
}
