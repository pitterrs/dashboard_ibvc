import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import Topbar from "./pages/global/Topbar";
import Dashboard from "./pages/dashboard";
import ComissaoFinancas from "./pages/comissaofinancas/comissaofinancas";
import Addfinancas from "./pages/comissaofinancas/addfinancas";
import CorpoDiaconal from "./pages/corpodiaconal/corpodiaconal";
import AddDiacono from "./pages/corpodiaconal/adddiacono";
import Membros from "./pages/contacts/membros";
import Novomembro from "./pages/contacts/novomembro";
import Mensageiras from "./pages/mensageiras/mensageiras";
import AddMensageira from "./pages/mensageiras/addmensageira";
import Aniversario from "./pages/contacts/aniversario";
import Transacoes from "./pages/financeiro/transacoes";
import VisaoGeral from "./pages/financeiro/geral";
import Contas from "./pages/financeiro/contas";
import CentroCusto from "./pages/financeiro/custo";
import Lancamentos from "./pages/financeiro/lancamentos";
import Fornecedores from "./pages/financeiro/fornecedores";
import Casamento from "./pages/contacts/casamento";
import Equipes from "./pages/contacts/equipes";
import Login from "./pages/login/login";
import Unauthorized from "./pages/unauthorized/unauthorized";
import Access from "./pages/access/access";
import ErrorPage from "./pages/error/error";
import Error404 from "./pages/error/error404";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
              <main>
                <Topbar />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="*" element={<Error404 />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/membros" element={<Membros />} />
                  <Route path="/novomembro" element={<Novomembro />} />
                  <Route path="/comissaofinancas" element={<ComissaoFinancas />} />
                  <Route path="/addfinancas" element={<Addfinancas />} />
                  <Route path="/corpodiaconal" element={<CorpoDiaconal />} />
                  <Route path="/adddiacono" element={<AddDiacono />} />
                  <Route path="/mensageiras" element={<Mensageiras />} />
                  <Route path="/addmensageira" element={<AddMensageira />} />
                  <Route path="/dashboard" element={<VisaoGeral />} />
                  <Route path="/transacoes" element={<Transacoes />} />
                  <Route path="/contas" element={<Contas />} />
                  <Route path="/centrocusto" element={<CentroCusto />} />
                  <Route path="/lancamentos" element={<Lancamentos />} />
                  <Route path="/fornecedores" element={<Fornecedores />} />
                  <Route path="/aniversario" element={<Aniversario />} />
                  <Route path="/casamento" element={<Casamento />} />
                  <Route path="/equipes" element={<Equipes />} />
                  <Route path="/access" element={<Access />} />
                </Routes>
              </main>
            </div>
          </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
