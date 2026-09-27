import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

interface Produto {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  preco: string;
  quantidade: string;
}

interface Venda {
  id: number;
  itens: unknown[];
  total: number;
  data: string;
}

function Dashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    function carregarDados() {
      const dadosProdutos =
        localStorage.getItem("produtos");

      const dadosVendas =
        localStorage.getItem("vendas");

      setProdutos(
        dadosProdutos
          ? JSON.parse(dadosProdutos)
          : []
      );

      setVendas(
        dadosVendas
          ? JSON.parse(dadosVendas)
          : []
      );
    }

    carregarDados();

    window.addEventListener(
      "storage",
      carregarDados
    );

    return () => {
      window.removeEventListener(
        "storage",
        carregarDados
      );
    };
  }, []);

  /*
   * DATA DE HOJE
   */
  const hoje = new Date();

  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth() + 1;
  const anoHoje = hoje.getFullYear();

  /*
   * FILTRA SOMENTE AS VENDAS DE HOJE
   */
  const vendasHoje = vendas.filter(
    (venda) => {
      if (!venda.data) {
        return false;
      }

      const partes = venda.data.split(",");

      const dataParte = partes[0];

      const partesData =
        dataParte.split("/");

      if (partesData.length !== 3) {
        return false;
      }

      const dia = Number(
        partesData[0]
      );

      const mes = Number(
        partesData[1]
      );

      const ano = Number(
        partesData[2]
      );

      return (
        dia === diaHoje &&
        mes === mesHoje &&
        ano === anoHoje
      );
    }
  );

  /*
   * TOTAL DE PRODUTOS NO ESTOQUE
   */
  const totalEstoque =
    produtos.reduce(
      (total, item) =>
        total +
        Number(item.quantidade),
      0
    );

  /*
   * QUANTIDADE DE VENDAS DE HOJE
   */
  const totalVendas =
    vendasHoje.length;

  /*
   * FATURAMENTO DE HOJE
   */
  const valorVendas =
    vendasHoje.reduce(
      (total, venda) =>
        total +
        Number(venda.total),
      0
    );

  return (
    <div className={styles.container}>

      <div className={styles.cabecalho}>

        <h2 className={styles.titulo}>
          Dashboard
        </h2>

        <p className={styles.subtitulo}>
          Visão geral do seu supermercado
        </p>

        <p>
          📅 Hoje:{" "}
          {String(diaHoje).padStart(2, "0")}/
          {String(mesHoje).padStart(2, "0")}/
          {anoHoje}
        </p>

      </div>

      <div className={styles.cards}>

        {/* PRODUTOS */}

        <div className={styles.card}>

          <span className={styles.icone}>
            🛒
          </span>

          <div>

            <p className={styles.label}>
              Produtos
            </p>

            <h3>
              {produtos.length}
            </h3>

          </div>

        </div>

        {/* ESTOQUE */}

        <div className={styles.card}>

          <span className={styles.icone}>
            📦
          </span>

          <div>

            <p className={styles.label}>
              Estoque
            </p>

            <h3>
              {totalEstoque}
            </h3>

          </div>

        </div>

        {/* VENDAS DO DIA */}

        <div className={styles.card}>

          <span className={styles.icone}>
            🧾
          </span>

          <div>

            <p className={styles.label}>
              Vendas hoje
            </p>

            <h3>
              {totalVendas}
            </h3>

          </div>

        </div>

        {/* FATURAMENTO DO DIA */}

        <div className={styles.card}>

          <span className={styles.icone}>
            💰
          </span>

          <div>

            <p className={styles.label}>
              Faturamento hoje
            </p>

            <h3>
              {valorVendas.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;