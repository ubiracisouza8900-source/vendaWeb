
import { useState, useEffect } from "react";
import styles from "./Produtos.module.css";

interface Produto {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  preco: string;
  quantidade: string;
}

function Produtos() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [produtos, setProdutos] = useState<Produto[]>(() => {
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos) {
      return JSON.parse(produtosSalvos);
    }

    return [];
  });

  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  function cadastrarProduto(event: React.FormEvent) {
    event.preventDefault();

    const novoProduto: Produto = {
      id:
        produtoEditando !== null
          ? produtos[produtoEditando].id
          : Date.now(),
      nome,
      codigo,
      categoria,
      preco,
      quantidade,
    };

    if (produtoEditando !== null) {
      const novaLista = [...produtos];

      novaLista[produtoEditando] = novoProduto;

      setProdutos(novaLista);
      setProdutoEditando(null);
    } else {
      setProdutos([...produtos, novoProduto]);
    }

    setNome("");
    setCodigo("");
    setCategoria("");
    setPreco("");
    setQuantidade("");
  }

  function excluirProduto(index: number) {
    const novaLista = produtos.filter((_, i) => i !== index);

    setProdutos(novaLista);
  }

  function editarProduto(index: number) {
    const produto = produtos[index];

    setNome(produto.nome);
    setCodigo(produto.codigo);
    setCategoria(produto.categoria);
    setPreco(produto.preco);
    setQuantidade(produto.quantidade);

    setProdutoEditando(index);
  }

  return (
    <div className={styles.container}>

      <h2>Produtos</h2>

      <h3>Cadastrar produto</h3>

      <form onSubmit={cadastrarProduto}>

        <div>
          <label>Nome do produto</label>

          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome"
          />
        </div>

        <div>
          <label>Código de barras</label>

          <input
            type="text"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            placeholder="Digite o código"
          />
        </div>

        <div>
          <label>Categoria</label>

          <input
            type="text"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            placeholder="Digite a categoria"
          />
        </div>

        <div>
          <label>Preço</label>

          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            placeholder="0,00"
          />
        </div>

        <div>
          <label>Quantidade</label>

          <input
            type="number"
            value={quantidade}
            onChange={(event) => setQuantidade(event.target.value)}
            placeholder="0"
          />
        </div>

        <button type="submit">
          {produtoEditando !== null
            ? "Salvar alteração"
            : "Cadastrar produto"}
        </button>

      </form>

      <hr />

      <h3>Produtos cadastrados</h3>

      <table>

        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {produtos.map((produto, index) => (

            <tr key={produto.id}>

              <td>{produto.codigo}</td>

              <td>{produto.nome}</td>

              <td>{produto.categoria}</td>

              <td>R$ {produto.preco}</td>

              <td>{produto.quantidade}</td>

              <td>

                <button
                  onClick={() => editarProduto(index)}
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => excluirProduto(index)}
                >
                  🗑️ Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Produtos;
