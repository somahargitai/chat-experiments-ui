import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const submitMessage = async () => {
    const query = inputValue;
    setInputValue("");
    const response = await fetch(`/api/chat?message=${query}`);
    const data = await response.json();
    setMessages([
      ...messages,
      { type: "query", text: query },
      { type: "response", text: data.message },
    ]);
  };

  return (
    <div>
      <div style={{ height: "50vh", overflowY: "scroll" }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: message.type === "query" ? "row-reverse" : "row",
            }}
          >
            <div style={{ fontWeight: "bold", margin: "10px" }}>
              {message.type === "query" ? "You" : "Bot"}
            </div>
            <div
              style={{
                backgroundColor:
                  message.type === "query" ? "#D6FFB7" : "#F0F0F0",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "30vw",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          style={{ width: "70vw", marginRight: "10px" }}
          value={inputValue}
          onChange={handleInput}
        />
        <button style={{ width: "20vw" }} onClick={submitMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
