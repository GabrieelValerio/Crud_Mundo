<?php
include '../bd.php'; 

if (!isset($_GET['id_pais'])) {
    echo "❌ Erro: ID do país não foi informado!";
    exit;
}

$id_pais = $_GET['id_pais'];

$sql = "SELECT * FROM tb_pais WHERE id_pais = $id_pais";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo "❌ País não encontrado!";
    exit;
}

$pais = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $novo_nome = $_POST['nome'];
    $nova_populacao = $_POST['populacao'];
    $novo_idioma = $_POST['idioma'];
    $novo_continente = $_POST['continente'];

    if (empty($novo_nome) || empty($nova_populacao) || empty($novo_idioma) || empty($novo_continente)) {
        $msg = "⚠️ Por favor, preencha todos os campos!";
    } else {
        $sql_update = "UPDATE tb_pais 
                       SET nome_oficial = '$novo_nome', 
                           populacao = '$nova_populacao', 
                           idioma_principal = '$novo_idioma',
                           continente = '$novo_continente'
                       WHERE id_pais = $id_pais";

        if ($conn->query($sql_update) === TRUE) {
            header("Location: ../index.php");
            exit;
        } else {
            $msg = "❌ Erro ao atualizar país: " . $conn->error;
        }
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar País</title>
    <link rel="stylesheet" href="../editar.css">
    <link rel="shortcut icon" href="../Assets/icon.ico" type="image/x-icon">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="box">
        <div class="container">
            <div class="top-header">
                <header>Editar País</header>
            </div>

            <?php if (isset($msg)) { echo "<p class='error'>$msg</p>"; } ?>

            <form method="POST">

                <div class="input-field">
                    <select name="continente" required>
                        <option value="">Selecione o Continente</option>
                        <?php
                        $continentes = ["América", "Europa", "África", "Ásia", "Oceania"];
                        foreach ($continentes as $cont) {
                            $selected = ($pais['continente'] == $cont) ? "selected" : "";
                            echo "<option value='$cont' $selected>$cont</option>";
                        }
                        ?>
                    </select>
                    <i class="bx bx-globe"></i>
                </div>

                <div class="input-field">
                    <input type="text" class="input" id="nome" name="nome"
                           placeholder="Nome do País"
                           value="<?php echo $pais['nome_oficial']; ?>" required>
                    <i class="bx bx-flag"></i>
                </div>

                <div class="input-field">
                    <input type="number" class="input" id="populacao" name="populacao"
                           placeholder="População"
                           value="<?php echo $pais['populacao']; ?>" required>
                    <i class="bx bx-group"></i>
                </div>

                <div class="input-field">
                    <input type="text" class="input" id="idioma" name="idioma"
                           placeholder="Idioma Principal"
                           value="<?php echo $pais['idioma_principal']; ?>" required>
                    <i class="bx bx-message-dots"></i>
                </div>

                <div class="input-field">
                    <input type="submit" class="submit" value="Salvar Alterações">
                </div>
            </form>

            <div class="bottom">
                <label>Deseja <a href="../index.php">voltar</a>?</label>
            </div>
        </div>
    </div>
</body>
</html>
