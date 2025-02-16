import "./App.css";
import CustomNavbar from "./componenets/CustomNavbar.jsx";
import Home from "./componenets/DefaultPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <CustomNavbar></CustomNavbar> */}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
