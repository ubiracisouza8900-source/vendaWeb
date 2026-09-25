
import { useEffect, useState } from "react";
import styles from "./Clientes.module.css";

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

function Clientes() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const dados = localStorage.getItem("clientes");

    if (dados) {
      return JSON.parse(dados);
    }

    return [];
  });

  const [clienteEditando, setClienteEditando] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  function cadastrarCliente(event: React.FormEvent) {
    event.preventDefault();

    if (!nome || !cpf || !telefone || !email) {
      return;
    }

    const novoCliente: Cliente = {
      id:
        clienteEditando !== null
          ? clientes[clienteEditando].id
          : Date.now(),
      nome,
      cpf,
      telefone,
      email,
    };

    if (clienteEditando !== null) {
      const novaLista = [...clientes];

      novaLista[clienteEditando] = novoCliente;

      setClientes(novaLista);
      setClienteEditando(null);
    } else {
      setClientes([...clientes, novoCliente]);
    }

    setNome("");
    setCpf("");
    setTelefone("");
    setEmail("");
  }

  function editarCliente(index: number) {
    const cliente = clientes[index];

    setNome(cliente.nome);
    setCpf(cliente.cpf);
    setTelefone(cliente.telefone);
    setEmail(cliente.email);

    setClienteEditando(index);
  }

  function excluirCliente(index: number) {
    const novaLista = clientes.filter((_, i) => i !== index);

    setClientes(novaLista);
  }

  return (
    <div className={styles.container}>

      <h2>Clientes</h2>

      <p className={styles.subtitulo}>
        Cadastre e gerencie os clientes do supermercado
      </p>

      <h3>Cadastrar cliente</h3>

      <form onSubmit={cadastrarCliente}>

        <div>
          <label>Nome</label>

          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Nome completo"
          />
        </div>

        <div>
          <label>CPF</label>

          <input
            type="text"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            placeholder="000.000.000-00"
          />
        </div>

        <div>
          <label>Telefone</label>

          <input
            type="text"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label>E-mail</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="cliente@email.com"
          />
        </div>

        <button type="submit">
          {clienteEditando !== null
            ? "Salvar alteração"
            : "Cadastrar cliente"}
        </button>

      </form>

      <hr />

      <h3>Clientes cadastrados</h3>

      <table>

        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {clientes.map((cliente, index) => (

            <tr key={cliente.id}>

              <td>{cliente.nome}</td>

              <td>{cliente.cpf}</td>

              <td>{cliente.telefone}</td>

              <td>{cliente.email}</td>

              <td>

                <button
                  onClick={() => editarCliente(index)}
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => excluirCliente(index)}
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

export default Clientes;
