<?php
    // Inclui a conexão com o banco de dados
    include 'bd.php'; 
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud Mundo</title>
    <link rel="shortcut icon" href="../Assets/icon.ico" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <h1>SEJA BEM-VINDO AO CRUD MUNDO!</h1>
    <h2>GERENCIE AQUI O MUNDO</h2>

    <div class="container">

        <!-- Botões principais para cadastrar novos países ou cidades -->
        <div class="top-buttons">
            <a href="backend/cadastrar_pais.php" class="btn-top">+ Cadastrar País</a>
            <a href="backend/cadastrar_cidade.php" class="btn-top">+ Cadastrar Cidade</a>
        </div>

        <!-- Barra de pesquisa dinâmica -->
        <div class="search-container">
            <input type="text" id="pesquisa" placeholder="🔍 Pesquisar país ou cidade..." onkeyup="filtrar()">
        </div>

        <h2>🌍 Países</h2>
        <table>
            <tr>
                <th>Funções ⚙️</th>
                <th>Continente 🗾</th>
                <th>Nome 🏳️</th>
                <th>População 👥</th>
                <th>Idioma 🗣️</th>
            </tr>

            <?php
                // Busca todos os países cadastrados
                $sql = "SELECT * FROM tb_pais";
                $result = $conn->query($sql);

                // Se houver países, exibe cada um em uma linha da tabela
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>
                                    <a href='backend/editar_pais.php?id_pais=".$row['id_pais']."' class='btn editar'>Editar</a>
                                    <a href='backend/excluir_pais.php?id_pais=".$row['id_pais']."' class='btn excluir'>Excluir</a>
                                </td>
                                <td>".$row['continente']."</td>
                                <td>".$row['nome_oficial']."</td>
                                <td>".$row['populacao']."</td>
                                <td>".$row['idioma_principal']."</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='5'>Nenhum país encontrado!</td></tr>";
                }
            ?>
        </table>

        <h2>🏙️ Cidades</h2>
        <table>
            <tr>
                <th>Funções ⚙️</th>
                <th>País 🏳️</th>
                <th>Cidade 🏘️</th>
                <th>População 👥</th>
            </tr>

            <?php
                // Junta cidades e países para exibir o nome do país junto com a cidade
                $sql = "SELECT id_cidade, p.nome_oficial AS pais, c.nome_oficial AS cidade, c.populacao 
                        FROM tb_cidade c 
                        INNER JOIN tb_pais p ON c.id_pais = p.id_pais 
                        ORDER BY p.nome_oficial";
                $result = $conn->query($sql);

                // Mostra cada cidade na tabela, com seus respectivos botões de ação
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>
                                    <a href='backend/editar_cidade.php?id_cidade=".$row['id_cidade']."' class='btn editar'>Editar</a>
                                    <a href='backend/excluir_cidade.php?id_cidade=".$row['id_cidade']."' class='btn excluir'>Excluir</a>
                                </td>
                                <td>".$row['pais']."</td>
                                <td>".$row['cidade']."</td>
                                <td>".$row['populacao']."</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>Nenhuma cidade encontrada!</td></tr>";
                }
            ?>
        </table>

        <h2>📊 Estatísticas por Continente</h2>
        <table>
            <tr>
                <th>Continente</th>
                <th>Quantidade de Cidades</th>
            </tr>

            <?php
                /* 
                   Junta a tabela de países com a de cidades. Agrupa-se por continente. 
                   Conta-se quantas cidades existem em cada um.
                */
                $sql = "SELECT p.continente, COUNT(c.id_cidade) AS total
                        FROM tb_pais p
                        LEFT JOIN tb_cidade c ON p.id_pais = c.id_pais
                        GROUP BY p.continente";
                $result = $conn->query($sql);

                // Exibe o resultado (um continente por linha)
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>".$row['continente']."</td>
                                <td>".$row['total']."</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='2'>Nenhum dado disponível!</td></tr>";
                }
            ?>
        </table>
    </div>

    <script>
    /*
        A cada tecla digitada, se pega o texto do campo de pesquisa, Convertendo tudo para 
        minúsculo, comparando com o conteúdo das tabelas. Se o texto estiver contido 
        na linha, mostra-se. Caso contrário, esconde.
    */

    function filtrar() {
      let input = document.getElementById("pesquisa");
      let filtro = input.value.toLowerCase();
      let tabelas = document.querySelectorAll("table");

      tabelas.forEach(tabela => {
        let linhas = tabela.getElementsByTagName("tr");
        for (let i = 1; i < linhas.length; i++) {
          let texto = linhas[i].innerText.toLowerCase();
          if (texto.includes(filtro)) {
            linhas[i].style.display = "";
          } else {
            linhas[i].style.display = "none";
          }
        }
      });
    }
    
    </script>

</body>
</html>
