import Home from "./frontend/src/components/Home";
import SignUp from "./frontend/src/components/SignUp";
import Vacations from "./frontend/src/components/Vacations";
import VacationForm from "./frontend/src/components/VacationForm";
import { submitVacation } from "./frontend/src/services/vacationform";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="/createVacation" element={<VacationForm submitVacation={submitVacation} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
