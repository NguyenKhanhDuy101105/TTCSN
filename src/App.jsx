import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AtHousePage from "./pages/AtHousePage";
import AtHopitalPage from "./pages/AtHopitalPage";
import HealthLifePage from "./pages/HealthLifePage";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/Admin/DashBoard/Dashboard"
import MedicalPage from "./components/Admin/CoSoYTe/MedicalPage"
import SpecialtiesPage from "./components/Admin/ChuyenKhoa/SpecialtiesPage"
import DoctorsPage from "./components/Admin/BacSi/DoctorsPage"
import ServicesPage from "./components/Admin/DichVu/ServicesPage";
import PageLogin from "./pages/PageLogin"
import UserPage from "./pages/UserPage";
import SpecialtyPage from "./pages/SpecialtyPage"
import RemotePage from "./pages/RemotePage";
import ForgotPassword from "./components/User/ForgotPassword";
import AuthOTP from "./components/User/AuthOTP";
import AuthChangePass from "./components/User/AuthChangePass";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        // Trang chu
        <Route path="/" element={<Home />} />
        <Route path="/athousepage" element={<AtHousePage />} />
        <Route path="/athopitalpage" element={<AtHopitalPage />} />
        <Route path="/athealthlife" element={<HealthLifePage />} />
        <Route path="/loginpage" element={<PageLogin />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/specialtypage" element={<SpecialtyPage />} />
        <Route path="/remotepage" element={<RemotePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/authotp" element={<AuthOTP />} />
        <Route path="/authchangepass" element={<AuthChangePass />} />
        // Admin
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="medical" element={<MedicalPage />} />
          <Route path="specialties" element={<SpecialtiesPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="appointments" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
