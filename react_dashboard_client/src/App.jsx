import React from "react";
import { Routes, Route } from "react-router-dom"; // Removendo o BrowserRouter
import Home from "./containers/Home";
import StudentsMngr from "./containers/StudentsMngr";
import AppointmentsMngr from "./containers/AppointmentsMngr";
import ProfessorsMngr from "./containers/ProfessorsMngr";

const App = () => {
  return (
    <Routes>  {/* O Router já está no index.jsx */}
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<StudentsMngr />} />
      <Route path="/schedules" element={<AppointmentsMngr />} />
      <Route path="/professors" element={<ProfessorsMngr />} />
    </Routes>
  );
};

export default App;
