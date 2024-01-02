import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Auth/Login";
import Intro from "./Pages/Intro";

const App = () => {
  return (
    
        <Router>

          <ToastContainer />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
 
  );
};

export default App;