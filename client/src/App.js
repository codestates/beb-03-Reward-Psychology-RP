import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./component/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
