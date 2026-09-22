
import { useEffect, useState } from "react";

function Categorias() {

  const [nome, setNome] = useState("");

  const [categorias, setCategorias] = useState<string[]>(() => {
    const categoriasSalvas = localStorage.getItem("categorias");

    if (categoriasSalvas) {
      return JSON.parse(categoriasSalvas);
    }

    return [];
  });

  const [categoriaEditando, setCategoriaEditando] =
    useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  function cadastrarCategoria(event: React.FormEvent) {
    event.preventDefault();

    if (nome.trim() === "") {
      return;
    }

    if (categoriaEditando !== null) {

      const novasCategorias = [...categorias];

      novasCategorias[categoriaEditando] = nome;

      setCategorias(novasCategorias);

      setCategoriaEditando(null);

    } else {

      setCategorias([...categorias, nome]);

    }

    setNome("");
  }

  function editarCategoria(index: number) {
    setNome(categorias[index]);
    setCategoriaEditando(index);
  }

  function excluirCategoria(index: number) {
    const novasCategorias = categorias.filter(
      (_, i) => i !== index
    );

    setCategorias(novasCategorias);
  }

  return (
    <div>

      <h2>Categorias</h2>

      <h3>
        {categoriaEditando !== null
          ? "Editar categoria"
          : "Cadastrar categoria"}
      </h3>

      <form onSubmit={cadastrarCategoria}>

        <label>Nome da categoria</label>

        <br />

        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          {categoriaEditando !== null
            ? "Salvar alteração"
            : "Cadastrar categoria"}
        </button>

      </form>

      <hr />

      <h3>Categorias cadastradas</h3>

      <table>

        <thead>
          <tr>
            <th>Código</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {categorias.map((categoria, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{categoria}</td>

              <td>

                <button onClick={() => editarCategoria(index)}>
                  Editar
                </button>

                <button onClick={() => excluirCategoria(index)}>
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

export default Categorias;
