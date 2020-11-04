<?php
include("administrativo-agenda/inclusoes/conecta_banco_dados.php");

?>


<!DOCTYPE html>
<html>

<head>
    <title>VF - Agenda - Online</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/agenda-online.css">
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
            <h3>Detalhes do Evento</h3>

            <div class="agenda">
                <div class="imagem-destaque">
                    <?php
                    $sql = "SELECT imagem FROM agenda WHERE id_agenda = '" . 4 . "'";
                    $resultado = $conexao->query($sql);
                    $registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);
                    ?>
                    <img src="<?php echo "administrativo-agenda/uploads/" . $registro['imagem']; ?>">
                </div>

                <div class="texto-destaque">

                    <div class="titulo-evento">
                        <span>
                            Sobre
                        </span>
                    </div>

                    <div class="divisoria-agenda">
                        <hr>
                    </div>

                    <div>
                        <div class="descricao-destaque">
                            Profundidade para uma contribuição plena e diferenciada! Alta capacidade analítica e
                            estatística, credibilidade e liderança fazem parte do perfil de um BLACK BELT. Você terá
                            acesso às técnicas mais avançadas do LEAN e do SIX SIGMA, adquirindo vantagens
                            competitivas.
                            <br><br> Entre outubro e dezembro de 2020, a VF Consultoria continuará a qualificação em
                            Lean Six Sigma com mais uma turma de Upgrade para Belt Lean Six Sigma.
                        </div>

                        <div class="descricao-destaque">
                            Este será o <b>9º ano consecutivo</b> que vamos disponibilizar para o Vale do Paraíba (SP),
                            as
                            nossas qualificações em LSS.
                            <br><br> Nosso objetivo continua nessa turma em qualificar profissionais, fomentando o
                            desenvolvimento das empresas da nossa região assim como já fizemos em vários estados,
                            incluindo nas regiões Nordeste e Centro-Oeste.
                        </div>
                    </div>

                </div>
            </div>

            <div class="agenda-online">
                <div class="texto-destaque">
                    <div class="titulo-evento">
                        <span>
                            Facilitador(es)
                        </span>
                    </div>

                    <div class="divisoria-agenda">
                        <hr>
                    </div>

                    <?php
                    $sql = "SELECT c.nome, c.cargo, c.descricao, c.linkedin
                        FROM agenda a
                        JOIN agenda_facilitador b
                        ON a.id_agenda = b.fk_id_agenda
                        JOIN facilitadores c
                        ON c.id_facilitador = c.id_facilitador
                        WHERE a.id_agenda = 4";
                    $resultado = $conexao->query($sql);
                    $total_registro = $resultado->num_rows;
                    if ($total_registro > 0) {
                        for ($i = 0; $i < $total_registro; $i++) {
                            $registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);
                    ?>
                            <div>
                                <div class="nome-facilitador">
                                    <?php echo $registro["nome"]; ?> <br>
                                    <span> <?php echo $registro["cargo"]; ?></span><br>
                                    <a href="<?php echo $registro["linkedin"]; ?>"> <object data="imagens/linkedin.svg" type="image/svg+xml"></object></a>
                                </div>

                                <div class="descricao-facilitador">
                                    <?php echo $registro["descricao"]; ?>
                                </div>
                            </div>
                            <div class="divisoria-agenda">
                                <hr>
                            </div>
                    <?php }
                    }

                    ?>
                    <!-- 
                    <div>
                        <div class="nome-facilitador">
                            Paulo César Ferreira Franco <br>
                            <span>Diretor e Consultor Responsável</span><br>
                            <object data="imagens/linkedin.svg" type="image/svg+xml"></object>
                        </div>

                        <div class="descricao-facilitador">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod, lorem sollicitudin
                            pharetra tincidunt, erat eros pulvinar dolor, quis posuere libero nibh tincidunt.
                        </div>
                    </div>

                    <div class="divisoria-agenda">
                        <hr>
                    </div>

                    <div>
                        <div class="nome-facilitador">
                            Paulo César Ferreira Franco <br>
                            <span>Diretor e Consultor Responsável</span><br>
                            <object data="imagens/linkedin.svg" type="image/svg+xml"></object>
                        </div>

                        <div class="descricao-facilitador">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod, lorem sollicitudin
                            pharetra tincidunt, erat eros pulvinar dolor, quis posuere libero nibh tincidunt.
                        </div>
                    </div> -->
                </div>

            </div>

            <div class="detalhes-local">
                <div class="detalhes">
                    <span>Detalhes</span>

                    <div class="divisoria-agenda">
                        <hr>
                    </div>

                    <p>
                        <b>Datas:</b> <br>
                        <?php
                        $sql = "SELECT data, horario, endereco FROM agenda WHERE id_agenda = 4 ";
                        $resultado = $conexao->query($sql);
                        $registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC);

                        setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
                        date_default_timezone_set('America/Sao_Paulo');
                        //echo strftime('%A, %d de %B de %Y', strtotime('$registro["data"]'));

                        echo $hora = substr($registro['horario'], 0, 2);
                        echo $minuto = substr($registro['horario'], 2, 3);

                        $horario_agenda = $hora . $minuto;

                        ?>

                        <?php echo strftime('%d de %B', strtotime($registro["data"])); ?>
                    </p>
                    <p>
                        <b>Horário:</b> <?php echo $horario_agenda; 
                        ?>
                    </p>

                </div>

                <div class="local">
                    <span>Local</span>

                    <div class="divisoria-agenda">
                        <hr>
                    </div>

                    <p>
                        <b>Online</b>
                        <object data="imagens/instagram.svg" type="image/svg+xml"></object>
                    </p>
                    <p>
                        <b>Link:</b> <?php echo $registro["endereco"]; ?>
                    </p>
                    <p>
                        &#62; <span>Google Agenda</span>
                        <span class="direito">&#62;
                            <span class="verde"> Exportar Local</span>
                        </span>
                    </p>
                </div>
            </div>

            <div class="depoimentos">
                <div class="depoimento-texto">
                    <p style="color: white;">Assista alguns depoimentos de alunos em nosso canal Youtube:</p>
                </div>

                <div class="video-youtube-1">
                    <iframe src="https://www.youtube.com/embed/ymE3EwgW3mA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div class="video-youtube-2">
                    <iframe src="https://www.youtube.com/embed/xpA-sJ9HtXA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>

            <div class="botoes-contato">
                <div class="botao-whatsapp">
                    <a href="#" class="whatsapp-link"><object data="imagens/icone-whatsapp.svg" type="image/svg+xml"></object> Whatsapp </a>
                </div>

                <div class="botao-contato">

                    <a href="#" class="contato-link-icone"><object data="imagens/icone-contato.svg" type="image/svg+xml"></object> Contato</a>
                </div>
            </div>
        </div>

    </div>





    <!-- RODAPÉ -->
    <footer class="rodape">

        <!-- Redes Sociais -->


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
                        aprimorarem frente a desafios, empresas a conquistarem e manterem
                        os melhores resultados.
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
                            <td>
                                <a href="https://www.linkedin.com/company/vfconsultoria/" target="_blank"><img src="imagens/linkedin.png"></a>
                            </td>
                            <td>
                                <a href="https://www.youtube.com/channel/UCCDpG-akUomioOs_s0_co1A" target="_blank"><img src="imagens/youtube.png"></a>
                            </td>
                            <td>
                                <a href="https://www.facebook.com/vfconsultoria" target="_blank"><img src="imagens/facebook.png"></a>
                            </td>
                            <td>
                                <a href="https://www.instagram.com/vf_consultoria/" target="_blank"><img src="imagens/instagram.png"></a>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="rodape-parte-contato">
                    <h3>Entre em contato</h3>

                    <p>contato@vfconsultoria.com</p>

                    <p>
                        +55 (12) 3426-0400 <br> +55 (12) 99607-4218 <img src="imagens/whatsapp.png">
                    </p>

                    <p>
                        The One Office Tower <br> Av. Itália, 928 | Sala 1609 <br> Jardim das Nações <br> 12030-212 •
                        Taubaté/SP • Brasil
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