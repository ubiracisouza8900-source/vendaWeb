import { useEffect, useState } from "react";
import styles from "./Relatorios.module.css";

interface ItemVenda {
  produtoId: number;
  nome: string;
  codigo: string;
  preco: number;
  quantidade: number;
  total: number;
}

interface Venda {
  id: number;
  itens: ItemVenda[];
  total: number;
  data: string;
}

function Relatorios() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState(
    new Date().getMonth()
  );
  const [anoSelecionado, setAnoSelecionado] = useState(
    new Date().getFullYear()
  );

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  useEffect(() => {
    function carregarVendas() {
      const dados = localStorage.getItem("vendas");

      if (dados) {
        try {
          const vendasSalvas = JSON.parse(dados);

          if (Array.isArray(vendasSalvas)) {
            setVendas(vendasSalvas);
          }
        } catch {
          setVendas([]);
        }
      }
    }

    carregarVendas();

    window.addEventListener(
      "storage",
      carregarVendas
    );

    return () => {
      window.removeEventListener(
        "storage",
        carregarVendas
      );
    };
  }, []);

  function obterDataVenda(data: string) {
    const partes = data.split(",");

    const dataParte = partes[0];

    const partesData = dataParte.split("/");

    if (partesData.length !== 3) {
      return null;
    }

    const dia = Number(partesData[0]);
    const mes = Number(partesData[1]) - 1;
    const ano = Number(partesData[2]);

    return {
      dia,
      mes,
      ano,
    };
  }

  const vendasFiltradas = vendas.filter(
    (venda) => {
      const data = obterDataVenda(
        venda.data
      );

      if (!data) {
        return false;
      }

      return (
        data.mes === mesSelecionado &&
        data.ano === anoSelecionado
      );
    }
  );

  const faturamento =
    vendasFiltradas.reduce(
      (total, venda) =>
        total + Number(venda.total),
      0
    );

  const quantidadeVendas =
    vendasFiltradas.length;

  const quantidadeProdutos =
    vendasFiltradas.reduce(
      (total, venda) => {
        if (!Array.isArray(venda.itens)) {
          return total;
        }

        return (
          total +
          venda.itens.reduce(
            (soma, item) =>
              soma +
              Number(item.quantidade),
            0
          )
        );
      },
      0
    );

  return (
    <div className={styles.container}>
      <h2>Relatório de Faturamento</h2>

      <div className={styles.filtros}>
        <div>
          <label>Mês</label>

          <select
            value={mesSelecionado}
            onChange={(event) =>
              setMesSelecionado(
                Number(event.target.value)
              )
            }
          >
            {meses.map(
              (mes, index) => (
                <option
                  key={mes}
                  value={index}
                >
                  {mes}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label>Ano</label>

          <select
            value={anoSelecionado}
            onChange={(event) =>
              setAnoSelecionado(
                Number(event.target.value)
              )
            }
          >
            {Array.from(
              {
                length: 5,
              },
              (_, index) =>
                new Date().getFullYear() -
                2 +
                index
            ).map((ano) => (
              <option
                key={ano}
                value={ano}
              >
                {ano}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.meses}>
        {meses.map(
          (mes, index) => {
            const faturamentoMes =
              vendas
                .filter((venda) => {
                  const data =
                    obterDataVenda(
                      venda.data
                    );

                  return (
                    data &&
                    data.mes ===
                      index &&
                    data.ano ===
                      anoSelecionado
                  );
                })
                .reduce(
                  (total, venda) =>
                    total +
                    Number(
                      venda.total
                    ),
                  0
                );

            return (
              <button
                type="button"
                key={mes}
                className={
                  index ===
                  mesSelecionado
                    ? styles.mesAtivo
                    : styles.mes
                }
                onClick={() =>
                  setMesSelecionado(
                    index
                  )
                }
              >
                <strong>
                  {mes}
                </strong>

                <span>
                  {faturamentoMes.toLocaleString(
                    "pt-BR",
                    {
                      style:
                        "currency",
                      currency:
                        "BRL",
                    }
                  )}
                </span>
              </button>
            );
          }
        )}
      </div>

      <div className={styles.resumo}>
        <div className={styles.card}>
          <span>
            Faturamento
          </span>

          <strong>
            {faturamento.toLocaleString(
              "pt-BR",
              {
                style:
                  "currency",
                currency:
                  "BRL",
              }
            )}
          </strong>
        </div>

        <div className={styles.card}>
          <span>
            Vendas
          </span>

          <strong>
            {quantidadeVendas}
          </strong>
        </div>

        <div className={styles.card}>
          <span>
            Produtos vendidos
          </span>

          <strong>
            {quantidadeProdutos}
          </strong>
        </div>
      </div>

      <h3>
        Vendas de{" "}
        {meses[mesSelecionado]}{" "}
        de {anoSelecionado}
      </h3>

      {vendasFiltradas.length ===
      0 ? (
        <p>
          Nenhuma venda encontrada
          neste mês.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                Venda
              </th>

              <th>
                Produtos
              </th>

              <th>
                Total
              </th>

              <th>
                Data
              </th>
            </tr>
          </thead>

          <tbody>
            {vendasFiltradas.map(
              (venda) => (
                <tr
                  key={venda.id}
                >
                  <td>
                    #
                    {String(
                      venda.id
                    ).padStart(
                      4,
                      "0"
                    )}
                  </td>

                  <td>
                    {Array.isArray(
                      venda.itens
                    )
                      ? venda.itens.reduce(
                          (
                            total,
                            item
                          ) =>
                            total +
                            Number(
                              item.quantidade
                            ),
                          0
                        )
                      : 0}
                  </td>

                  <td>
                    {Number(
                      venda.total
                    ).toLocaleString(
                      "pt-BR",
                      {
                        style:
                          "currency",
                        currency:
                          "BRL",
                      }
                    )}
                  </td>

                  <td>
                    {venda.data}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Relatorios;