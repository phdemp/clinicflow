import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClinicProvider } from "./state/store";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";
import { ScrollToTop } from "./components/ScrollToTop";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Calendar } from "./pages/Calendar";
import { WaitingRoom } from "./pages/WaitingRoom";
import { Patients } from "./pages/Patients";
import { PatientProfile } from "./pages/PatientProfile";
import { Doctors } from "./pages/Doctors";
import { Billing } from "./pages/Billing";
import { Reports } from "./pages/Reports";
import { Communication } from "./pages/Communication";
import { BookingPortal } from "./pages/BookingPortal";

export default function App() {
  return (
    <ClinicProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/book" element={<BookingPortal />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/waiting-room" element={<WaitingRoom />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/:id" element={<PatientProfile />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/communication" element={<Communication />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ClinicProvider>
  );
}
