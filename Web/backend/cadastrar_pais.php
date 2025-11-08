<?php
include '../bd.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $continente = $_POST['continente'];
    $nome = $_POST['nome'];
    $populacao = $_POST['populacao'];
    $idioma = $_POST['idioma'];

    if (empty($nome) || empty($populacao) || empty($idioma) || empty($continente)) {
        $msg = "Por favor, preencha todos os campos!";
    } else {
        $sql = "INSERT INTO tb_pais (continente, nome_oficial, populacao, idioma_principal)
                VALUES ('$continente', '$nome', '$populacao', '$idioma')";

        if ($conn->query($sql) === TRUE) {
            $msg = "✅ País cadastrado com sucesso!";
        } else {
            $msg = "❌ Erro ao cadastrar país: " . $conn->error;
        }
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar País</title>
    <link rel="stylesheet" href="../editar.css">
    <link rel="shortcut icon" href="../../Assets/icon.ico" type="image/x-icon">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="box">
        <div class="container">
            <div class="top-header">
                <header>Cadastro de País</header>
            </div>

            <?php if (isset($msg)) { echo "<p class='error'>$msg</p>"; } ?>

            <form method="POST">
                <div class="input-field">
                    <select name="continente" required>
                        <option value="">Selecione o Continente</option>
                        <option value="América">América</option>
                        <option value="Europa">Europa</option>
                        <option value="África">África</option>
                        <option value="Ásia">Ásia</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                    <i class="bx bx-globe"></i>
                </div>

                <div class="input-field">
                    <input type="text" class="input" id="nome" name="nome" placeholder="Nome do País" required>
                    <i class="bx bx-flag"></i>
                </div>

                <div class="input-field">
                    <input type="number" class="input" id="populacao" name="populacao" placeholder="População" required>
                    <i class="bx bx-group"></i>
                </div>

                <div class="input-field">
                    <input type="text" class="input" id="idioma" name="idioma" placeholder="Idioma Principal" required>
                    <i class="bx bx-message-dots"></i>
                </div>

                <div class="input-field">
                    <input type="submit" class="submit" value="Cadastrar País">
                </div>
            </form>

            <div class="bottom">
                <label>Deseja <a href="../index.php">voltar</a>?</label>
            </div>
        </div>
    </div>
</body>
</html>
