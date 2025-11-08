<?php
include '../bd.php'; // conexão com o banco

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_pais = $_POST['id_pais'];
    $nome = $_POST['nome'];
    $populacao = $_POST['populacao'];

    // validação simples
    if (empty($id_pais) || empty($nome) || empty($populacao)) {
        $msg = "⚠️ Por favor, preencha todos os campos!";
    } else {
        $sql = "INSERT INTO tb_cidade (id_pais, nome_oficial, populacao)
                VALUES ('$id_pais', '$nome', '$populacao')";

        if ($conn->query($sql) === TRUE) {
            $msg = "✅ Cidade cadastrada com sucesso!";
        } else {
            $msg = "❌ Erro ao cadastrar cidade: " . $conn->error;
        }
    }

    $conn->close();
}

include '../bd.php';
$sql_paises = "SELECT id_pais, nome_oficial FROM tb_pais ORDER BY nome_oficial ASC";
$result_paises = $conn->query($sql_paises);
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Cidade</title>
    <link rel="stylesheet" href="../editar.css">
    <link rel="shortcut icon" href="../../Assets/icon.ico" type="image/x-icon">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="box">
        <div class="container">
            <div class="top-header">
                <header>Cadastro de Cidade</header>
            </div>

            <?php if (isset($msg)) { echo "<p class='error'>$msg</p>"; } ?>

            <form method="POST">
                <div class="input-field">
                    <select name="id_pais" required>
                        <option value="">Selecione o País</option>
                        <?php
                        if ($result_paises->num_rows > 0) {
                            while ($pais = $result_paises->fetch_assoc()) {
                                echo "<option value='".$pais['id_pais']."'>".$pais['nome_oficial']."</option>";
                            }
                        } else {
                            echo "<option value=''>Nenhum país cadastrado</option>";
                        }
                        ?>
                    </select>
                    <i class="bx bx-flag"></i>
                </div>

                <div class="input-field">
                    <input type="text" class="input" id="nome" name="nome" placeholder="Nome da Cidade" required>
                    <i class="bx bx-building-house"></i>
                </div>

                <div class="input-field">
                    <input type="number" class="input" id="populacao" name="populacao" placeholder="População" required>
                    <i class="bx bx-group"></i>
                </div>

                <div class="input-field">
                    <input type="submit" class="submit" value="Cadastrar Cidade">
                </div>
            </form>

            <div class="bottom">
                <label>Deseja <a href="../index.php">voltar</a>?</label>
            </div>
        </div>
    </div>
</body>
</html>
