import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateRoom from "./pages/room/CreateRoom";
import BookingCalendar from "./pages/bookingCalendar/BookingCalendar";
import Login from "./pages/login/Login";
import AddBokking from "./pages/addBooking/AddBooking";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Routes>
                <Route path="/crearHabitacion" element={<CreateRoom />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<BookingCalendar />} />
                <Route path="/addBooking" element={<AddBokking />} />
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
