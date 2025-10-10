<?php
include '../bd.php';

if (isset($_GET['id_pais'])) {
    $id_pais = (int) $_GET['id_pais'];
    
    // Verifica se o país tem cidades
    $check = $conn->query("SELECT COUNT(*) AS total FROM tb_cidade WHERE id_pais = $id_pais");
    $row = $check->fetch_assoc();
    $tem_cidades = $row['total'] > 0;

    if ($tem_cidades && !isset($_GET['confirmar'])) {
        echo "
        <html lang='pt-br'>
        <head><meta charset='UTF-8'><title>Confirmar exclusão</title></head>
        <body style='font-family:Arial; text-align:center; margin-top:100px;'>
            <h2>⚠️ Este país possui cidades vinculadas!</h2>
            <p>Excluir este país também apagará todas as cidades associadas.</p>
            <p>Deseja continuar?</p>
            <a href='excluir_pais.php?id_pais=$id_pais&confirmar=sim'>✅ Sim, excluir tudo</a> |
            <a href='../index.php'>❌ Cancelar</a>
        </body>
        </html>
        ";
        exit;
    }

    // Se confirmou ou não tem cidades, faz a exclusão
    if ($tem_cidades) {
        $conn->query("DELETE FROM tb_cidade WHERE id_pais = $id_pais");
    }

    $delete_pais = "DELETE FROM tb_pais WHERE id_pais = $id_pais";
    if ($conn->query($delete_pais) === TRUE) {
        header("Location: ../index.php");
        exit;
    } else {
        echo "Erro ao excluir país: " . $conn->error;
    }

} else {
    echo "Erro: ID do país não foi fornecido.";
}
?>
