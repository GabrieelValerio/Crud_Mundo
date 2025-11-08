<?php
include '../bd.php'; // conexão com o banco

// Seleciona todos os países
$sql = "SELECT id_pais, nome_oficial FROM tb_pais ORDER BY nome_oficial ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table border='1' cellpadding='5'>";
    echo "<tr><th>ID</th><th>Nome do País</th></tr>";
    while ($pais = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>".$pais['id_pais']."</td>";
        echo "<td>".$pais['nome_oficial']."</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "Nenhum país cadastrado.";
}

$conn->close();
?>
