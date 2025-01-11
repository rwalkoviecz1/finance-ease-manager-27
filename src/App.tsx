import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Invoices from "./pages/Invoices";
import DailyRates from "./pages/DailyRates";
import Reimbursements from "./pages/Reimbursements";
import Reports from "./pages/Reports";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/daily-rates" element={<DailyRates />} />
        <Route path="/reimbursements" element={<Reimbursements />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;