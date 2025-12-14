import Chat from "./pages/Chat";
import Home from "./pages/Home";
import { PrivateRoute } from "./pages/PrivateRoute";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router";

const video = document.querySelector("video");
if (video) {
  video.play().catch((err) => {
    if (err.name !== "AbortError") {
      console.error("Unexpected playback error:", err);
    }
  });
}

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/chat" element={<PrivateRoute />}>
          <Route path=":userId" element={<Chat />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
