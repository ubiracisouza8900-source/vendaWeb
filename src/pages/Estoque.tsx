
import { useEffect, useState } from "react";

interface ProdutoEstoque {
  produto: string;
  categoria: string;
  quantidade: string;
}

function Estoque() {

  const [produto, setProduto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [estoque, setEstoque] = useState<ProdutoEstoque[]>(() => {

    const estoqueSalvo = localStorage.getItem("estoque");

    if (estoqueSalvo) {
      return JSON.parse(estoqueSalvo);
    }

    return [];
  });

  const [produtoEditando, setProdutoEditando] =
    useState<number | null>(null);

  useEffect(() => {

    localStorage.setItem(
      "estoque",
      JSON.stringify(estoque)
    );

  }, [estoque]);

  function cadastrarProduto() {

    if (
      produto.trim() === "" ||
      categoria.trim() === "" ||
      quantidade.trim() === ""
    ) {
      return;
    }

    const novoProduto: ProdutoEstoque = {
      produto: produto,
      categoria: categoria,
      quantidade: quantidade
    };

    if (produtoEditando !== null) {

      const novoEstoque = [...estoque];

      novoEstoque[produtoEditando] = novoProduto;

      setEstoque(novoEstoque);

      setProdutoEditando(null);

    } else {

      setEstoque([...estoque, novoProduto]);

    }

    setProduto("");
    setCategoria("");
    setQuantidade("");
  }

  function editarProduto(index: number) {

    setProduto(estoque[index].produto);
    setCategoria(estoque[index].categoria);
    setQuantidade(estoque[index].quantidade);

    setProdutoEditando(index);
  }

  function excluirProduto(index: number) {

    const novoEstoque = estoque.filter(
      (_, i) => i !== index
    );

    setEstoque(novoEstoque);
  }

  return (
    <div>

      <h2>Estoque</h2>

      <h3>
        {produtoEditando !== null
          ? "Editar produto"
          : "Cadastrar produto no estoque"}
      </h3>

      <input
        type="text"
        placeholder="Produto"
        value={produto}
        onChange={(event) => setProduto(event.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(event) => setCategoria(event.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(event) => setQuantidade(event.target.value)}
      />

      <br />
      <br />

      <button onClick={cadastrarProduto}>
        {produtoEditando !== null
          ? "Salvar alteração"
          : "Cadastrar"}
      </button>

      <hr />

      <h3>Produtos em estoque</h3>

      <table>

        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {estoque.map((item, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{item.produto}</td>

              <td>{item.categoria}</td>

              <td>{item.quantidade}</td>

              <td>

                <button
                  onClick={() => editarProduto(index)}
                >
                  Editar
                </button>

                <button
                  onClick={() => excluirProduto(index)}
                >
                  Excluir
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

