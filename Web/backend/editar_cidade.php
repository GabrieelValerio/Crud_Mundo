<?php
include '../bd.php';

if (!isset($_GET['id_cidade'])) {
    echo "❌ Erro: ID da cidade não foi informado!";
    exit;
}

$id_cidade = $_GET['id_cidade'];

$sql = "SELECT * FROM tb_cidade WHERE id_cidade = $id_cidade";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo "❌ Cidade não encontrada!";
    exit;
}

$cidade = $result->fetch_assoc();

$sql_paises = "SELECT id_pais, nome_oficial FROM tb_pais ORDER BY nome_oficial ASC";
$paises = $conn->query($sql_paises);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $novo_nome = $_POST['nome'];
    $nova_populacao = $_POST['populacao'];
    $novo_pais = $_POST['id_pais'];

    if (empty($novo_nome) || empty($nova_populacao) || empty($novo_pais)) {
        $msg = "⚠️ Por favor, preencha todos os campos!";
    } else {
        $sql_update = "UPDATE tb_cidade 
                       SET nome_oficial = '$novo_nome', populacao = '$nova_populacao', id_pais = '$novo_pais' 
                       WHERE id_cidade = $id_cidade";

        if ($conn->query($sql_update) === TRUE) {
            header("Location: ../index.php");
            exit;
        } else {
            $msg = "❌ Erro ao atualizar cidade: " . $conn->error;
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
    <title>Editar Cidade</title>
    <link rel="stylesheet" href="../editar.css">
    <link rel="shortcut icon" href="../../Assets/icon.ico" type="image/x-icon">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="box">
        <div class="container">
            <div class="top-header">
                <header>Editar Cidade</header>
            </div>

            <?php if (isset($msg)) { echo "<p class='error'>$msg</p>"; } ?>

            <form method="POST">
                <div class="input-field">
                    <select name="id_pais" required>
                        <option value="">Selecione o País</option>
                        <?php
                        if ($paises->num_rows > 0) {
                            while ($pais = $paises->fetch_assoc()) {
                                $selected = ($pais['id_pais'] == $cidade['id_pais']) ? "selected" : "";
                                echo "<option value='".$pais['id_pais']."' $selected>".$pais['nome_oficial']."</option>";
                            }
                        }
                        ?>
                    </select>
                    <i class="bx bx-flag"></i>
                </div>

                <div class="input-field">
                    <input type="text" class="input" id="nome" name="nome" 
                           placeholder="Nome da Cidade" 
                           value="<?php echo $cidade['nome_oficial']; ?>" required>
                    <i class="bx bx-building-house"></i>
                </div>

                <div class="input-field">
                    <input type="number" class="input" id="populacao" name="populacao" 
                           placeholder="População" 
                           value="<?php echo $cidade['populacao']; ?>" required>
                    <i class="bx bx-group"></i>
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
