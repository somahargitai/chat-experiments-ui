import { useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  Avatar,
  TextField,
  Autocomplete,
} from "@mui/material";

// import  images/logo.png
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectOptions, setSelectOptions] = useState(top100Films);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const submitMessage = async (inputValue) => {
    // const query = inputValue;
    // setInputValue("");
    // const response = await fetch(`/api/chat?message=${query}`);
    // const data = await response.json();
    // setMessages([
    //   ...messages,
    //   { type: "query", text: query },
    //   { type: "response", text: data.message },
    // ]);

    // setMessages([...messages, { type: "query", text: "query" }]);

    if (inputValue.length > 0) {
      setMessages([...messages, { type: "query", text: inputValue }]);
    }
    // { type: "response", text: "data.message" },
  };

  return (
    <>
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

      {/* <LogoComponent
        fill="#065873"
        width="22px"
        height="22px"
        sx={{
          left: 0,
          top: 0,
          position: "absolute",
        }}
      /> */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={selectOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
          renderOption={(props, option, { selected }) => {
            // random array of colors
            // const colors = ["red", "green", "blue", "yellow", "orange"];
            return (
              <li {...props}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  style={{ backgroundColor: selected ? "red" : "green" }}
                >
                  <Typography>{option.label}</Typography>
                </Box>
              </li>
            );
          }}
        />
      </Box>
      <div>
        <div>
          <input
            type="text"
            style={{
              width: "70vw",
              height: "5vh",
              fontSize: "20px",
              marginRight: "10px",
              marginTop: "10px",
            }}
            value={inputValue}
            onChange={handleInput}
            // when enter, send message
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setInputValue("");
                submitMessage(inputValue);
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
          {/* <FormControl
            key="formcontrol"
            sx={{ m: 1, minWidth: 120 }}
          ></FormControl> */}
          {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
          {/* <button
          style={{ width: "20vw", marginTop: "20px" }}
          onClick={submitMessage}
        >
          Send
        </button> */}
        </div>
        <Box>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={() => {
              setMessages([]);
            }}
          >
            Clear
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight="50vh"
          flexWrap="wrap"
          sx={{
            maxWidth: "70vw",
            marginLeft: "2vw",
            marginRight: "2vw",
          }}
        >
          {messages.map((message, index) => (
            <Chip
              key={index}
              label={message.text}
              sx={{
                marginLeft: "5px",
                marginRight: "5px",
                backgroundColor: "#f50057",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ff5983",
                  color: "white",
                },
              }}
            />
          ))}
        </Box>
      </div>
    </>
  );
};

export default Chat;

// <div
//   key={index}
//   style={{
//     display: "flex",
//     flexDirection: message.type === "query" ? "row-reverse" : "row",
//     // color: "grey",
//     color:'black'
//   }}
// >
//   <div
//     style={{
//       backgroundColor:
//         message.type === "query" ? "#FFFFF7" : "#F0F0F0",
//       padding: "10px",
//       borderRadius: "10px",
//       maxWidth: "30vw",
//     }}
//   >
//     {message.text}
//   </div>
// </div>
