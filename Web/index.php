<?php
    include 'bd.php'; // conexão ao banco de dados
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

        <!-- TABELA DE PAÍSES -->
        <table>
            <tr>
                <th>Continente</th>
                <th>Nome</th>
                <th>População</th>
                <th>Idioma</th>
                <th>Funções</th>
            </tr>
            <?php
                $sql = "SELECT * FROM tb_pais";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>".$row['continente']."</td>
                                <td>".$row['nome_oficial']."</td>
                                <td>".$row['populacao']."</td>
                                <td>".$row['idioma_principal']."</td>
                                <td>
                                    <a href='backend/editar_pais.php?id_pais=".$row['id_pais']."' class='btn editar'>Editar</a>
                                    <a href='backend/excluir_pais.php?id_pais=".$row['id_pais']."' class='btn excluir'>Excluir</a>
                                </td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>Nenhum país encontrado!</td></tr>";
                }
            ?>
        </table>

        <!-- TABELA DE CIDADES -->
        <table>
            <tr>
                <th>País</th>
                <th>Cidade</th>
                <th>População</th>
                <th>Funções</th>
            </tr>
            <?php
                $sql = "SELECT id_cidade, p.nome_oficial AS pais, c.nome_oficial AS cidade, c.populacao 
                        FROM tb_cidade c 
                        INNER JOIN tb_pais p ON c.id_pais = p.id_pais";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>".$row['pais']."</td>
                                <td>".$row['cidade']."</td>
                                <td>".$row['populacao']."</td>
                                <td>
                                    <a href='backend/editar_cidade.php?id_cidade=".$row['id_cidade']."' class='btn editar'>Editar</a>
                                    <a href='backend/excluir_cidade.php?id_cidade=".$row['id_cidade']."' class='btn excluir'>Excluir</a>
                                </td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='3'>Nenhuma cidade encontrada!</td></tr>";
                }
            ?>
        </table>

    </div>
</body>
</html>
