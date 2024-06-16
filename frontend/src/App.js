import SalaryPage from "./components/SalaryPage";
import StarterPage from "./pages/StarterPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/calculator" element={<SalaryPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
