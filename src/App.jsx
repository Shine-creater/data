import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Create from "./assets/components/Create"; // Import your components
import Read from "./assets/components/Read";
import Update from "./assets/components/Update";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/all" element={<Read />} />
          <Route exact path="/id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
