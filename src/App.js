import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NonLoggedInRoutes from "./routes/NonLoggedInRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/home" element={<Home />} exact />
          <Route path="*" element={<h1 className="testing">Not found</h1>} />
        </Route>
        <Route element={<NonLoggedInRoutes />}>
          <Route path="/" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
