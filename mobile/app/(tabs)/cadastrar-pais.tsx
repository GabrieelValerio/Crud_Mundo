import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

export default function CadastrarPais() {
  const navigation = useNavigation();

  const [continente, setContinente] = useState("");
  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState("");
  const [idioma, setIdioma] = useState("");

  const salvarPais = async () => {
    if (!continente || !nome || !populacao || !idioma) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}inserir_pais.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:
          `continente=${encodeURIComponent(continente)}` +
          `&nome=${encodeURIComponent(nome)}` +
          `&populacao=${populacao}` +
          `&idioma=${encodeURIComponent(idioma)}`,
      });

      const data = await response.text();
      Alert.alert("Resultado", data);

      setContinente("");
      setNome("");
      setPopulacao("");
      setIdioma("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar país");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      {/* BOTÃO VOLTAR */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastrar País</Text>

      <View style={styles.inputField}>
        <Picker
          selectedValue={continente}
          onValueChange={(itemValue) => setContinente(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Continente" value="" />
          <Picker.Item label="América" value="América" />
          <Picker.Item label="Europa" value="Europa" />
          <Picker.Item label="África" value="África" />
          <Picker.Item label="Ásia" value="Ásia" />
          <Picker.Item label="Oceania" value="Oceania" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome do País"
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

      <TextInput
        style={styles.input}
        placeholder="Idioma Principal"
        placeholderTextColor="#ccc"
        value={idioma}
        onChangeText={setIdioma}
      />

      <TouchableOpacity style={styles.button} onPress={salvarPais}>
        <Text style={styles.buttonText}>Cadastrar País</Text>
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

  // BOTÃO VOLTAR
  backButton: {
    backgroundColor: "#7A8EEB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: "#133650",
    fontWeight: "700",
    fontSize: 16,
  },

  inputField: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    marginBottom: 15,
  },
  picker: {
    color: "#fff",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    color: "#fff",
    padding: 12,
    marginBottom: 15,
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
