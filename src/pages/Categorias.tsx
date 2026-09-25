
import { useEffect, useState } from "react";
import styles from "./Categorias.module.css";

function Categorias() {
  const [nome, setNome] = useState("");

  const [categorias, setCategorias] = useState<string[]>(() => {
    const dados = localStorage.getItem("categorias");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [categoriaEditando, setCategoriaEditando] = useState<number | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  function salvarCategoria(event: React.FormEvent) {
    event.preventDefault();

    if (nome.trim() === "") {
      return;
    }

    if (categoriaEditando !== null) {
      const novaLista = [...categorias];

      novaLista[categoriaEditando] = nome;

      setCategorias(novaLista);
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
    const novaLista = categorias.filter((_, i) => i !== index);

    setCategorias(novaLista);
  }

  return (
    <div className={styles.container}>
      <h2>Categorias</h2>
      <p className={styles.subtitulo}>
        Cadastre e organize as categorias dos produtos
      </p>

      <form onSubmit={salvarCategoria}>
        <div>
          <label>Nome da categoria</label>

          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome da categoria"
          />
        </div>

        <button type="submit">
          {categoriaEditando !== null
            ? "Salvar alteração"
            : "Cadastrar categoria"}
        </button>
      </form>

      <h3>Categorias cadastradas</h3>

      <table>
        <thead>
          <tr>
            <th>#</th>
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
                <button
                  type="button"
                  onClick={() => editarCategoria(index)}
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
                  onClick={() => excluirCategoria(index)}
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

export default Categorias;
