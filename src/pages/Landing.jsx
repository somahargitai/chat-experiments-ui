import { Button, Container, Stack } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Landing = () => {
  return (
    <Container>
      {/* <Counter /> */}
      <img
        src="../images/logo.png"
        alt="logo"
        style={{ height: "100px", paddingBottom: "20px" }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <ChatButton label="Component Development" url="/component" />
        <ChatButton label="Express API NLP.js" url="/nlpjs" />
        <ChatButton label="Fast API BlenderBot" url="/blenderbot" />
        <ChatButton label="Express API ChatGPT" url="/chatgpt" />
      </Stack>
    </Container>
  );
};

export default Landing;

function ChatButton({ label, url }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => {
        navigate(url);
      }}
    >
      {label}
    </Button>
  );
}

ChatButton.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

function Counter() {
  const [count, setCount] = useState(0);
  // Create a reference for the interval.
  const intervalRef = useRef(null);

  function startCounting() {
    // Clear interval if it already exists.
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }

  function stopCounting() {
    // Clear the interval
    clearInterval(intervalRef.current);
    // Focus on the input field
    inputEl.current.focus();
  }

  // Use the useRef hook to create a reference to the input field.
  const inputEl = useRef(null);

  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        type="text"
        ref={inputEl}
        value={inputValue}
        onChange={(e) => {
          console.log(e.target.value);
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log(inputEl);
            console.log("Enter key pressed");
          }
        }}
      />

      <p>Count: {count}</p>
      <button onClick={startCounting}>Start Counting</button>
      <button onClick={stopCounting}>Stop Counting</button>
    </div>
  );
}
