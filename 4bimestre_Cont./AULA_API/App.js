
import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import pesquisarLivro from "./services/api";
import estilos from "./styles/estilos";

// LISTA DE LIVROS DA FUVEST 2027
const obrasFuvest = [
  {
    titulo: "Opúsculo Humanitário",
    autora: "Nísia Floresta",
    ano: "1853"
  },
  {
    titulo: "Nebulosas",
    autora: "Narcisa Amália",
    ano: "1872"
  },
  {
    titulo: "Memórias de Martha",
    autora: "Julia Lopes de Almeida",
    ano: "1899"
  },
  {
    titulo: "Caminho de pedras",
    autora: "Rachel de Queiroz",
    ano: "1937"
  },
  {
    titulo: "A paixão segundo G. H.",
    autora: "Clarice Lispector",
    ano: "1964"
  },
  {
    titulo: "Geografia",
    autora: "Sophia de Mello Breyner Andresen",
    ano: "1967"
  },
  {
    titulo: "Balada de amor ao vento",
    autora: "Paulina Chiziane",
    ano: "1990"
  },
  {
    titulo: "Canção para ninar menino grande",
    autora: "Conceição Evaristo",
    ano: "2018"
  },
  {
    titulo: "A visão das plantas",
    autora: "Djaimilia Pereira de Almeida",
    ano: "2019"
  }
];

export default function App() {

  const [pesquisa, setPesquisa] = useState("");
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // REALIZA A PESQUISA
  const pesquisar = async (titulo = pesquisa) => {

    if (titulo.trim() === "") {
      setMensagem("Digite o nome de um livro.");
      return;
    }

    setPesquisa(titulo);
    setCarregando(true);
    setMensagem("");
    setLivros([]);

    try {
      const resultados = await pesquisarLivro(titulo);

      setLivros(resultados);

      if (resultados.length === 0) {
        setMensagem("Nenhum livro encontrado.");
      }

    } catch (erro) {
      setMensagem("Erro ao consultar os livros. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ScrollView style={estilos.container}>

      {/* CABEÇALHO */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>
          Literatura FUVEST
        </Text>

        <Text style={estilos.subtitulo}>
          Obras obrigatórias de 2027
        </Text>
      </View>

      {/* APRESENTAÇÃO */}
      <View style={estilos.secao}>
        <Text style={estilos.tituloSecao}>
          Bem-vindo!
        </Text>

        <Text style={estilos.texto}>
          Explore as obras literárias da FUVEST 2027.
          Pesquise pelo nome de um livro e encontre
          informações bibliográficas disponíveis na Open Library.
        </Text>
      </View>

      {/* LISTA DE OBRAS */}
      <View style={estilos.secao}>

        <Text style={estilos.tituloSecao}>
          Obras obrigatórias
        </Text>

        <Text style={estilos.texto}>
          Selecione um dos livros abaixo para consultar suas informações.
        </Text>

        {obrasFuvest.map((obra, index) => (

          <TouchableOpacity
            key={index}
            onPress={() => pesquisar(obra.titulo)}
            style={{
              backgroundColor: "#F5F0E8",
              padding: 13,
              borderRadius: 8,
              marginBottom: 10,
              borderLeftWidth: 4,
              borderLeftColor: "#654832"
            }}
          >

            <Text style={{
              color: "#654832",
              fontSize: 16,
              fontWeight: "bold"
            }}>
              {obra.titulo}
            </Text>

            <Text style={{
              color: "#51463D",
              fontSize: 13,
              marginTop: 5
            }}>
              {obra.autora} • {obra.ano}
            </Text>

            <Text style={{
              color: "#8B8177",
              fontSize: 12,
              marginTop: 5
            }}>
              Toque para pesquisar
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* PESQUISA */}
      <View style={estilos.secao}>

        <Text style={estilos.tituloSecao}>
          Pesquisar livro
        </Text>

        <TextInput
          style={estilos.input}
          placeholder="Digite o nome da obra..."
          placeholderTextColor="#8B8177"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        <TouchableOpacity
          style={estilos.botao}
          onPress={() => pesquisar()}
          disabled={carregando}
        >
          <Text style={estilos.textoBotao}>
            {carregando ? "Pesquisando..." : "Pesquisar"}
          </Text>
        </TouchableOpacity>

        {mensagem !== "" && (
          <Text style={estilos.mensagem}>
            {mensagem}
          </Text>
        )}

      </View>

      {/* RESULTADOS DA API */}
      {livros.map((livro, index) => (

        <View key={livro.key || index} style={estilos.card}>

          {livro.cover_i && (
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
              }}
              style={estilos.capa}
              resizeMode="contain"
            />
          )}

          <Text style={estilos.tituloLivro}>
            {livro.title || "Título não informado"}
          </Text>

          <Text style={estilos.tituloInformacao}>
            Autor
          </Text>

          <Text style={estilos.textoInformacao}>
            {livro.author_name
              ? livro.author_name.join(", ")
              : "Informação não disponível"}
          </Text>

          <Text style={estilos.tituloInformacao}>
            Primeira publicação
          </Text>

          <Text style={estilos.textoInformacao}>
            {livro.first_publish_year || "Não informado"}
          </Text>

          {livro.publisher && (
            <>
              <Text style={estilos.tituloInformacao}>
                Editoras
              </Text>

              <Text style={estilos.textoInformacao}>
                {livro.publisher.slice(0, 3).join(", ")}
              </Text>
            </>
          )}

          {livro.language && (
            <>
              <Text style={estilos.tituloInformacao}>
                Idiomas cadastrados
              </Text>

              <Text style={estilos.textoInformacao}>
                {livro.language.slice(0, 5).join(", ")}
              </Text>
            </>
          )}

          {livro.subject && (
            <>
              <Text style={estilos.tituloInformacao}>
                Assuntos relacionados
              </Text>

              <Text style={estilos.textoInformacao}>
                {livro.subject.slice(0, 8).join(", ")}
              </Text>
            </>
          )}

          <Text style={estilos.tituloInformacao}>
            Quantidade de edições
          </Text>

          <Text style={estilos.textoInformacao}>
            {livro.edition_count || "Não informado"}
          </Text>

          {livro.number_of_pages_median && (
            <>
              <Text style={estilos.tituloInformacao}>
                Número mediano de páginas
              </Text>

              <Text style={estilos.textoInformacao}>
                {livro.number_of_pages_median}
              </Text>
            </>
          )}

          {livro.isbn && (
            <>
              <Text style={estilos.tituloInformacao}>
                ISBN cadastrados
              </Text>

              <Text style={estilos.textoInformacao}>
                {livro.isbn.slice(0, 3).join(", ")}
              </Text>
            </>
          )}

        </View>

      ))}

      {/* RODAPÉ */}
      <View style={estilos.rodape}>
        <Text style={estilos.textoRodape}>
          Projeto de Literatura Brasileira
        </Text>

        <Text style={estilos.textoRodape}>
          FUVEST 2027
        </Text>
      </View>

    </ScrollView>
  );
}
