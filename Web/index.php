<?php
    include 'bd.php'; //conexão ao banco de dados
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud Mundo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>SEJA BEM VINDO AO CRUD MUNDO!</h1>
    <h2>GERENCIE AQUI O MUNDO</h2>


    <!--TABELAS-->

    <table>
        <tr>
            <th>Continente</th>
            <th>Nome</th>
            <th>População</th>
            <th>Idioma</th>
        </tr>

        <?php
            $sql = "select * from tb_pais";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>
                        <td>".$row['continente']."</td>
                        <td>".$row['nome_oficial']."</td>
                        <td>".$row['populacao']."</td>
                        <td>".$row['idioma_principal']."</td>
                    </tr>";
                }
            } else{
                echo "<tr><td>Nenhum país encontrado! </td></tr>";
            }
        ?>

    </table>

    <table>
        <tr>
            <th>País</th>
            <th>Cidade</th>
            <th>População</th>
        </tr>

        <?php
            $sql = "select p.nome_oficial as pais, c.nome_oficial, c.populacao from tb_cidade c inner join tb_pais p on (c.id_pais=p.id_pais)";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>
                        <td>".$row['pais']."</td>
                        <td>".$row['nome_oficial']."</td>
                        <td>".$row['populacao']."</td>
                    </tr>";
                }
            } else{
                echo "<tr><td>Nenhuma cidade encontrada! </td></tr>";
            }
        ?>

    </table>

</body>
</html>