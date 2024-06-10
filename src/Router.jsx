import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Deposit from "./pages/staking/Deposit";
import Application from "./pages/staking/Application";
import Completed from "./pages/staking/Completed";
import Success from "./pages/staking/Success";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/deposit" />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/deposit/application/:coinId" element={<Application />} />
        <Route path="/deposit/completed/:tokenName" element={<Completed />} />
        <Route path="/deposit/success/:tokenName" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
