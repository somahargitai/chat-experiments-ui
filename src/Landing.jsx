import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* img logo comes here */}
      <img
        src="../images/logo.png"
        alt="logo"
        style={{ height: "100px", paddingBottom: "20px" }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        // spaces between
        justifyContent="space-between"
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/chat1");
          }}
        >
          Chat
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/chat2");
          }}
        >
          Selector
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/fastchat");
          }}
        >
          FastChat
        </Button>
      </Stack>
    </Container>
  );
};

export default Landing;
