import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./screen/login";
import Dashboard from "./screen/dashboard";

import PoAccount from "./screen/accountManagement_PO";
import SmAccount from "./screen/accountManagement_SM";
import Support from "./screen/support";
import ListCate from "./screen/listOfCategory";
import AddCate from "./screen/addNewCategory";
import WithdrawHistory from "./screen/withdrawHistory";
import RechargeHistory from "./screen/rechargeHistory";
import ReportHistory from "./screen/reportHistory";
import OthersHistory from "./screen/othersHistory";
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        {/* DASHBOARD*/}
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* ACOUNT MANAGEMENT*/}

        <Route path="/po_account" element={<PoAccount />}></Route>
        <Route path="/sm_account" element={<SmAccount />}></Route>

        {/* SUPPORT TICKET*/}

        <Route path="/support" element={<Support />}></Route>

        {/* CATEGORY MANAGEMENT*/}

        <Route path="/list_category" element={<ListCate />}></Route>
        <Route path="/add_category" element={<AddCate />}></Route>

        {/* HISTORY */}
        <Route path="/wd_history" element={<WithdrawHistory />}></Route>
        <Route path="/rc_history" element={<RechargeHistory />}></Route>
        <Route path="/rp_history" element={<ReportHistory />}></Route>
        <Route path="/ot_history" element={<OthersHistory />}></Route>

        {/* Pet Owner */}

        {/* Test */}
      </Routes>
    </div>
  );
}

export default App;
