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
import MainPage from "./screen/mainpage";
import BrandWaitList from "./screen/waitingBrand";
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        {/* DASHBOARD*/}
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<MainPage />}>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/login" element={<Login />}></Route>

          {/* ACOUNT MANAGEMENT*/}

          <Route path="/admin/po_account" element={<PoAccount />}></Route>
          <Route path="/admin/sm_account" element={<SmAccount />}></Route>
          <Route path="/admin/waiting_sm_store" element={<SmAccount />}></Route>
          <Route path="/admin/waiting_sm_brand" element={<BrandWaitList />}></Route>

          {/* SUPPORT TICKET*/}

          <Route path="/admin/support" element={<Support />}></Route>

          {/* CATEGORY MANAGEMENT*/}

          <Route path="/admin/list_category" element={<ListCate />}></Route>
          <Route path="/admin/add_category" element={<AddCate />}></Route>

          {/* HISTORY */}
          <Route path="/admin/wd_history" element={<WithdrawHistory />}></Route>
          <Route path="/admin/rc_history" element={<RechargeHistory />}></Route>
          <Route path="/admin/rp_history" element={<ReportHistory />}></Route>
          <Route path="/admin/ot_history" element={<OthersHistory />}></Route>

          {/* Pet Owner */}

          {/* Test */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
