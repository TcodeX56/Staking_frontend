import { SolanaProvider } from "./Context/SolanaProvider";
import { Navbar } from "./Component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Counter } from "./Component/Counter";
import { TodoApp } from "./Pages/TodoApp";
import { SolTransfer } from "./Pages/SolTransfer";
// import { TokenCreator } from "./Pages/TokenCreator";
import { TokenCreate } from "./Pages/TokenCreate";
import { Staking } from "./Pages/Staking";

function App() {
  return (
    <>
      <SolanaProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/counter" element={<Counter />} />
            <Route path="/todoApp" element={<TodoApp />} />
            <Route path="/Soltrx" element={<SolTransfer />} />
            <Route path="/tokenCreator" element={<TokenCreate />} />
            <Route path="/stake" element={<Staking />} />

            
          </Routes>
          {/* <Metadata/> */}
          {/* <TransactionDetail/> */}

          {/* <StudentTransaction/> */}

          {/* <MovieDetails/> */}
          {/* <AddresssInfo/> */}
        </BrowserRouter>
      </SolanaProvider>
    </>
  );
}

export default App;
