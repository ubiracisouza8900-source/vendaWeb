
import { useEffect, useState } from "react";

interface Cliente {
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

    const clientesSalvos = localStorage.getItem("clientes");

    if (clientesSalvos) {
      return JSON.parse(clientesSalvos);
    }

    return [];
  });

  useEffect(() => {

    localStorage.setItem(
      "clientes",
      JSON.stringify(clientes)
    );

  }, [clientes]);

  function cadastrarCliente(event: React.FormEvent) {

    event.preventDefault();

    if (
      nome.trim() === "" ||
      cpf.trim() === "" ||
      telefone.trim() === "" ||
      email.trim() === ""
    ) {
      return;
    }

    const novoCliente: Cliente = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      email: email
    };

    setClientes([...clientes, novoCliente]);

    setNome("");
    setCpf("");
    setTelefone("");
    setEmail("");
  }

  return (
    <div>

      <h2>Clientes</h2>

      <h3>Cadastrar cliente</h3>

      <form onSubmit={cadastrarCliente}>

        <label>Nome</label>
        <br />

        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Nome do cliente"
        />

        <br />
        <br />

        <label>CPF</label>
        <br />

        <input
          type="text"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
          placeholder="CPF"
        />

        <br />
        <br />

        <label>Telefone</label>
        <br />

        <input
          type="text"
          value={telefone}
          onChange={(event) => setTelefone(event.target.value)}
          placeholder="Telefone"
        />

        <br />
        <br />

        <label>E-mail</label>
        <br />

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-mail"
        />

        <br />
        <br />

        <button type="submit">
          Cadastrar cliente
        </button>

      </form>

    </div>
  );
}

export default Clientes;
