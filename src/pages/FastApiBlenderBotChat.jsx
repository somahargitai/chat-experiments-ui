import { useState } from "react";
import { Chip, FormControl, Select, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import Logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

async function getMessageFromApi(data) {
  console.log(data);

  const response = await axios({
    method: "POST",
    url: "http://localhost:8000/process",
    data: data,
  });
  console.log("RESPONSE");
  console.log(response.data);

  return response.data.response;
}

const FastApiBlenderBotChat = () => {
  const navigate = useNavigate();

  const [allUserMessages, setAllUserMessages] = useState([]);
  const [messagesVisible, setMessagesVisible] = useState([]);
  const [inputFieldText, setInputFieldText] = useState("");
  const [selectOptions, setSelectOptions] = useState([
    {
      type: "value",
      label: "Australia",
    },
    {
      type: "value",
      label: "Brazil",
    },
    {
      type: "queryLabel",
      label: "age",
    },
    {
      type: "queryLabel",
      label: "country",
    },
  ]);

  const handleInput = (e) => {
    setInputFieldText(e.target.value);
  };

  const submitMessage = async () => {
    const newUserMessage = inputFieldText;
    const newAllUserMessages = [...allUserMessages, newUserMessage];
    setAllUserMessages(newAllUserMessages);
    console.log("QUESTIONS");
    setInputFieldText("");
    // const response = await fetch(`/api/chat?message=${query}`);

    // const messages = [
    //   "Hello, how can I help you?",
    //   "What services do you offer?",
    //   "How much does it cost?",
    // ];

    const response = await getMessageFromApi(newAllUserMessages);

    // const data = await response.json();
    setMessagesVisible([
      ...messagesVisible,
      { type: "query", text: newUserMessage },
      { type: "response", text: response },
    ]);
    // setMessages([
    //   ...messages,
    //   { type: "query", text: "query" },
    //   { type: "response", text: "data.message" },
    // ]);
  };

  return (
    <>
      <div>
        <img
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          style={{
            marginBottom: "30px",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Typography variant="h5" sx={{ marginBottom: "30px" }}>
          BlenderBot chat
        </Typography>
        <div style={{}}>
          <input
            type="text"
            style={{
              width: "70vw",
              height: "5vh",
              fontSize: "20px",
              marginRight: "10px",
            }}
            value={inputFieldText}
            onChange={handleInput}
            // when enter, send message
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitMessage();
              }
            }}
          />
          {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={10}
          label="Age"
          onChange={() => {
            // handleChange
          }}
        >
        </Select> */}

          {[
            {
              value: 10,
              label: "Ten",
            },
            {
              value: 20,
              label: "Twenty",
            },
            {
              value: 30,
              label: "Thirty",
            },
          ].map((option, index) => {
            <div key={index}>
              boom: boom
              {/* {option.label} */}
              {/* <MenuItem value={option.label}>{option.label}</MenuItem> */}
            </div>;
          })}
          {/* 
          <FormControl
            key="formcontrol"
            sx={{ m: 1, minWidth: 120 }}
          ></FormControl>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
          {/* <button
          style={{ width: "20vw", marginTop: "20px" }}
          onClick={submitMessage}
        >
          Send
        </button> */}
        </div>
        <div
          style={{
            paddingTop: "20px",
            height: "50vh",
            //overflowY: "scroll",
            width: "70vw",
          }}
        >
          {messagesVisible.map((message, index) => (
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
                    message.type === "query" ? "#a6aFa7" : "black",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "30vw",
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
          {/* <Chip
            label="Teste"
            sx={{
              backgroundColor: "#f50057",
              color: "black",
              "&:hover": {
                backgroundColor: "#ff5983",
                color: "black",
              },
            }}
          /> */}
        </div>
      </div>
    </>
  );
};

export default FastApiBlenderBotChat;
