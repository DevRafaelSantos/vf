-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 04-Nov-2020 às 21:26
-- Versão do servidor: 8.0.18
-- versão do PHP: 5.6.39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `vf_agenda`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `agenda`
--

CREATE TABLE `agenda` (
  `id_agenda` int(11) NOT NULL,
  `nome` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sobre` varchar(700) COLLATE utf8mb4_general_ci NOT NULL,
  `local` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `localidade` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cep` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bairro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cidade` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `complemento` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `google_maps` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data` date NOT NULL,
  `horario` time NOT NULL,
  `imagem_principal` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagem_secundaria` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data_criacao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `agenda`
--

INSERT INTO `agenda` (`id_agenda`, `nome`, `categoria`, `sobre`, `local`, `localidade`, `cep`, `endereco`, `numero`, `bairro`, `cidade`, `estado`, `complemento`, `google_maps`, `data`, `horario`, `imagem_principal`, `imagem_secundaria`, `data_criacao`) VALUES
(14, 'Teste', 'Qualificações', 'Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste Teste teste ', 'Físico', 'Hotel', '12020340', 'Rua dos Operários', '86', 'Centro', 'Taubaté', 'SP', '', 'Mapps', '2020-10-10', '17:00:00', '7c88bc9a548c7066b100a80db59b20abprincipal.png', '0da40f82463c1c5c6cb938993954f4f2secundaria.png', '2020-11-04 00:00:00'),
(15, 'Online', 'Palestras', 'Teste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testeaTeste teste testea', 'Online', '', '', 'mapps', '', '', '', '', '', '', '2020-11-30', '20:30:00', '5a876c2b386b8b3611e9bf1b556b2419principal.png', '8aabe64907e458a5672101205d8a31desecundaria.png', '2020-11-04 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `agenda_facilitador`
--

CREATE TABLE `agenda_facilitador` (
  `id_agenda_facilitador` int(11) NOT NULL,
  `fk_id_agenda` int(11) NOT NULL,
  `fk_id_facilitador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `agenda_facilitador`
--

INSERT INTO `agenda_facilitador` (`id_agenda_facilitador`, `fk_id_agenda`, `fk_id_facilitador`) VALUES
(18, 14, 2),
(19, 15, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `facilitadores`
--

CREATE TABLE `facilitadores` (
  `id_facilitador` int(11) NOT NULL,
  `nome` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `linkedin` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `facilitadores`
--

INSERT INTO `facilitadores` (`id_facilitador`, `nome`, `cargo`, `descricao`, `linkedin`) VALUES
(2, 'Rafael Santos', 'Programador', 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste T.', 'https://www.linkedin.com/in/devrafaelsantos/');

-- --------------------------------------------------------

--
-- Estrutura da tabela `newsletter`
--

CREATE TABLE `newsletter` (
  `id_newsletter` int(11) NOT NULL,
  `nome` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data_criacacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `senha` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome`, `email`, `senha`) VALUES
(1, 'Rafael', 'rafael@pentaxialroot.com.br', '$2y$10$wflaAIc/v3Q8WGGlX9aLzuPs6C6APtGyFZelFLwt9Oxt5yEQTTho.');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id_agenda`);

--
-- Índices para tabela `agenda_facilitador`
--
ALTER TABLE `agenda_facilitador`
  ADD PRIMARY KEY (`id_agenda_facilitador`),
  ADD KEY `id_evento` (`fk_id_agenda`),
  ADD KEY `id_facilitador` (`fk_id_facilitador`);

--
-- Índices para tabela `facilitadores`
--
ALTER TABLE `facilitadores`
  ADD PRIMARY KEY (`id_facilitador`);

--
-- Índices para tabela `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id_newsletter`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id_agenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `agenda_facilitador`
--
ALTER TABLE `agenda_facilitador`
  MODIFY `id_agenda_facilitador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `facilitadores`
--
ALTER TABLE `facilitadores`
  MODIFY `id_facilitador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id_newsletter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `agenda_facilitador`
--
ALTER TABLE `agenda_facilitador`
  ADD CONSTRAINT `fk_id_agenda` FOREIGN KEY (`fk_id_agenda`) REFERENCES `agenda` (`id_agenda`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_id_facilitador` FOREIGN KEY (`fk_id_facilitador`) REFERENCES `facilitadores` (`id_facilitador`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
