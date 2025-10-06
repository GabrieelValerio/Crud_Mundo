<?php
include '../bd.php';

if (isset($_GET['id_cidade'])) {
    $id_cidade = $_GET['id_cidade'];

    $sql = "DELETE FROM tb_cidade WHERE id_cidade = $id_cidade";

    if ($conn->query($sql) === TRUE) {
        header("location: ../index.php");
        exit;
    } else {
        echo "Erro". $conn->error;
    }

    $conn->close();
}
?>
