import { useEffect, useState } from "react";
import styles from "./Estoque.module.css";

interface Produto {
id: number;
nome: string;
codigo: string;
categoria: string;
preco: string;
quantidade: string;
}

function Estoque() {
const [produtos, setProdutos] = useState<Produto[]>([]);

const [pesquisa, setPesquisa] = useState("");
const [termoPesquisa, setTermoPesquisa] = useState("");

// Carrega os mesmos produtos cadastrados na tela Produtos
useEffect(() => {
function carregarProdutos() {
const produtosSalvos = localStorage.getItem("produtos");

  if (produtosSalvos) {
    setProdutos(JSON.parse(produtosSalvos));
  } else {
    setProdutos([]);
  }
}

carregarProdutos();

// Atualiza o estoque quando houver mudança nos produtos
window.addEventListener("storage", carregarProdutos);

return () => {
  window.removeEventListener("storage", carregarProdutos);
};

}, []);

// Pesquisa por nome, código ou categoria
function pesquisarProduto(event: React.FormEvent) {
event.preventDefault();

setTermoPesquisa(pesquisa.trim().toLowerCase());

}

function limparPesquisa() {
setPesquisa("");
setTermoPesquisa("");
}

const produtosFiltrados = produtos.filter((produto) => {
return (
produto.nome.toLowerCase().includes(termoPesquisa) ||
produto.codigo.toLowerCase().includes(termoPesquisa) ||
produto.categoria.toLowerCase().includes(termoPesquisa)
);
});

return (
<div className={styles.container}>

  <h2>Estoque</h2>

  <p className={styles.subtitulo}>
    Controle os produtos disponíveis no estoque
  </p>

  <h3>Pesquisar produto</h3>

  <form onSubmit={pesquisarProduto}>

    <input
      type="search"
      value={pesquisa}
      onChange={(event) => setPesquisa(event.target.value)}
      placeholder="Digite nome, código ou categoria"
    />

    <button type="submit">
      🔎 Pesquisar
    </button>

    <button
      type="button"
      onClick={limparPesquisa}
    >
      Limpar
    </button>

  </form>

  <hr />

  <h3>Produtos em estoque</h3>

  <p>
    Produtos encontrados: {produtosFiltrados.length}
  </p>

  <table>

    <thead>
      <tr>
        <th>Código</th>
        <th>Produto</th>
        <th>Categoria</th>
        <th>Preço</th>
        <th>Quantidade</th>
      </tr>
    </thead>

    <tbody>

      {produtosFiltrados.map((produto) => (

        <tr key={produto.id}>

          <td>{produto.codigo}</td>

          <td>{produto.nome}</td>

          <td>{produto.categoria}</td>

          <td>
            R$ {produto.preco}
          </td>

          <td>
            {produto.quantidade}
          </td>

        </tr>

      ))}

      {produtosFiltrados.length === 0 && (

        <tr>
          <td colSpan={5}>
            Nenhum produto encontrado.
          </td>
        </tr>

      )}

    </tbody>

  </table>

</div>

);
}

export default Estoque;