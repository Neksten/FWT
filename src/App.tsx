import React, {useEffect, useState} from 'react';
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import axios from "axios";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
