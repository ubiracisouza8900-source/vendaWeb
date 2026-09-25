
import { useState } from "react";

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
    <div>

      <h2>Dashboard</h2>

      <p>Resumo do supermercado</p>

      <hr />

      <h3>🛒 Produtos</h3>
      <p>{produtos.length}</p>

      <h3>📦 Quantidade em estoque</h3>
      <p>{totalEstoque}</p>

      <h3>💰 Vendas realizadas</h3>
      <p>{totalVendas}</p>

      <h3>💵 Valor total vendido</h3>
      <p>R$ {valorVendas.toFixed(2)}</p>

    </div>
  );
}

export default Dashboard;
