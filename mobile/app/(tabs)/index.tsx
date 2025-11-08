import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from "../../src/api/config";

type Pais = {
  id_pais: number;
  nome_oficial: string;
};

type Cidade = {
  id_cidade: number;
  cidade: string;
  populacao: number;
  pais: string;
};

type CrudData = {
  paises: Pais[];
  cidades: Cidade[];
};

export default function ListarCRUD() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);

  const carregarDados = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}listar_crud.php`);
      const data: CrudData = await response.json();
      setPaises(data.paises);
      setCidades(data.cidades);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar dados");
      console.error(error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Função para excluir país
  const excluirPais = (id: number) => {
    Alert.alert(
      "Confirmação",
      "Deseja realmente excluir este país?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}excluir_pais.php`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id_pais=${id}`,
              });
              const data = await response.text();
              Alert.alert("Resultado", data);
              carregarDados();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir país");
            }
          },
        },
      ]
    );
  };

  // Função para excluir cidade
  const excluirCidade = (id: number) => {
    Alert.alert(
      "Confirmação",
      "Deseja realmente excluir esta cidade?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}excluir_cidade.php`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id_cidade=${id}`,
              });
              const data = await response.text();
              Alert.alert("Resultado", data);
              carregarDados();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir cidade");
            }
          },
        },
      ]
    );
  };

  const renderPais = ({ item }: { item: Pais }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome_oficial}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => excluirPais(item.id_pais)}>
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCidade = ({ item }: { item: Cidade }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.cidade} ({item.pais})</Text>
      <Text style={styles.info}>População: {item.populacao}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => excluirCidade(item.id_cidade)}>
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Países</Text>
      <FlatList
        data={paises}
        keyExtractor={(item) => item.id_pais.toString()}
        renderItem={renderPais}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum país cadastrado</Text>}
      />

      <Text style={styles.header}>Cidades</Text>
      <FlatList
        data={cidades}
        keyExtractor={(item) => item.id_cidade.toString()}
        renderItem={renderCidade}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma cidade cadastrada</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#133650", padding: 20 },
  header: { color: "#EBCE7A", fontSize: 22, fontWeight: "700", marginVertical: 10 },
  item: { backgroundColor: "#7A8EEB", padding: 15, borderRadius: 10, marginBottom: 10 },
  nome: { fontSize: 18, fontWeight: "700", color: "#133650" },
  info: { color: "#fff" },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  deleteBtn: { backgroundColor: "#E53935", padding: 8, borderRadius: 8 },
  actionText: { color: "#fff", fontWeight: "600" },
  vazio: { color: "#fff", textAlign: "center", marginTop: 10 },
});
