import "./App.css";
import CustomNavbar from "./componenets/CustomNavbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./pages/entry/entryPages.jsx";
import CreateUrl from "./pages/CreateUrl/createUrl.jsx";

function App() {
  return (
    <>
      {/* <CustomNavbar></CustomNavbar> */}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/home" element={<CreateUrl />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
