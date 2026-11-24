
const pesquisarLivro = async (titulo) => {
  try {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}&fields=key,title,author_name,first_publish_year,publisher,language,subject,edition_count,cover_i,number_of_pages_median,isbn&limit=10`;

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Não foi possível consultar a API.");
    }

    const dados = await resposta.json();

    // Evita mostrar registros repetidos
    const livrosUnicos = [];
    const chaves = [];

    dados.docs.forEach((livro) => {
      if (!chaves.includes(livro.key)) {
        chaves.push(livro.key);
        livrosUnicos.push(livro);
      }
    });

    return livrosUnicos;

  } catch (erro) {
    console.log("Erro na API:", erro);
    throw erro;
  }
};

export default pesquisarLivro;
