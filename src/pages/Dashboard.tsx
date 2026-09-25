
import { useState } from "react";
import styles from "./Dashboard.module.css";

interface Produto {
  produto: string;
  categoria: string;
  quantidade: string;
}

interface Venda {
  total: number;
}

function Dashboard() {
  const [produtos] = useState<Produto[]>(() => {
    const dados = localStorage.getItem("estoque");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [vendas] = useState<Venda[]>(() => {
    const dados = localStorage.getItem("vendas");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const totalEstoque = produtos.reduce(
    (total, item) => total + Number(item.quantidade),
    0
  );

  const totalVendas = vendas.length;

  const valorVendas = vendas.reduce(
    (total, venda) => total + venda.total,
    0
  );

  return (
    <div className={styles.container}>

      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Dashboard</h2>

        <p className={styles.subtitulo}>
          Visão geral do seu supermercado
        </p>
      </div>

      <div className={styles.cards}>

        <div className={styles.card}>
          <span className={styles.icone}>🛒</span>

          <div>
            <p className={styles.label}>Produtos</p>
            <h3>{produtos.length}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.icone}>📦</span>

          <div>
            <p className={styles.label}>Estoque</p>
            <h3>{totalEstoque}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.icone}>🧾</span>

          <div>
            <p className={styles.label}>Vendas</p>
            <h3>{totalVendas}</h3>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.icone}>💰</span>

          <div>
            <p className={styles.label}>Valor vendido</p>
            <h3>R$ {valorVendas.toFixed(2)}</h3>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;

