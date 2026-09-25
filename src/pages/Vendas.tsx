
import { useEffect, useState } from "react";
import styles from "./Vendas.module.css";

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
    const dados = localStorage.getItem("estoque");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [vendas, setVendas] = useState<Venda[]>(() => {
    const dados = localStorage.getItem("vendas");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    localStorage.setItem("estoque", JSON.stringify(estoque));
  }, [estoque]);

  useEffect(() => {
    localStorage.setItem("vendas", JSON.stringify(vendas));
  }, [vendas]);

  function realizarVenda(event: React.FormEvent) {
    event.preventDefault();

    const quantidadeVenda = Number(quantidade);
    const precoVenda = Number(preco);

    const produtoEstoque = estoque.find(
      (item) => item.produto === produto
    );

    if (!produtoEstoque) {
      alert("Produto não encontrado no estoque.");
      return;
    }

    const quantidadeEstoque = Number(produtoEstoque.quantidade);

    if (quantidadeVenda <= 0) {
      alert("Informe uma quantidade válida.");
      return;
    }

    if (quantidadeVenda > quantidadeEstoque) {
      alert("Quantidade maior que o estoque disponível.");
      return;
    }

    const novoEstoque = estoque.map((item) => {
      if (item.produto === produto) {
        return {
          ...item,
          quantidade: String(quantidadeEstoque - quantidadeVenda),
        };
      }

      return item;
    });

    const novaVenda: Venda = {
      produto,
      quantidade: quantidadeVenda,
      preco: precoVenda,
      total: quantidadeVenda * precoVenda,
      data: new Date().toLocaleString("pt-BR"),
    };

    setEstoque(novoEstoque);
    setVendas([...vendas, novaVenda]);

    setProduto("");
    setQuantidade("");
    setPreco("");
  }

  function excluirVenda(index: number) {
    const novaLista = vendas.filter((_, i) => i !== index);

    setVendas(novaLista);
  }

  return (
    <div className={styles.container}>

      <h2>Vendas</h2>

      <p className={styles.subtitulo}>
        Registre as vendas e acompanhe o histórico
      </p>

      <h3>Registrar venda</h3>

      <form onSubmit={realizarVenda}>

        <div>
          <label>Produto</label>

          <select
            value={produto}
            onChange={(event) => setProduto(event.target.value)}
          >
            <option value="">Selecione um produto</option>

            {estoque.map((item, index) => (
              <option key={index} value={item.produto}>
                {item.produto} - Estoque: {item.quantidade}
              </option>
            ))}
          </select>
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

        <div>
          <label>Preço unitário</label>

          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            placeholder="0,00"
          />
        </div>

        <button type="submit">
          💰 Realizar venda
        </button>

      </form>

      <hr />

      <h3>Histórico de vendas</h3>

      <table>

        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          {vendas.map((venda, index) => (
            <tr key={index}>

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

export default Vendas;
