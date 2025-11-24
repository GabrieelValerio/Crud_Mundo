import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../src/lib/supabase";
import { useNavigation } from "expo-router";

export default function CadastrarCidade() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState("");
  const [paises, setPaises] = useState([]);
  const [idPais, setIdPais] = useState("");

  useEffect(() => {
    const carregarPaises = async () => {
      const { data, error } = await supabase.from("tb_pais").select("*");

      if (error) {
        console.log("Erro ao carregar países:", error);
        Alert.alert("Erro", "Falha ao carregar países");
        return;
      }

      setPaises(data);
    };

    carregarPaises();
  }, []);

  const salvarCidade = async () => {
    if (!nome || !populacao || !idPais) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const cidadeInsert = {
      cidade: nome,
      populacao: Number(populacao),
      id_pais: parseInt(idPais, 10),
    };

    try {
      const { data, error } = await supabase
        .from("tb_cidade")
        .insert([cidadeInsert]);

      if (error) {
        console.log("Erro ao cadastrar cidade:", error);
        Alert.alert("Erro", "Falha ao cadastrar cidade.");
        return;
      }

      Alert.alert("Sucesso", "Cidade cadastrada com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);

      setNome("");
      setPopulacao("");
      setIdPais("");

    } catch (err) {
      console.log("Erro inesperado:", err);
      Alert.alert("Erro", "Falha inesperada ao cadastrar cidade");
    }
  };

  const handlePopulacaoChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setPopulacao(numericValue);
  };

  return (
    <View style={styles.container}>
      
      {/* BOTÃO VOLTAR IGUAL AO CADASTRAR PAÍS */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

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
        onChangeText={handlePopulacaoChange}
      />

      <View style={styles.selectContainer}>
        <Text style={styles.label}>Selecione o País:</Text>

        <Picker
          selectedValue={idPais}
          style={styles.select}
          onValueChange={(value) => setIdPais(value)}
        >
          <Picker.Item label="Escolha um país..." value="" />
          {paises.map((pais) => (
            <Picker.Item
              key={pais.id_pais}
              label={pais.nome_oficial}
              value={pais.id_pais.toString()}
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

  // BOTÃO VOLTAR IGUAL AO DO PAÍS
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
