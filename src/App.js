import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Register from "./pages/register/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Register />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
