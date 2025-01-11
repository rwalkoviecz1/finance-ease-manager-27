import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import DailyRates from "@/pages/DailyRates";
import Invoices from "@/pages/Invoices";
import Reimbursements from "@/pages/Reimbursements";
import Reports from "@/pages/Reports";
import { initDB } from "@/lib/indexedDB";

function App() {
  useEffect(() => {
    initDB().catch(console.error);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/daily-rates" element={<DailyRates />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reimbursements" element={<Reimbursements />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;