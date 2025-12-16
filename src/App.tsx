import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { PrivateRoute } from "./pages/PrivateRoute";
import Profile from "./pages/Profile";

import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<PrivateRoute />}>
          <Route path=":userId" element={<Chat />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
