import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { supabase } from "../../src/lib/supabase";
import { useRouter } from "expo-router";

type Pais = {
  id_pais: number;
  nome_oficial: string;
  idioma: string;
  continente: string;
};

type Cidade = {
  id_cidade: number;
  cidade: string;
  populacao: number;
  id_pais: number;
  pais: {
    nome_oficial: string;
  };
};

export default function ListarCRUD() {
  const router = useRouter();

  const [paises, setPaises] = useState<Pais[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);

  const carregarDados = async () => {
    try {
      const { data: paisesData, error: paisError } = await supabase
        .from("tb_pais")
        .select("*")
        .order("nome_oficial");

      if (paisError) throw paisError;
      setPaises(paisesData || []);

      const { data: cidadesData, error: cidadeError } = await supabase
        .from("tb_cidade")
        .select(`
          id_cidade,
          cidade,
          populacao,
          id_pais,
          tb_pais (nome_oficial)
        `)
        .order("cidade");

      if (cidadeError) throw cidadeError;

      const cidadesFormatadas = cidadesData.map((c: any) => ({
        id_cidade: c.id_cidade,
        cidade: c.cidade,
        populacao: c.populacao,
        id_pais: c.id_pais,
        pais: { nome_oficial: c.tb_pais?.nome_oficial ?? "Desconhecido" },
      }));

      setCidades(cidadesFormatadas);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao carregar dados");
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const excluirCidade = async (id: number) => {
    try {
      await supabase.from("tb_cidade").delete().eq("id_cidade", id);
      carregarDados();
    } catch (error) {
      Alert.alert("Erro", "Erro ao excluir cidade");
    }
  };

  const excluirPais = async (id: number) => {
    try {
      await supabase.from("tb_cidade").delete().eq("id_pais", id);
      await supabase.from("tb_pais").delete().eq("id_pais", id);
      carregarDados();
    } catch (error) {
      Alert.alert("Erro", "Erro ao excluir país");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* BOTÕES NO TOPO */}
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.btnTop}
          onPress={() => router.push("/cadastrar-pais")}
        >
          <Text style={styles.btnTopText}>Cadastrar País</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnTop}
          onPress={() => router.push("/cadastrar-cidade")}
        >
          <Text style={styles.btnTopText}>Cadastrar Cidade</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA DE PAÍSES */}
      <Text style={styles.header}>Países</Text>

      {paises.length === 0 ? (
        <Text style={styles.vazio}>Nenhum país cadastrado</Text>
      ) : (
        paises.map((item) => (
          <View key={item.id_pais} style={styles.item}>
            <Text style={styles.nome}>{item.nome_oficial}</Text>
            <Text style={styles.info}>Idioma: {item.idioma}</Text>
            <Text style={styles.info}>Continente: {item.continente}</Text>

            <View style={styles.actionRow}>
              {/* BOTÃO EDITAR */}
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  router.push(`/editar-pais?id=${item.id_pais}`)
                }
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              {/* BOTÃO EXCLUIR */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => excluirPais(item.id_pais)}
              >
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* LISTA DE CIDADES */}
      <Text style={styles.header}>Cidades</Text>

      {cidades.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma cidade cadastrada</Text>
      ) : (
        cidades.map((item) => (
          <View key={item.id_cidade} style={styles.item}>
            <Text style={styles.nome}>
              {item.cidade} ({item.pais?.nome_oficial})
            </Text>
            <Text style={styles.info}>População: {item.populacao}</Text>

            <View style={styles.actionRow}>
              {/* BOTÃO EDITAR */}
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  router.push(`/editar-cidade?id=${item.id_cidade}`)
                }
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              {/* BOTÃO EXCLUIR */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => excluirCidade(item.id_cidade)}
              >
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#133650", padding: 20 },

  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  btnTop: {
    backgroundColor: "#EBCE7A",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },

  btnTopText: {
    color: "#133650",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },

  header: {
    color: "#EBCE7A",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 10,
  },
  item: {
    backgroundColor: "#7A8EEB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  nome: { fontSize: 18, fontWeight: "700", color: "#133650" },
  info: { color: "#fff", marginTop: 4 },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },

  editBtn: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
  },

  deleteBtn: {
    backgroundColor: "#E53935",
    padding: 8,
    borderRadius: 8,
  },

  actionText: { color: "#fff", fontWeight: "600" },

  vazio: { color: "#fff", textAlign: "center", marginTop: 10 },
});
