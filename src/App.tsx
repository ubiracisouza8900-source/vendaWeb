

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import styles from "./App.module.css";

import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import Vendas from "./pages/Vendas";
import Clientes from "./pages/Clientes";
import Categorias from "./pages/Categorias";
import Relatorios from "./pages/Relatórios";

function App() {
  return (
    <BrowserRouter>

      <div className={styles.app}>

        <header className={styles.header}>

          <h1 className={styles.logo}>
            🛒 Supermercado
          </h1>

          <nav className={styles.menu}>

            <Link className={styles.link} to="/">
              Dashboard
            </Link>

            <Link className={styles.link} to="/produtos">
              Produtos
            </Link>

            <Link className={styles.link} to="/estoque">
              Estoque
            </Link>

            <Link className={styles.link} to="/vendas">
              Vendas
            </Link>

            <Link className={styles.link} to="/clientes">
              Clientes
            </Link>

            <Link className={styles.link} to="/categorias">
              Categorias
            </Link>

            <Link className={styles.link} to="/relatorios">
              Relatórios
            </Link>

          </nav>

        </header>

        <main className={styles.main}>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/relatorios" element={<Relatorios/>} />
          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
// import styles from "./App.module.css";

// import Dashboard from "./pages/Dashboard"
// import Produtos from "./pages/Produtos";
// import Estoque from "./pages/Estoque";
// import Vendas from "./pages/Vendas";
// import Clientes from "./pages/Clientes";
// import Categorias from "./pages/Categorias";
// import Relatorios from "./pages/Relatórios"




// function App() {

//   return (

//     <BrowserRouter>


//       <div className={styles.app} >

//         <header className={styles.header}>

//           <h1 className={styles.logo} > Supermercado</h1>



//           <nav className={styles.menu}>

//             <Link className={styles.link} to="/">
//               Dashboard
//             </Link>

//             <Link className={styles.link} to="/produtos">
//               Produtos
//             </Link>

//             <Link className={styles.link} to="/estoque">
//               Estoque
//             </Link>

//             <Link className={styles.link} to="/vendas">
//               Vendas
//             </Link>

//             <Link className={styles.link} to="/clientes">
//               Clientes
//             </Link>

//             <Link className={styles.link} to="/categorias">
//               Categorias
//             </Link>

//             <Link className={styles.link} to="/relatorios">
//               Relatórios
//             </Link>

//           </nav>


//         </header>
//       </div>

//       <main className={styles.main}>

//         <Routes>

//           <Route path="/" element={<Dashboard />} />
//           <Route path="/produtos" element={<Produtos />} />
//           <Route path="/estoque" element={<Estoque />} />
//           <Route path="/vendas" element={<Vendas />} />
//           <Route path="/clientes" element={<Clientes />} />
//           <Route path="/categorias" element={<Categorias />} />
//           <Route path="/relatorios" element={<Relatorios />} />
//         </Routes>
//       </main>

//     </BrowserRouter>

//   )
// }
// export default App;
