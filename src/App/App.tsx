import { FC } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import DungeonsAndDragonsIndex from "../components/DungeonsAndDragons/DungeonsAndDragonsIndex";
import Favourites from "../components/Favourites/Favourites";
import "../App.css";

const App: FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DungeonsAndDragonsIndex />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
};

export default App;
