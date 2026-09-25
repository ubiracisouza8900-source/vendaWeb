
import { useState } from "react";

interface Venda {
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
  data: string;
}

function Relatorios() {

  const [vendas] = useState<Venda[]>(() => {

    const vendasSalvas = localStorage.getItem("vendas");

    if (vendasSalvas) {
      return JSON.parse(vendasSalvas);
    }

    return [];
  });

  const totalVendas = vendas.length;

  const valorTotal = vendas.reduce(
    (total, venda) => total + venda.total,
    0
  );

  const produtosVendidos = vendas.reduce(
    (total, venda) => total + venda.quantidade,
    0
  );

  return (
    <div>

      <h2>Relatórios</h2>

      <p>Resumo das vendas</p>

      <hr />

      <h3>💰 Total de vendas</h3>
      <p>{totalVendas}</p>

      <h3>💵 Valor total vendido</h3>
      <p>R$ {valorTotal.toFixed(2)}</p>

      <h3>📦 Produtos vendidos</h3>
      <p>{produtosVendidos}</p>

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

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Relatorios;