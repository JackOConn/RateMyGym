import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gym from "./pages/Gym";
import CreateRating from "./pages/CreateRating";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gym/:id" element={<Gym />} />
        <Route path="/add-rating/:id" element={<CreateRating />} />
      </Routes>
    </div>
  );
}

export default App;
