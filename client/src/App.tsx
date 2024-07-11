import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";

const App = () => {
  const IsLogin = () => {
    if (!localStorage.token) return <Navigate to="/login" />;

    return <Outlet />;
  };

  return (
    <Routes>
      <Route path="/" element={<IsLogin />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
