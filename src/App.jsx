import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Head from "./Head";
import Image from "./components/Image";
import Chat from "./components/Chat";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Head />}>
          <Route index element={<Home />} />
          <Route path="image" element={<Image />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
