import React, { useEffect, useState } from "react";
import {
  Alert,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_BASE_URL } from "../../src/api/config";

export default function CadastrarCidade() {
  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState("");
  const [paises, setPaises] = useState([]);
  const [idPais, setIdPais] = useState("");

  // Busca os países do banco ao carregar a tela
  useEffect(() => {
    const carregarPaises = async () => {
      try {
        const response = await fetch(`http://192.168.0.255/crud_mundo/Web/backend/listar_paises.php`);
        const data = await response.json();
        setPaises(data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar países");
      }
    };
    carregarPaises();
  }, []);

  const salvarCidade = async () => {
    if (!nome || !populacao || !idPais) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}inserir_cidade.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nome=${nome}&populacao=${populacao}&id_pais=${idPais}`,
      });

      const data = await response.text();
      Alert.alert("Sucesso", data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar cidade");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Cidade</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da cidade"
        placeholderTextColor="#ccc"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="População"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={populacao}
        onChangeText={setPopulacao}
      />

      <View style={styles.selectContainer}>
        <Text style={styles.label}>Selecione o País:</Text>
        <Picker
          selectedValue={idPais}
          style={styles.select}
          onValueChange={(itemValue) => setIdPais(itemValue)}
        >
          <Picker.Item label="Escolha um país..." value="" />
          {paises.map((pais) => (
            <Picker.Item
              key={pais.id_pais}
              label={pais.nome_oficial}
              value={pais.id_pais}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={salvarCidade}>
        <Text style={styles.buttonText}>Salvar Cidade</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#133650",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#EBCE7A",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    color: "#fff",
    padding: 12,
    marginBottom: 15,
  },
  selectContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
  },
  select: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#7A8EEB",
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#133650",
    fontWeight: "600",
    fontSize: 16,
  },
});
