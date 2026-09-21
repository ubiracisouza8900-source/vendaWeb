import { useState } from "react"


export default function Projeto() {



    const [conta, setConta] = useState(0);
    // const [nome, setNome] = useState("");


    function contaodo() {
        setConta(conta + 1);

        if (conta === 8){
            alert("O  Numero tem Mais Que oito")
        }else{
            console.log("");
            
        }

    }


    return (
        <div>
            <input className="" type="number" />
            <button onClick={contaodo} type="button">Conta</button>
            <p>O numero vai Aqui {conta} </p>
            <p>O numero vai Aqui {conta} </p>


        </div>
    )
}
