
import { useEffect, useState } from "react";
import styles from "./Estoque.module.css";

interface ProdutoEstoque {
  produto: string;
  categoria: string;
  quantidade: string;
}

function Estoque() {
  const [produto, setProduto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [produtos, setProdutos] = useState<ProdutoEstoque[]>(() => {
    const dados = localStorage.getItem("estoque");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("estoque", JSON.stringify(produtos));
  }, [produtos]);

  function cadastrarProduto(event: React.FormEvent) {
    event.preventDefault();

    if (!produto || !categoria || !quantidade) {
      return;
    }

    const novoProduto: ProdutoEstoque = {
      produto,
      categoria,
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

    setProduto("");
    setCategoria("");
    setQuantidade("");
  }

  function editarProduto(index: number) {
    const item = produtos[index];

    setProduto(item.produto);
    setCategoria(item.categoria);
    setQuantidade(item.quantidade);

    setProdutoEditando(index);
  }

  function excluirProduto(index: number) {
    const novaLista = produtos.filter((_, i) => i !== index);

    setProdutos(novaLista);
  }

  return (
    <div className={styles.container}>

      <h2>Estoque</h2>

      <p className={styles.subtitulo}>
        Controle os produtos disponíveis no estoque
      </p>

      <h3>Adicionar produto ao estoque</h3>

      <form onSubmit={cadastrarProduto}>

        <div>
          <label>Produto</label>

          <input
            type="text"
            value={produto}
            onChange={(event) => setProduto(event.target.value)}
            placeholder="Nome do produto"
          />
        </div>

        <div>
          <label>Categoria</label>

          <input
            type="text"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            placeholder="Categoria"
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
            : "Adicionar ao estoque"}
        </button>

      </form>

      <hr />

      <h3>Produtos em estoque</h3>

      <table>

        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {produtos.map((item, index) => (

            <tr key={index}>

              <td>{item.produto}</td>

              <td>{item.categoria}</td>

              <td>{item.quantidade}</td>

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

export default Estoque;
