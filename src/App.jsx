import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import ExpressApiNlpjsChat from "./ExpressApiNlpjsChat";
import FastApiBlenderBotChat from "./FastApiBlenderBotChat.jsx";
import ComponentDevelopment from "./ComponentDevelopment";
import Landing from "./Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/express-api-nlpjs-chat"
          element={<ExpressApiNlpjsChat />}
        />
        <Route
          path="/component-development"
          element={<ComponentDevelopment />}
        />
        <Route
          path="/fast-api-blenderbot-chat"
          element={<FastApiBlenderBotChat />}
        />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
