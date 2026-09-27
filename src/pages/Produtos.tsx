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
  const [produtoEncontrado, setProdutoEncontrado] =
    useState<Produto | null>(null);
  const [entradaPendente, setEntradaPendente] = useState<number | null>(null);


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

    if (!nome || !codigo || !categoria || !preco || !quantidade) {
      alert("Preencha todos os campos.");
      return;
    }

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

    limparFormulario();
  }

  function limparFormulario() {
    setNome("");
    setCodigo("");
    setCategoria("");
    setPreco("");
    setQuantidade("");
  }

  function excluirProduto(index: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

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

  function cancelarEdicao() {
    setProdutoEditando(null);
    limparFormulario();
  }

  function lerCodigoBarras(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const codigoLido = codigo.trim();

    if (!codigoLido) {
      return;
    }

    const produto = produtos.find(
      (item) => item.codigo === codigoLido
    );

    if (produto) {
      setProdutoEncontrado(produto);

      setNome(produto.nome);
      setCategoria(produto.categoria);
      setPreco(produto.preco);

      alert("Produto encontrado. Confira a quantidade.");
    } else {
      setProdutoEncontrado(null);

      alert(
        "Código não encontrado. Você pode continuar o cadastro manualmente."
      );
    }
  }

  function prepararEntrada() {
    if (!produtoEncontrado) {
      alert("Nenhum produto foi encontrado.");
      return;
    }

    const quantidadeEntrada = Number(quantidade);

    if (quantidadeEntrada <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    setEntradaPendente(quantidadeEntrada);
  }
  function confirmarEntrada() {
    if (!produtoEncontrado || entradaPendente === null) {
      return;
    }

    const novaLista = produtos.map((produto) => {
      if (produto.id === produtoEncontrado.id) {
        return {
          ...produto,
          quantidade: String(
            Number(produto.quantidade) + entradaPendente
          ),
        };
      }

      return produto;
    });

    setProdutos(novaLista);

    setProdutoEncontrado(null);
    setEntradaPendente(null);
    limparFormulario();

    alert("Entrada confirmada!");
  }
  function excluirEntrada() {
    setEntradaPendente(null);
    setProdutoEncontrado(null);
    limparFormulario();
  }






  return (
    <div className={styles.container}>

      <h2>Produtos</h2>

      <h3>
        {produtoEditando !== null
          ? "Editar produto"
          : "Cadastrar produto"}
      </h3>

      <form onSubmit={cadastrarProduto}>

        <div>
          <label>Nome do produto</label>

          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Arroz"
          />
        </div>

        <div>
          <label>Categoria</label>

          <input
            type="text"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            placeholder="Ex: Alimentos"
          />
        </div>

        <div>
          <label>Preço</label>

          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            placeholder="0.00"
          />
        </div>

        <div>
          <label>Código de barras</label>

          <input
            type="text"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            onKeyDown={lerCodigoBarras}
            placeholder="Passe o leitor ou digite o código"
            autoComplete="off"

          />
          {produtoEncontrado && (
            <p>
              Produto encontrado: <strong>{produtoEncontrado.nome}</strong>
            </p>
          )}
        </div>



        <div>
          <label>Quantidade</label>

          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(event) => setQuantidade(event.target.value)}
            placeholder="Ex: 10"
          />
        </div>
        {produtoEncontrado && entradaPendente === null && (
          <button
            type="button"
            onClick={prepararEntrada}
          >
            📦 Preparar entrada
          </button>
        )}
        {produtoEncontrado && entradaPendente !== null && (
          <div>

            <p>
              Produto: <strong>{produtoEncontrado.nome}</strong>
            </p>

            <p>
              Estoque atual: {produtoEncontrado.quantidade}
            </p>

            <p>
              Entrada: {entradaPendente}
            </p>

            <p>
              Novo estoque:{" "}
              {Number(produtoEncontrado.quantidade) + entradaPendente}
            </p>

            <button
              type="button"
              onClick={confirmarEntrada}
            >
              ✅ Confirmar
            </button>

            <button
              type="button"
              onClick={() => setEntradaPendente(null)}
            >
              ✏️ Editar
            </button>

            <button
              type="button"
              onClick={excluirEntrada}
            >
              🗑️ Excluir
            </button>

          </div>
        )}


        <button type="submit">
          {produtoEditando !== null
            ? "Confirmar alteração"
            : "Confirmar cadastro"}
        </button>

        {produtoEditando !== null && (
          <button
            type="button"
            onClick={cancelarEdicao}
          >
            Cancelar
          </button>
        )}

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
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {produtos.map((produto, index) => (

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

              <td>

                <button
                  type="button"
                  onClick={() => editarProduto(index)}
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
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