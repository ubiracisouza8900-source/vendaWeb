
import { useEffect, useState } from "react";

interface ProdutoEstoque {
  produto: string;
  categoria: string;
  quantidade: string;
}

interface Venda {
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
  data: string;
}

function Vendas() {

  const [estoque, setEstoque] = useState<ProdutoEstoque[]>(() => {
    const estoqueSalvo = localStorage.getItem("estoque");

    if (estoqueSalvo) {
      return JSON.parse(estoqueSalvo);
    }

    return [];
  });

  const [vendas, setVendas] = useState<Venda[]>(() => {
    const vendasSalvas = localStorage.getItem("vendas");

    if (vendasSalvas) {
      return JSON.parse(vendasSalvas);
    }

    return [];
  });

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "estoque",
      JSON.stringify(estoque)
    );
  }, [estoque]);

  useEffect(() => {
    localStorage.setItem(
      "vendas",
      JSON.stringify(vendas)
    );
  }, [vendas]);

  function selecionarProduto(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {

    const nomeProduto = event.target.value;

    setProdutoSelecionado(nomeProduto);

    const produtoEncontrado = estoque.find(
      (item) => item.produto === nomeProduto
    );

    if (produtoEncontrado) {
      setPreco("");
    }
  }

  function registrarVenda() {

    if (
      produtoSelecionado === "" ||
      quantidade === "" ||
      preco === ""
    ) {
      return;
    }

    const quantidadeVenda = Number(quantidade);
    const precoProduto = Number(preco);

    if (
      quantidadeVenda <= 0 ||
      precoProduto <= 0
    ) {
      return;
    }

    const produtoEncontrado = estoque.find(
      (item) => item.produto === produtoSelecionado
    );

    if (!produtoEncontrado) {
      return;
    }

    const quantidadeEstoque =
      Number(produtoEncontrado.quantidade);

    if (quantidadeVenda > quantidadeEstoque) {
      alert("Quantidade maior que o estoque disponível.");
      return;
    }

    const total = quantidadeVenda * precoProduto;

    const novaVenda: Venda = {
      produto: produtoSelecionado,
      quantidade: quantidadeVenda,
      preco: precoProduto,
      total: total,
      data: new Date().toLocaleString("pt-BR")
    };

    setVendas([...vendas, novaVenda]);

    const novoEstoque = estoque.map((item) => {

      if (item.produto === produtoSelecionado) {

        return {
          ...item,
          quantidade: String(
            quantidadeEstoque - quantidadeVenda
          )
        };
      }

      return item;
    });

    setEstoque(novoEstoque);

    setProdutoSelecionado("");
    setQuantidade("");
    setPreco("");
  }

  function excluirVenda(index: number) {

    const novasVendas = vendas.filter(
      (_, i) => i !== index
    );

    setVendas(novasVendas);
  }

  return (
    <div>

      <h2>Vendas</h2>

      <h3>Registrar venda</h3>

      <label>Produto</label>

      <br />

      <select
        value={produtoSelecionado}
        onChange={selecionarProduto}
      >
        <option value="">
          Selecione um produto
        </option>

        {estoque.map((item, index) => (

          <option
            key={index}
            value={item.produto}
          >
            {item.produto} - Estoque: {item.quantidade}
          </option>

        ))}

      </select>

      <br />
      <br />

      <label>Quantidade</label>

      <br />

      <input
        type="number"
        value={quantidade}
        onChange={(event) =>
          setQuantidade(event.target.value)
        }
        placeholder="Quantidade"
      />

      <br />
      <br />

      <label>Preço unitário</label>

      <br />

      <input
        type="number"
        step="0.01"
        value={preco}
        onChange={(event) =>
          setPreco(event.target.value)
        }
        placeholder="Preço"
      />

      <br />
      <br />

      <button onClick={registrarVenda}>
        Registrar venda
      </button>

      <hr />

      <h3>Histórico de vendas</h3>

      <table>

        <thead>

          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          {vendas.map((venda, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{venda.produto}</td>

              <td>{venda.quantidade}</td>

              <td>
                R$ {venda.preco.toFixed(2)}
              </td>

              <td>
                R$ {venda.total.toFixed(2)}
              </td>

              <td>{venda.data}</td>

              <td>

                <button
                  onClick={() => excluirVenda(index)}
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

export default Vendas;
