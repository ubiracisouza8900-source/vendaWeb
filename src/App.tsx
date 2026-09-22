
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Link } from "react-router-dom";

import  Dashboard from "./pages/Dashboard"
import Produtos from "./pages/Produtos"; 
import Estoque from "./pages/Estoque"; 
import Vendas from "./pages/Vendas"; 
import Clientes from "./pages/Clientes"; 
import Categorias from "./pages/Categorias"; 
import Relatorios from "./pages/Relatórios"




function App() {
  
  return (
  <BrowserRouter>
  <header>
    <h1>Supermercado</h1>


    <nav>
  <Link to={"/"}>        Dashboard </Link>
  <Link to={"produtos"}> Produtos</Link>
  <Link to="/estoque">   Estoque</Link> 
  <Link to="/vendas">    Vendas</Link>
  <Link to="/clientes">  Clientes</Link>
  <Link to="/categorias">Categorias</Link>
  <Link to="/relatorios">Relatórios</Link>
  
      </nav>
  </header>
  <main>
    <Routes>

     <Route path="/"           element={<Dashboard/>}/> 
     <Route path="/produtos"   element={<Produtos/>} />
     <Route path="/estoque"    element={<Estoque/>} /> 
     <Route path="/vendas"     element={<Vendas/>} />
     <Route path="/clientes"   element={<Clientes/>} />
     <Route path="/categorias" element={<Categorias/>} />
     <Route path="/relatorios" element={<Relatorios/>} />
    </Routes>
  </main>
  </BrowserRouter>
  )}
export default App;

// <div>
//       <header>
//         <h1>🛒 Supermercado</h1>
//       </header>

//       <nav>
//         <button onClick={() => setPagina("Dashboard")} >Dashboard</button>
//         <button onClick={() => setPagina("Produtos")}  >Produtos</button>
//         <button onClick={() => setPagina("Estoque")}   >Estoque</button>
//         <button onClick={() => setPagina("Vendas")}    >Vendas</button>
//         <button onClick={() => setPagina("Clientes")}  >Clientes</button>
//         <button onClick={() => setPagina("Categorias")}>Categorias</button>
//         <button onClick={() => setPagina("Relatórios")}>Relatórios</button>
//       </nav>
      
//       <main>
//         <h2>{pagina}</h2>
//         <p>Bem-vindo ao sistema do supermercado!{pagina}</p>
//       </main>
//     </div>
//   );