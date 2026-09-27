import { useEffect, useRef, useState } from "react";
import styles from "./Vendas.module.css";

interface Produto {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  preco: string;
  quantidade: string;
}

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

function Vendas() {
  const campoCodigo = useRef<HTMLInputElement>(null);

  const [produtos, setProdutos] = useState<Produto[]>(() => {
    const dados = localStorage.getItem("produtos");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [vendas, setVendas] = useState<Venda[]>(() => {
    const dados = localStorage.getItem("vendas");

    if (dados) {
      try {
        const vendasSalvas = JSON.parse(dados);

        // Verifica se os dados antigos estão no formato correto
        if (
          Array.isArray(vendasSalvas) &&
          vendasSalvas.every((venda) => Array.isArray(venda.itens))
        ) {
          return vendasSalvas;
        }
      } catch {
        return [];
      }
    }

    return [];
  });

  const [carrinho, setCarrinho] = useState<ItemVenda[]>([]);
  const [codigo, setCodigo] = useState("");
  const [comprovante, setComprovante] = useState<Venda | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "produtos",
      JSON.stringify(produtos)
    );
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem(
      "vendas",
      JSON.stringify(vendas)
    );
  }, [vendas]);

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

    if (!produto) {
      alert("Produto não encontrado.");
      setCodigo("");
      campoCodigo.current?.focus();
      return;
    }

    adicionarProduto(produto);

    setCodigo("");

    campoCodigo.current?.focus();
  }

  function adicionarProduto(produto: Produto) {
    const estoqueDisponivel = Number(
      produto.quantidade
    );

    const itemExistente = carrinho.find(
      (item) => item.produtoId === produto.id
    );

    const quantidadeNoCarrinho = itemExistente
      ? itemExistente.quantidade
      : 0;

    if (quantidadeNoCarrinho >= estoqueDisponivel) {
      alert(
        `Não há mais unidades de ${produto.nome} no estoque.`
      );
      return;
    }

    const preco = Number(
      String(produto.preco).replace(",", ".")
    );

    if (itemExistente) {
      const novoCarrinho = carrinho.map((item) => {
        if (item.produtoId === produto.id) {
          const novaQuantidade =
            item.quantidade + 1;

          return {
            ...item,
            quantidade: novaQuantidade,
            total: novaQuantidade * item.preco,
          };
        }

        return item;
      });

      setCarrinho(novoCarrinho);

      return;
    }

    const novoItem: ItemVenda = {
      produtoId: produto.id,
      nome: produto.nome,
      codigo: produto.codigo,
      preco,
      quantidade: 1,
      total: preco,
    };

    setCarrinho([
      ...carrinho,
      novoItem,
    ]);
  }

  function aumentarQuantidade(
    item: ItemVenda
  ) {
    const produto = produtos.find(
      (produto) =>
        produto.id === item.produtoId
    );

    if (!produto) {
      return;
    }

    if (
      item.quantidade >=
      Number(produto.quantidade)
    ) {
      alert(
        "Não há mais unidades no estoque."
      );
      return;
    }

    const novoCarrinho = carrinho.map(
      (itemCarrinho) => {
        if (
          itemCarrinho.produtoId ===
          item.produtoId
        ) {
          const novaQuantidade =
            itemCarrinho.quantidade + 1;

          return {
            ...itemCarrinho,
            quantidade: novaQuantidade,
            total:
              novaQuantidade *
              itemCarrinho.preco,
          };
        }

        return itemCarrinho;
      }
    );

    setCarrinho(novoCarrinho);
  }

  function diminuirQuantidade(
    item: ItemVenda
  ) {
    if (item.quantidade === 1) {
      removerProduto(item.produtoId);
      return;
    }

    const novoCarrinho = carrinho.map(
      (itemCarrinho) => {
        if (
          itemCarrinho.produtoId ===
          item.produtoId
        ) {
          const novaQuantidade =
            itemCarrinho.quantidade - 1;

          return {
            ...itemCarrinho,
            quantidade: novaQuantidade,
            total:
              novaQuantidade *
              itemCarrinho.preco,
          };
        }

        return itemCarrinho;
      }
    );

    setCarrinho(novoCarrinho);
  }

  function removerProduto(
    produtoId: number
  ) {
    const novoCarrinho =
      carrinho.filter(
        (item) =>
          item.produtoId !== produtoId
      );

    setCarrinho(novoCarrinho);

    setTimeout(() => {
      campoCodigo.current?.focus();
    }, 100);
  }

  function finalizarVenda() {
    if (carrinho.length === 0) {
      alert(
        "Nenhum produto foi adicionado à venda."
      );
      return;
    }

    const total = carrinho.reduce(
      (soma, item) =>
        soma + item.total,
      0
    );

    const novoId =
      vendas.length > 0
        ? Math.max(
            ...vendas.map(
              (venda) => venda.id
            )
          ) + 1
        : 1;

    const novaVenda: Venda = {
      id: novoId,
      itens: [...carrinho],
      total,
      data: new Date().toLocaleString(
        "pt-BR"
      ),
    };

    const novosProdutos =
      produtos.map((produto) => {
        const itemVenda =
          carrinho.find(
            (item) =>
              item.produtoId ===
              produto.id
          );

        if (!itemVenda) {
          return produto;
        }

        const novoEstoque =
          Number(produto.quantidade) -
          itemVenda.quantidade;

        return {
          ...produto,
          quantidade:
            String(novoEstoque),
        };
      });

    setProdutos(novosProdutos);

    setVendas([
      ...vendas,
      novaVenda,
    ]);

    setComprovante(novaVenda);

    setCarrinho([]);

    setCodigo("");
  }

  function novaVenda() {
    setComprovante(null);
    setCarrinho([]);
    setCodigo("");

    setTimeout(() => {
      campoCodigo.current?.focus();
    }, 100);
  }

  function imprimirComprovante() {
    window.print();
  }

  const totalCarrinho =
    carrinho.reduce(
      (total, item) =>
        total + item.total,
      0
    );

  return (
    <div className={styles.container}>

      {!comprovante && (
        <>
          <h2>PDV - Vendas</h2>

          <p className={styles.subtitulo}>
            Passe o código de barras no leitor
          </p>

          <div>
            <label>
              Código de barras
            </label>

            <input
              ref={campoCodigo}
              type="text"
              value={codigo}
              onChange={(event) =>
                setCodigo(
                  event.target.value
                )
              }
              onKeyDown={
                lerCodigoBarras
              }
              placeholder="Bipe o código de barras"
              autoFocus
              autoComplete="off"
            />
          </div>

          <hr />

          <h3>
            Produtos da venda
          </h3>

          {carrinho.length === 0 ? (
            <p>
              Aguardando leitura do
              código de barras...
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    Produto
                  </th>

                  <th>
                    Quantidade
                  </th>

                  <th>
                    Preço
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Ação
                  </th>
                </tr>
              </thead>

              <tbody>
                {carrinho.map(
                  (item) => (
                    <tr
                      key={
                        item.produtoId
                      }
                    >
                      <td>
                        {item.nome}
                      </td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            diminuirQuantidade(
                              item
                            )
                          }
                        >
                          -
                        </button>

                        {" "}

                        {item.quantidade}

                        {" "}

                        <button
                          type="button"
                          onClick={() =>
                            aumentarQuantidade(
                              item
                            )
                          }
                        >
                          +
                        </button>
                      </td>

                      <td>
                        R${" "}
                        {item.preco.toFixed(
                          2
                        )}
                      </td>

                      <td>
                        R${" "}
                        {item.total.toFixed(
                          2
                        )}
                      </td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            removerProduto(
                              item.produtoId
                            )
                          }
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}

          <hr />

          <h2>
            TOTAL:{" "}
            {totalCarrinho.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
          </h2>

          <button
            type="button"
            onClick={
              finalizarVenda
            }
            disabled={
              carrinho.length === 0
            }
          >
            💰 Finalizar venda
          </button>

          <hr />

          <h3>
            Histórico de vendas
          </h3>

          {vendas.length === 0 ? (
            <p>
              Nenhuma venda realizada.
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
                {vendas.map(
                  (venda) => (
                    <tr
                      key={
                        venda.id
                      }
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
                        {venda.itens.reduce(
                          (
                            total,
                            item
                          ) =>
                            total +
                            item.quantidade,
                          0
                        )}
                      </td>

                      <td>
                        R${" "}
                        {venda.total.toFixed(
                          2
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
        </>
      )}

      {comprovante && (
        <div className={styles.comprovante}>

          <h2>
            COMPROVANTE DE VENDA
          </h2>

          <p>
            Venda #
            {String(
              comprovante.id
            ).padStart(4, "0")}
          </p>

          <p>
            {comprovante.data}
          </p>

          <hr />

          <table>
            <thead>
              <tr>
                <th>
                  Produto
                </th>

                <th>
                  Qtd.
                </th>

                <th>
                  Preço
                </th>

                <th>
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {comprovante.itens.map(
                (item) => (
                  <tr
                    key={
                      item.produtoId
                    }
                  >
                    <td>
                      {item.nome}
                    </td>

                    <td>
                      {item.quantidade}
                    </td>

                    <td>
                      R${" "}
                      {item.preco.toFixed(
                        2
                      )}
                    </td>

                    <td>
                      R${" "}
                      {item.total.toFixed(
                        2
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <hr />

          <h2>
            TOTAL:{" "}
            {comprovante.total.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
          </h2>

          <button
            type="button"
            onClick={
              imprimirComprovante
            }
          >
            🖨️ Imprimir comprovante
          </button>

          {" "}

          <button
            type="button"
            onClick={
              novaVenda
            }
          >
            🛒 Nova venda
          </button>

        </div>
      )}

    </div>
  );
}

export default Vendas;