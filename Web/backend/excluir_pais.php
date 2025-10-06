<?php
include '../bd.php';

if (isset($_GET['id_pais'])) {
    $id_cidade = $_GET['id_pais'];

    $sql = "DELETE FROM tb_pais WHERE id_pais = $id_pais";

    if ($conn->query($sql) === TRUE) {
        header("location: ../index.php");
        exit;
    } else {
        echo "Erro". $conn->error;
    }

    $conn->close();
}
?>
