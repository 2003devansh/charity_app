import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import BallFollower from "./components/BallFollower";
import MainLayout from "./components/MainLayout";

const App = () => {
  const location = useLocation();
  const hideCursorOn = ["/", "/register"];

  const shouldHideCursor = hideCursorOn.includes(location.pathname);

  return (
    <div className="relative">
      {!shouldHideCursor && <BallFollower />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
