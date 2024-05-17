// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import To from "./Component/To";
import Viewtodos from "./Component/Viewtodos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<To />} />
          <Route path="/viewtodo" element={<Viewtodos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
