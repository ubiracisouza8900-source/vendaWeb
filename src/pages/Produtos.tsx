
import { useState, useEffect } from "react";

function Produtos() {

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [produtos, setProdutos] = useState<any[]> (()=>{

    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos) {
      return JSON.parse(produtosSalvos);
    }
    return[]

  });

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);


  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);

  function cadastrarProduto(event: React.FormEvent) {
    event.preventDefault();

    const novoProduto = {
      nome,
      codigo,
      categoria,
      preco,
      quantidade
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
    const novaLista = produtos.filter    ((_, i) => i !== index);

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
    <div>
      <h2>Produtos</h2>

      <h3>Cadastrar produto</h3>

      <form onSubmit={cadastrarProduto}>

        <div>
          <label>Nome do produto</label>
          <br />
          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Código de barras</label>
          <br />
          <input
            type="text"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Categoria</label>
          <br />
          <input
            type="text"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Preço</label>
          <br />
          <input
            type="number"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Quantidade</label>
          <br />
          <input
            type="number"
            value={quantidade}
            onChange={(event) => setQuantidade(event.target.value)}
          />
        </div>

        <br />

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
            <tr key={index}>
              <td>{produto.codigo}</td>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>R$ {produto.preco}</td>
              <td>{produto.quantidade}</td>

              <td>
                <td>
                  <button onClick={() => editarProduto(index)}>
                    ✏️ Editar
                  </button>

                  <button onClick={() => excluirProduto(index)}>
                    🗑️ Excluir
                  </button>
                </td>
              </td>
            </tr>


          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Produtos;
