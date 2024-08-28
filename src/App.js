import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./screen/login";
import Dashboard from "./screen/dashboard";
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        {/* Guest*/}
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

        {/* Pet Owner */}

        {/* Test */}
      </Routes>
    </div>
  );
}

export default App;
