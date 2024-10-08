import React from "react";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import CreatePortfolio from "../components/CreatePortfolio";
import CreateResume from "../components/CreateResume";
function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createPortfolio" element={<CreatePortfolio/>}></Route>
        <Route path="/createResume" element={<CreateResume/>}></Route>
      </Routes>
    </div>
  );
}

export default Routing;
