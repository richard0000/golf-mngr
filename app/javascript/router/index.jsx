import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "../components/Players";
import Tournaments from "../components/Tournaments";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={"/"} element={<Tournaments />} />
        <Route index path={"/players"} element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
