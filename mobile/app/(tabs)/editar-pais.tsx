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
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";

export default function EditarPais() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [continente, setContinente] = useState("");
  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState("");
  const [idioma, setIdioma] = useState("");

  useEffect(() => {
    const carregarPais = async () => {
      const { data, error } = await supabase
        .from("tb_pais")
        .select("*")
        .eq("id_pais", id)
        .single();

      if (error) {
        Alert.alert("Erro", "Não foi possível carregar o país.");
        return;
      }

      setNome(data.nome_oficial);
      setContinente(data.continente);
      setPopulacao(String(data.populacao));
      setIdioma(data.idioma);
    };

    carregarPais();
  }, [id]);

  const salvarEdicao = async () => {
    if (!nome || !continente || !populacao || !idioma) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const { error } = await supabase
      .from("tb_pais")
      .update({
        nome_oficial: nome,
        continente,
        populacao: Number(populacao),
        idioma,
      })
      .eq("id_pais", id);

    if (error) {
      Alert.alert("Erro", "Falha ao atualizar o país.");
      return;
    }

    Alert.alert("Sucesso", "País atualizado com sucesso!", [
      {
        text: "OK",
        onPress: () => router.push("/(tabs)"), // <- RECARGA O INDEX
      },
    ]);
  };

  const handlePopulacaoChange = (value) => {
    setPopulacao(value.replace(/[^0-9]/g, ""));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar País</Text>

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
        onChangeText={handlePopulacaoChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Idioma Principal"
        placeholderTextColor="#ccc"
        value={idioma}
        onChangeText={setIdioma}
      />

      <TouchableOpacity style={styles.button} onPress={salvarEdicao}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#133650", padding: 20, justifyContent: "center" },
  backButton: { marginBottom: 15 },
  backButtonText: { color: "#EBCE7A", fontSize: 16 },
  title: { color: "#EBCE7A", fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  inputField: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 25, marginBottom: 15 },
  picker: { color: "#fff" },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    color: "#fff",
    padding: 12,
    marginBottom: 15,
  },
  button: { backgroundColor: "#7A8EEB", borderRadius: 25, padding: 15, marginTop: 10 },
  buttonText: { textAlign: "center", color: "#133650", fontWeight: "600", fontSize: 16 },
});
