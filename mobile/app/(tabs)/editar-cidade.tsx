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

export default function EditarCidade() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState("");
  const [idPais, setIdPais] = useState("");
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const carregarPaises = async () => {
      const { data } = await supabase.from("tb_pais").select("*").order("nome_oficial");
      setPaises(data || []);
    };

    const carregarCidade = async () => {
      const { data, error } = await supabase
        .from("tb_cidade")
        .select("*")
        .eq("id_cidade", id)
        .single();

      if (error) {
        Alert.alert("Erro", "Falha ao carregar a cidade.");
        return;
      }

      setNome(data.cidade);
      setPopulacao(String(data.populacao));
      setIdPais(String(data.id_pais));
    };

    carregarPaises();
    carregarCidade();
  }, [id]);

  const salvarEdicao = async () => {
    if (!nome || !populacao || !idPais) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("tb_cidade")
      .update({
        cidade: nome,
        populacao: Number(populacao),
        id_pais: Number(idPais),
      })
      .eq("id_cidade", id);

    if (error) {
      Alert.alert("Erro", "Erro ao atualizar a cidade.");
      return;
    }

    Alert.alert("Sucesso", "Cidade atualizada!", [
      { text: "OK", onPress: () => router.back() },
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

      <Text style={styles.title}>Editar Cidade</Text>

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
  label: { color: "#fff", marginBottom: 5 },
  select: { color: "#fff" },
  button: { backgroundColor: "#7A8EEB", borderRadius: 25, padding: 15, marginTop: 10 },
  buttonText: { textAlign: "center", color: "#133650", fontWeight: "600", fontSize: 16 },
});
