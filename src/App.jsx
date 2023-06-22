import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import ExpressApiNlpjsChat from "./pages/ExpressApiNlpjsChat";
import FastApiBlenderBotChat from "./pages/FastApiBlenderBotChat.jsx";
import ComponentDevelopment from "./pages/ComponentDevelopment";
import ChatGptChat from "./pages/ChatGptChat";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nlpjs" element={<ExpressApiNlpjsChat />} />
        <Route path="/component" element={<ComponentDevelopment />} />
        <Route path="/blenderbot" element={<FastApiBlenderBotChat />} />
        <Route path="/chatgpt" element={<ChatGptChat />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
/*
<ChatButton label="Component Development" url="/component" />
<ChatButton label="Express API NLP.js Chat" url="/nlpjs" />
<ChatButton label="Fast API BlenderBot Chat" url="/blenderbot" />
<ChatButton label="Express API ChatGPT Chat" url="/chatgpt" />
*/
