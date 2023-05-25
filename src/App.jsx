import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import ChatDemo from "./ChatDemo";
import FastChat from "./FastChat.jsx";
import SmartSelector from "./SmartSelector";
import Landing from "./Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat1" element={<ChatDemo />} />
        <Route path="/chat2" element={<SmartSelector />} />
        <Route path="/fastchat" element={<FastChat />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
