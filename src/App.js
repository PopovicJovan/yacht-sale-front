import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Auth/Login.js";
import Register from "./pages/Auth/Register.js";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Yachts from "./pages/Yachts";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Profile />}/>
          <Route path="/yachts" element={<Yachts />}/>
        </Routes>
      </Router>
  );
}

export default App;
