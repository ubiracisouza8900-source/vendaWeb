import { useState } from "react";
import styles from "./Relatorios.module.css";

interface Venda {
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
  data: string;
}

function Relatorios() {
  const [vendas] = useState<Venda[]>(() => {
    const dados = localStorage.getItem("vendas");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const totalVendas = vendas.length;

  const valorTotal = vendas.reduce(
    (total, venda) => total + venda.total,
    0
  );

  const quantidadeProdutos = vendas.reduce(
    (total, venda) => total + venda.quantidade,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <h2>Relatórios</h2>
        <p>Resumo das vendas realizadas</p>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <span>🧾</span>
          <div>
            <p>Total de vendas</p>
            <h3>{totalVendas}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <span>📦</span>
          <div>
            <p>Produtos vendidos</p>
            <h3>{quantidadeProdutos}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <span>💰</span>
          <div>
            <p>Valor total</p>
            <h3>R$ {valorTotal.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      <h3 className={styles.tituloTabela}>Histórico de vendas</h3>

      {vendas.length === 0 ? (
        <div className={styles.vazio}>
          <p>Nenhuma venda registrada.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {vendas.map((venda, index) => (
              <tr key={index}>
                <td>{venda.produto}</td>
                <td>{venda.quantidade}</td>
                <td>R$ {venda.preco.toFixed(2)}</td>
                <td>R$ {venda.total.toFixed(2)}</td>
                <td>{venda.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Relatorios;
