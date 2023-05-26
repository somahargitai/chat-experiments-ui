import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container>
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
            navigate("/express-api-nlpjs-chat");
          }}
        >
          Express API NLP.js Chat
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/component-development");
          }}
        >
          Component development
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/fast-api-blenderbot-chat");
          }}
        >
          Fast API BlenderBot Chat
        </Button>
      </Stack>
    </Container>
  );
};

export default Landing;
