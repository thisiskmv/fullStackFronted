import logo from "./logo.svg";
import "./App.css";
import Post from "./Components/home components/Post";
import { Signup } from "./Components/login signup/Signup";
import { Login } from "./Components/login signup/Login";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Post />} />
      </Routes>
      {/* <Post /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
