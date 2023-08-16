import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import ComissaoFinancas from "./pages/comissaofinancas/comissaofinancas";
import Addfinancas from "./pages/comissaofinancas/addfinancas";
import CorpoDiaconal from "./pages/corpodiaconal/corpodiaconal";
import AddDiacono from "./pages/corpodiaconal/adddiacono";
import Membros from "./pages/contacts/membros";
import Novomembro from "./pages/contacts/novomembro";
import Mensageiras from "./pages/mensageiras/mensageiras";
import AddMensageira from "./pages/mensageiras/addmensageira";
import FormFloatingLayoutExample from "./pages/contacts/teste";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";

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
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/membros" element={<Membros />} />
                <Route path="/novomembro" element={<Novomembro />} />
                <Route path="/comissaofinancas" element={<ComissaoFinancas />} />
                <Route path="/addfinancas" element={<Addfinancas />} />
                <Route path="/corpodiaconal" element={<CorpoDiaconal />} />
                <Route path="/adddiacono" element={<AddDiacono />} />
                <Route path="/mensageiras" element={<Mensageiras />} />
                <Route path="/addmensageira" element={<AddMensageira />} />
                {/* <Route path="/contacts" element={<Contacts />} /> */}
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
