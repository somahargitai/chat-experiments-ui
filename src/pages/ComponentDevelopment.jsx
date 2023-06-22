import {
  useState,
  useRef,
  //   forwardRef, createRef
} from "react";
import {
  Box,
  Chip,
  Button,
  Drawer,
  Typography,
  IconButton,
  Snackbar,
  TextField,
  Autocomplete,
  MenuItem,
  Menu,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// import  images/logo.png
import Logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  const filterOptions = [
    {
      label: "country",
    },
    {
      label: "followersCount",
    },
    {
      label: "wine type",
    },
  ];

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

  const countries = [
    { label: "Afghanistan" },
    { label: "Albania" },
    { label: "Algeria" },
    { label: "Andorra" },
    { label: "Angola" },
    { label: "Antigua and Barbuda" },
    { label: "Argentina" },
    { label: "Armenia" },
    { label: "Australia" },
    { label: "Austria" },
    { label: "Azerbaijan" },
    { label: "Bahamas" },
    { label: "Bahrain" },
    { label: "Bangladesh" },
    { label: "Barbados" },
    { label: "Belarus" },
    { label: "Belgium" },
    { label: "Belize" },
    { label: "Benin" },
    { label: "Bhutan" },
    { label: "Bolivia" },
    { label: "Bosnia and Herzegovina" },
    { label: "Botswana" },
    { label: "Brazil" },
    { label: "Brunei" },
    { label: "Bulgaria" },
    { label: "Burkina Faso" },
    { label: "Burundi" },
    { label: "Côte d'Ivoire" },
    { label: "Cabo Verde" },
    { label: "Cambodia" },
    { label: "Cameroon" },
    { label: "Canada" },
    { label: "Central African Republic" },
    { label: "Chad" },
    { label: "Chile" },
    { label: "China" },
    { label: "Colombia" },
    { label: "Comoros" },
    { label: "Congo (Congo-Brazzaville)" },
    { label: "Costa Rica" },
    { label: "Croatia" },
    { label: "Cuba" },
    { label: "Cyprus" },
    { label: "Czechia (Czech Republic)" },
    { label: "Democratic Republic of the Congo" },
    { label: "Denmark" },
    { label: "Djibouti" },
    { label: "Dominica" },
    { label: "Dominican Republic" },
    { label: "Ecuador" },
    { label: "Egypt" },
    { label: "El Salvador" },
    { label: "Equatorial Guinea" },
    { label: "Eritrea" },
    { label: "Estonia" },
    { label: "Eswatini (fmr. Swaziland)" },
    { label: "Ethiopia" },
    { label: "Fiji" },
    { label: "Finland" },
    { label: "France" },
    { label: "Gabon" },
    { label: "Gambia" },
    { label: "Georgia" },
    { label: "Germany" },
    { label: "Ghana" },
    { label: "Greece" },
    { label: "Grenada" },
    { label: "Guatemala" },
    { label: "Guinea" },
    { label: "Guinea-Bissau" },
    { label: "Guyana" },
    { label: "Haiti" },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    // secondInput.current && secondInput.current.focus();
    setOpenDrawer(false);
  };

  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const clearButtonRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [drawerInputValue, setDrawerInputValue] = useState("");
  const [currentOptions, setCurrentOptions] = useState([]);
  const [viewRecommendationMenu, setViewRecommendationMenu] = useState(false);
  const [selectedFiltersList, setSelectedFiltersList] = useState([]); // { label: "country", value: "Alabama" }
  const [activeFilter, setActiveFilter] = useState();

  const handleFilterInput = (option) => {
    setSelectedFiltersList([
      ...selectedFiltersList,
      {
        label: activeFilter.label,
        value: option.label,
      },
    ]);
    setActiveFilter(null);
  };

  const handleInput = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
    if (inputText) {
      setViewRecommendationMenu(true);
    } else {
      setViewRecommendationMenu(false);
    }
    // setCurrentOptions
    const ops = getSearchBarOptions(inputText);
    setCurrentOptions(ops);
  };

  const handleDrawerInput = (e) => {
    // setInputValue(e.target.value);
    // drawerInputValue
    console.log("handle drawer input");
    setDrawerInputValue(e.target.value);
  };

  function getSearchBarOptions(text) {
    if (activeFilter) {
      if (activeFilter.label === "country") {
        // first 5 matching items from countries
        let countryMatches = countries.reduce((acc, item) => {
          if (item.label.toLowerCase().includes(text.toLowerCase())) {
            acc.push(item);
          }
          return acc;
        }, []);

        return countryMatches;
      }

      return [
        {
          label: "some other filter",
        },
        {
          label: "some other filter",
        },
      ];
    }

    let filterOptionArray = [];
    let movieOptionArray = [];
    let combinedArray = [];
    // find item which has the text in filterOptions label
    filterOptions.forEach((item) => {
      if (item.label.toLowerCase().includes(text.toLowerCase())) {
        filterOptionArray.push({
          ...item,
          type: "filter",
        });
      }
    });
    // find item which has the text in top100Films label
    top100Films.forEach((item) => {
      if (item.label.toLowerCase().includes(text.toLowerCase())) {
        movieOptionArray.push({
          ...item,
          type: "movie",
        });
      }
    });

    const maximumFilterToShow = 3;
    const maximumOptionToShow = 5;
    for (
      let foIndex = 0;
      foIndex < filterOptionArray.length && foIndex < maximumFilterToShow;
      foIndex++
    ) {
      combinedArray.push(filterOptionArray[foIndex]);
    }
    // fill the rest of the array with movie options until it has 5 items
    for (
      let moIndex = 0;
      moIndex < movieOptionArray.length && moIndex < maximumOptionToShow;
      moIndex++
    ) {
      combinedArray.push(movieOptionArray[moIndex]);
    }
    return combinedArray;
  }

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

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const checkFilterValue = (filter, input) => {
    if (filter.label === "country") {
      return countries.some((item) => item.label === input);
    }
    return false;
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          anchor="right"
          open={openDrawer}
          // onClose={handleDrawerClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleDrawerClose();
            }
          }}
        >
          <Box
            sx={{ width: 450 }} // Set width as needed
            // role="presentation"
            // onClick={handleDrawerClose}
          >
            <IconButton
              aria-label="close"
              onClick={() => {
                handleDrawerClose();
              }}
              sx={{
                // position: "absolute",

                marginTop: "1px",
                marginLeft: "7px",
                // color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <input
              ref={secondInput}
              type="text"
              value={drawerInputValue}
              onChange={handleDrawerInput}
              placeholder="Type here to chat with the tool..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitMessage(drawerInputValue);
                  setDrawerInputValue("");
                }
              }}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                borderBottom: "1px solid #ccc",
                fontSize: "18px",
                padding: "10px",
                outline: "none",
              }}
            />

            {messages.map((message, index) => (
              <Chip
                // remove when onclick
                onClick={() => {
                  const newMessages = messages.filter((item, i) => i !== index);
                  setMessages(newMessages);
                }}
                icon={<CloseIcon />}
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
        </Drawer>
      </Box>
      <Snackbar
        // top right
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="info"
          sx={{ width: "100%" }}
        >
          You can only select allowed filters and filter values here. <br /> For
          more information click on the help icon.
        </Alert>
      </Snackbar>

      <img
        src={Logo}
        alt="Logo"
        width={100}
        height={100}
        style={{
          zIndex: 1000,
          marginBottom: "30px",
        }}
        onClick={() => {
          navigate("/");
        }}
      />
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        Component development
      </Typography>
      <div
        style={{
          position: "relative",
        }}
      >
        <div>
          {selectedFiltersList.length > 0 && (
            <Box
              style={{
                width: "70vw",
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                top: "120px",
              }}
            >
              {selectedFiltersList.map((item, index) => (
                <Chip
                  icon={<CloseIcon />}
                  onClick={() => {
                    const newSelectedFiltersList = selectedFiltersList.filter(
                      (item, i) => i !== index
                    );
                    setSelectedFiltersList(newSelectedFiltersList);
                  }}
                  key={index}
                  label={`${item.label} : ${item.value}`}
                  variant="outlined"
                  sx={{
                    marginRight: "10px",
                    color: "#f5f5f5",
                  }}
                />
              ))}
            </Box>
          )}

          {activeFilter && (
            <div
              style={{
                position: "absolute",
                top: "13px",
                left: "0px",
                width: "200px",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={() => {
                  setActiveFilter(null);
                }}
                sx={{
                  position: "absolute",

                  marginTop: "1px",
                  marginLeft: "7px",
                  // color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>

              <Chip
                label={`${activeFilter.label}: `}
                variant="outlined"
                sx={{
                  marginTop: "3px",
                  marginLeft: "5px",
                  backgroundColor: "#065873",
                  width: "20vw",
                  color: "#f5f5f5",
                }}
              />
            </div>
          )}

          <input
            ref={firstInput}
            placeholder="Type here ..."
            type="text"
            style={{
              width: activeFilter ? "50vw" : "70vw",
              height: "40px",
              fontSize: "20px",
              marginRight: "10px",
              marginTop: "10px",
              paddingLeft: activeFilter ? "20vw" : "10px",
            }}
            value={inputValue}
            onChange={handleInput}
            // when enter, send messagewe
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDrawerInputValue(inputValue);
                // secondInput.current = e.target;
                // console.log(secondInput);

                if (activeFilter) {
                  console.log(inputValue);
                  const isThisValueAllowed = checkFilterValue(
                    activeFilter,
                    inputValue
                  );
                  if (isThisValueAllowed) {
                    handleFilterInput({
                      // TODO: fix this bad code
                      label: inputValue,
                      // value: inputValue,
                    });
                  } else {
                    handleShowAlert();
                  }
                } else {
                  submitMessage(inputValue);
                  handleDrawerOpen();
                  console.log(" change focus to second input ");
                  console.log(secondInput);
                  secondInput.current && secondInput.current.focus();
                }

                setInputValue("");
                setViewRecommendationMenu(false);
              }
            }}
          />
        </div>
        {viewRecommendationMenu && (
          <Box
            sx={{
              position: "absolute",
              width: "70vw",
              zIndex: 100,
            }}
          >
            <ul width="70vw" style={{ padding: "0px" }}>
              {currentOptions.slice(0, 5).map((option, index) => (
                <li
                  key={index}
                  // if clicked, put label text to activeFilter
                  onClick={() => {
                    console.log(activeFilter);
                    if (activeFilter !== null && activeFilter !== undefined) {
                      handleFilterInput(option);
                    } else {
                      console.log("else option", option);
                      if (option.type === "filter") {
                        setActiveFilter(option);
                      } else {
                        setSelectedFiltersList([
                          ...selectedFiltersList,
                          {
                            label: option.label,
                            value: option.label,
                          },
                        ]);
                      }
                    }
                    setViewRecommendationMenu(false);
                    setInputValue("");
                  }}
                  style={{
                    width: "70vw",
                    color: "black",
                    listStyle: "none",
                    backgroundColor:
                      option.type === "filter" ? "#bdf" : "white",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </Box>
        )}
        <Box>
          <Button
            ref={clearButtonRef}
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
          {/* {messages.map((message, index) => (
            <Chip
              // remove when onclick
              onClick={() => {
                const newMessages = messages.filter((item, i) => i !== index);
                setMessages(newMessages);
              }}
              icon={<CloseIcon />}
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
          ))} */}
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
