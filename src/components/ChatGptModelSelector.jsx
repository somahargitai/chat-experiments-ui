import React, { useEffect, useState } from "react";
import axios from "axios";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ChatGptModelSelector({
  defaultModel,
  setUsedGptModel,
}) {
  const [modelOptions, setModelOptions] = useState([defaultModel]);
  const [gptModel, setGptModel] = React.useState(defaultModel);
  const [open, setOpen] = React.useState(false);

  // useEffect(() => {
  //   setGptModel(modelOptions[0]);
  //   setUsedGptModel(modelOptions[0]);
  // }, []);

  useEffect(() => {
    async function getMessageFromChatGPT() {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4003/chatGpt/listModels",
        params: {
          //    message: query,
        },
        // headers: {
        //   Authorization: `Bearer ${userToken}`,
        // },
      });
      const sortedModels = res.data.sort();

      setModelOptions(sortedModels);
    }
    getMessageFromChatGPT();
  }, []);

  const handleChange = (event) => {
    setGptModel(event.target.value);
    setUsedGptModel(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            GPT Model
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={gptModel}
            label="GptModel"
            onChange={handleChange}
          >
            {modelOptions.map((option, optionIndex) => {
              return (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
